'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';  // Import des hooks de Stream Video SDK pour gérer les appels

import { Button } from './ui/button';  // Import du composant Button
import { useRouter } from 'next/navigation';  // Import du hook useRouter pour la navigation dans Next.js

const EndCallButton = () => {
  const call = useCall();  // Récupère l'appel actuel via le hook useCall
  const router = useRouter();  // Initialise le hook useRouter pour la navigation

  // Vérifie si l'appel est disponible, sinon lance une erreur
  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );

  // Utilisation du hook useCallStateHooks pour obtenir l'état du participant local
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();  // Récupère le participant local

  // Vérifie si le participant local est le propriétaire de la réunion
  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&  // Vérifie si l'appel a un créateur
    localParticipant.userId === call.state.createdBy.id;  // Compare l'ID du participant local avec celui du créateur

  // Si le participant local n'est pas le propriétaire de la réunion, ne montre pas le bouton
  if (!isMeetingOwner) return null;

  // Fonction pour mettre fin à l'appel
  const endCall = async () => {
    await call.endCall();  // Met fin à l'appel
    router.push('/');  // Redirige l'utilisateur vers la page d'accueil après la fin de l'appel
  };

  return (
    // Affiche un bouton pour mettre fin à l'appel si l'utilisateur est le propriétaire de la réunion
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone  {/* Texte du bouton */}
    </Button>
  );
};

export default EndCallButton;
