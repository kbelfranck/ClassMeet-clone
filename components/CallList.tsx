'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';  // Import des composants Call et CallRecording pour la gestion des appels

import Loader from './Loader';  // Import du composant Loader (chargement en attente)
import { useGetCalls } from '@/hooks/useGetCalls';  // Import du hook personnalisé pour récupérer les appels
import MeetingCard from './MeetingCard';  // Import du composant MeetingCard qui affiche chaque appel
import { useEffect, useState } from 'react';  // Import de hooks React pour la gestion des effets et des états
import { useRouter } from 'next/navigation';  // Import du hook useRouter pour la navigation dans Next.js

// Définition du composant CallList qui accepte un type ('ended', 'upcoming', 'recordings') comme prop
const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();  // Initialisation du hook useRouter pour la navigation
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();  // Récupération des appels (terminés, à venir, enregistrements) depuis le hook personnalisé
  const [recordings, setRecordings] = useState<CallRecording[]>([]);  // Déclaration d'un état local pour les enregistrements

  // Fonction pour récupérer les appels selon le type
  const getCalls = () => {
    switch (type) {
      case 'ended':  // Si le type est 'ended', retourne les appels terminés
        return endedCalls;
      case 'recordings':  // Si le type est 'recordings', retourne les enregistrements
        return recordings;
      case 'upcoming':  // Si le type est 'upcoming', retourne les appels à venir
        return upcomingCalls;
      default:
        return [];  // Retourne un tableau vide si aucun type valide n'est fourni
    }
  };

  // Fonction pour récupérer le message lorsqu'il n'y a pas d'appels à afficher
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';  // Message pour les appels terminés
      case 'upcoming':
        return 'No Upcoming Calls';  // Message pour les appels à venir
      case 'recordings':
        return 'No Recordings';  // Message pour les enregistrements
      default:
        return '';
    }
  };

  // Utilisation d'un effet pour récupérer les enregistrements si le type est 'recordings'
  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],  // Récupère les enregistrements pour chaque appel
      );

      // Filtre et aplatit les enregistrements des appels
      const recordings = callData
        .filter((call) => call.recordings.length > 0)  // Ne garde que les appels ayant des enregistrements
        .flatMap((call) => call.recordings);

      setRecordings(recordings);  // Met à jour l'état des enregistrements
    };

    // Appel de la fonction pour récupérer les enregistrements si le type est 'recordings'
    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);  // Déclenche l'effet chaque fois que 'type' ou 'callRecordings' change

  if (isLoading) return <Loader />;  // Si les données sont en cours de chargement, affiche le composant Loader

  const calls = getCalls();  // Récupère les appels en fonction du type sélectionné
  const noCallsMessage = getNoCallsMessage();  // Récupère le message à afficher lorsqu'il n'y a pas d'appels

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Si des appels sont disponibles, les afficher */}
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}  // Utilisation de l'ID de l'appel comme clé pour chaque carte
            icon={
              type === 'ended'
                ? '/icons/previous.svg'  // Icône pour les appels terminés
                : type === 'upcoming'
                ? '/icons/upcoming.svg'  // Icône pour les appels à venir
                : '/icons/recordings.svg'  // Icône pour les enregistrements
            }
            title={
              (meeting as Call).state?.custom?.description ||  // Description de l'appel, ou un extrait du nom du fichier pour les enregistrements
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||  // Date de début de l'appel
              (meeting as CallRecording).start_time?.toLocaleString()  // Date de début de l'enregistrement
            }
            isPreviousMeeting={type === 'ended'}  // Détermine si c'est un appel précédent
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url  // Lien vers l'enregistrement
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`  // Lien vers l'appel en direct
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}  // Icône pour le bouton (play pour les enregistrements)
            buttonText={type === 'recordings' ? 'Play' : 'Start'}  // Texte du bouton
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)  // Redirection vers l'enregistrement
                : () => router.push(`/meeting/${(meeting as Call).id}`)  // Redirection vers l'appel en direct
            }
          />
        ))
      ) : (
        // Si aucun appel n'est trouvé, afficher le message approprié
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

// Export du composant CallList pour l'utiliser dans d'autres parties de l'application
export default CallList;
