'use server'; // Directive utilisée pour indiquer que ce fichier sera exécuté côté serveur

// Importation de la fonction currentUser pour récupérer l'utilisateur actuel et de StreamClient pour interagir avec l'API Stream.
import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

// Récupération des clés API nécessaires depuis les variables d'environnement
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY; // Clé publique de Stream
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY; // Clé secrète de Stream

// Fonction asynchrone qui génère un jeton pour l'utilisateur connecté
export const tokenProvider = async () => {
  // Récupérer l'utilisateur actuel via Clerk
  const user = await currentUser();

  // Si aucun utilisateur n'est authentifié, une erreur est levée
  if (!user) throw new Error('User is not authenticated');

  // Vérification que la clé API publique est définie dans les variables d'environnement
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');

  // Vérification que la clé secrète est définie dans les variables d'environnement
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  // Initialisation du client Stream avec les clés API
  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  // Définition du temps d'expiration et du temps d'émission pour le jeton
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // Expiration dans une heure (3600 secondes)
  const issuedAt = Math.floor(Date.now() / 1000) - 60; // Émis une minute avant pour éviter des problèmes de synchronisation

  // Création d'un jeton pour l'utilisateur actuel avec une durée de validité
  const token = streamClient.createToken(user.id, expirationTime, issuedAt);

  // Retourne le jeton généré
  return token;
};
