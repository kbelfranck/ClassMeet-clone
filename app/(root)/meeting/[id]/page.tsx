'use client';

// Importation des hooks et composants nécessaires
import { useState } from 'react'; // Pour gérer l'état local de la page
import { useUser } from '@clerk/nextjs'; // Pour accéder aux informations de l'utilisateur connecté via Clerk
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'; // Pour gérer la vidéo de la réunion avec Stream
import { useParams } from 'next/navigation'; // Pour obtenir l'ID de la réunion à partir des paramètres d'URL
import { Loader } from 'lucide-react'; // Loader d'attente de l'UI

import { useGetCallById } from '@/hooks/useGetCallById'; // Hook personnalisé pour obtenir les détails de la réunion par son ID
import Alert from '@/components/Alert'; // Composant pour afficher des alertes
import MeetingSetup from '@/components/MeetingSetup'; // Composant pour afficher la page de configuration de la réunion
import MeetingRoom from '@/components/MeetingRoom'; // Composant pour afficher la salle de réunion une fois configurée

const MeetingPage = () => {
  // Utilisation de useParams pour extraire l'ID de la réunion depuis l'URL
  const { id } = useParams() as { id: string };
  // Récupération de l'utilisateur connecté et de l'état de chargement via Clerk
  const { isLoaded, user } = useUser();
  // Utilisation du hook personnalisé pour obtenir les informations de la réunion avec l'ID
  const { call, isCallLoading } = useGetCallById(id);
  // État local pour suivre si la configuration de la réunion est terminée
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Si l'utilisateur ou la réunion est en cours de chargement, afficher un loader
  if (!isLoaded || isCallLoading) return <Loader />;

  // Si la réunion n'a pas été trouvée avec cet ID, afficher un message d'erreur
  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  // Vérification si l'utilisateur a l'autorisation de rejoindre la réunion
  // Si l'appel est de type "invité" et que l'utilisateur n'est pas membre, il ne peut pas rejoindre
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  // Si l'utilisateur n'est pas autorisé, afficher une alerte
  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      {/* Utilisation du composant StreamCall pour gérer la réunion vidéo */}
      <StreamCall call={call}>
        {/* Application du thème Stream pour la réunion */}
        <StreamTheme>
          {/* Si la configuration de la réunion n'est pas terminée, afficher la page de configuration */}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            // Une fois la configuration terminée, afficher la salle de réunion
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

// Exportation du composant MeetingPage pour qu'il puisse être utilisé ailleurs dans l'application
export default MeetingPage;
