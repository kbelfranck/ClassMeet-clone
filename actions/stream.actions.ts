'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    console.log('User:', user);
    if (!user) throw new Error('User is not authenticated');

    // Vérifier les clés API
    console.log('STREAM_API_KEY:', STREAM_API_KEY);
    console.log('STREAM_API_SECRET:', STREAM_API_SECRET);
    if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
    if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

    // Initialiser le client Stream
    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    // Définir les temps d'expiration et d'émission
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    // Créer le jeton
    const token = streamClient.createToken(user.id, expirationTime, issuedAt);
    console.log('Token:', token);

    return token;
  } catch (error) {
    console.error('Error in tokenProvider:', error);
    throw new Error('Failed to generate token');
  }
};