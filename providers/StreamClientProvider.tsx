'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { StreamChat } from 'stream-chat'; // Import StreamChat
import { useUser } from '@clerk/nextjs';
import { Chat } from 'stream-chat-react'; // Vérifie bien cet import
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const CHAT_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [chatClient, setChatClient] = useState<StreamChat>(); 
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY || !CHAT_API_KEY) throw new Error('Stream API keys are missing');

    // Initialiser le client Stream Video
    const videoClient = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(videoClient);

    // Initialiser le client Stream Chat
    const setupChatClient = async () => {
      try {
        const chatClient = StreamChat.getInstance(CHAT_API_KEY);
        const chatToken = await tokenProvider(); // Attendre le token
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.username || user.id,
            image: user.imageUrl,
          },
          chatToken
        );
        setChatClient(chatClient);
      } catch (error) {
        console.error("Erreur lors de la connexion à Stream Chat :", error);
      }
    };

    setupChatClient();
  }, [user, isLoaded]);

  if (!videoClient || !chatClient) return <Loader />;

  return (
    <StreamVideo client={videoClient}>
      <Chat client={chatClient}>{children}</Chat> 
    </StreamVideo>
  );
};

export default StreamVideoProvider;
