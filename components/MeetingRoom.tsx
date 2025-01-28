'use client';

import { useState } from 'react';  // Importation de useState pour gérer l'état local
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';  // Importation de composants et hooks du SDK Stream.io pour la gestion des appels vidéo
import { useRouter, useSearchParams } from 'next/navigation';  // Utilisation des hooks pour la navigation et la gestion des paramètres d'URL
import { Users, LayoutList } from 'lucide-react';  // Importation des icônes de Lucide pour l'interface utilisateur

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';  // Importation des composants pour le menu déroulant personnalisé
import Loader from './Loader';  // Importation du composant Loader à afficher pendant le chargement
import EndCallButton from './EndCallButton';  // Importation du bouton pour quitter l'appel
import { cn } from '@/lib/utils';  // Importation d'une fonction utilitaire pour la gestion des classes CSS conditionnelles

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';  // Définition du type pour les différents agencements d'appel

const MeetingRoom = () => {
  const searchParams = useSearchParams();  // Récupère les paramètres de recherche dans l'URL
  const isPersonalRoom = !!searchParams.get('personal');  // Vérifie si l'appel est dans une salle personnelle
  const router = useRouter();  // Utilisation du hook pour gérer la navigation
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');  // État pour gérer le layout de la réunion
  const [showParticipants, setShowParticipants] = useState(false);  // État pour afficher/masquer la liste des participants
  const { useCallCallingState } = useCallStateHooks();  // Utilisation des hooks pour obtenir l'état de l'appel
  const callingState = useCallCallingState();  // Récupère l'état actuel de l'appel

  // Si l'état de l'appel n'est pas "JOINED", on affiche le loader jusqu'à ce que l'appel soit rejoint
  if (callingState !== CallingState.JOINED) return <Loader />;

  // Fonction pour choisir l'agencement de l'appel en fonction de l'état `layout`
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;  // Agencement en grille avec pagination
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;  // Agencement avec le participant principal à droite
      default:
        return <SpeakerLayout participantsBarPosition="right" />;  // Agencement avec le participant principal à gauche
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      {/* Zone principale de l'appel avec un agencement flexible */}
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />  {/* Affichage de l'agencement choisi */}
        </div>

        {/* Liste des participants qui peut être affichée ou cachée */}
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,  // Utilisation d'une classe conditionnelle pour afficher/masquer les participants
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />  {/* Liste des participants avec une fonction de fermeture */}
        </div>
      </div>

      {/* Contrôles de l'appel et menu pour ajuster l'agencement */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />  {/* Contrôles de l'appel avec un bouton pour quitter l'appel */}

        {/* Menu déroulant pour changer l'agencement */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />  {/* Icône du menu déroulant */}
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {/* Liste des options d'agencement */}
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)  // Mise à jour de l'agencement choisi
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />  {/* Séparateur entre les options */}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />  {/* Bouton pour afficher les statistiques de l'appel */}

        {/* Bouton pour afficher ou masquer la liste des participants */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />  {/* Icône des participants */}
          </div>
        </button>

        {/* Si ce n'est pas une salle personnelle, on affiche le bouton pour terminer l'appel */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
