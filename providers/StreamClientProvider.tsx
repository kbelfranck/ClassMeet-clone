'use client';

import { ReactNode, useEffect, useState } from 'react';  // Importation des hooks et types nécessaires
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';  // Importation des composants du SDK Stream.io pour gérer les appels vidéo
import { useUser } from '@clerk/nextjs';  // Importation du hook useUser pour accéder aux informations de l'utilisateur via Clerk

import { tokenProvider } from '@/actions/stream.actions';  // Importation du tokenProvider qui fournit un jeton pour l'authentification Stream
import Loader from '@/components/Loader';  // Importation du composant Loader qui affiche un indicateur de chargement

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;  // Récupération de la clé API Stream depuis les variables d'environnement

// Définition du composant StreamVideoProvider qui englobe les enfants avec la logique de gestion de la connexion vidéo
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();  // Déclaration de l'état pour gérer l'instance du client vidéo
  const { user, isLoaded } = useUser();  // Récupération des informations de l'utilisateur et de l'état de chargement via Clerk

  // Utilisation de useEffect pour initialiser le client vidéo après que l'utilisateur soit chargé
  useEffect(() => {
    if (!isLoaded || !user) return;  // Si l'utilisateur ou les données ne sont pas encore chargées, on ne fait rien
    if (!API_KEY) throw new Error('Stream API key is missing');  // Si la clé API n'est pas définie, on lance une erreur

    // Création d'une nouvelle instance du client vidéo Stream.io avec les informations de l'utilisateur et la clé API
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,  // Identifiant unique de l'utilisateur
        name: user?.username || user?.id,  // Nom de l'utilisateur (utilise le nom d'utilisateur s'il est défini, sinon l'ID)
        image: user?.imageUrl,  // URL de l'image de l'utilisateur
      },
      tokenProvider,  // Fonction pour obtenir un jeton d'accès pour Stream
    });

    // Mise à jour de l'état avec le nouveau client vidéo
    setVideoClient(client);
  }, [user, isLoaded]);  // L'effet se déclenche lorsque l'utilisateur ou l'état de chargement change

  // Si le client vidéo n'est pas encore disponible, afficher le Loader
  if (!videoClient) return <Loader />;

  // Retourne le composant StreamVideo avec le client vidéo et les enfants en tant qu'éléments enfants
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
