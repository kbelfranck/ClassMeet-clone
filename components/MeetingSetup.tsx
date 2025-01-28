'use client';

import { useEffect, useState } from 'react';  // Importation des hooks React
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';  // Importation des composants et hooks du SDK Stream.io pour la gestion de la vidéo et des appels
import Alert from './Alert';  // Importation du composant Alert pour afficher des messages d'alerte
import { Button } from './ui/button';  // Importation du composant Button pour les boutons de l'interface utilisateur

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  // Récupération des informations d'état de l'appel via les hooks
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();  // Heure de début de l'appel
  const callEndedAt = useCallEndedAt();  // Heure de fin de l'appel

  // Vérifie si l'appel est prévu pour commencer à une heure future ou s'il est déjà terminé
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();  // Récupère l'objet d'appel via le hook useCall

  // Si le hook useCall ne trouve pas d'appel en cours, une erreur est lancée
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // Déclaration d'un état pour savoir si le micro et la caméra sont activés ou non
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  // Utilisation de useEffect pour activer ou désactiver la caméra et le micro en fonction de l'état `isMicCamToggled`
  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();  // Désactive la caméra
      call.microphone.disable();  // Désactive le micro
    } else {
      call.camera.enable();  // Active la caméra
      call.microphone.enable();  // Active le micro
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  // Si l'heure de début de l'appel n'est pas encore arrivée, affiche un message d'alerte
  if (callTimeNotArrived)
    return (
      <Alert
        title={`Votre réunion n'a pas encore commencé. Elle est prévue pour ${callStartsAt.toLocaleString()}`}
      />
    );

  // Si l'appel a été terminé, affiche un message d'alerte
  if (callHasEnded)
    return (
      <Alert
        title="L'appel a été terminé par l'hôte"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Configurations Personnelles</h1>
      <VideoPreview />  {/* Affiche un aperçu vidéo avant de rejoindre l'appel */}
      
      {/* Section pour configurer le micro et la caméra */}
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}  // L'état de la case à cocher dépend de `isMicCamToggled`
            onChange={(e) => setIsMicCamToggled(e.target.checked)}  // Mise à jour de l'état lors de la modification de la case à cocher
          />
          Rejoindre la réunion avec la caméra et le micro désactivés
        </label>
        <DeviceSettings />  {/* Permet à l'utilisateur de configurer ses périphériques vidéo */}
      </div>
      
      {/* Bouton pour rejoindre la réunion */}
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();  // Rejoint la réunion
          setIsSetupComplete(true);  // Marque la configuration comme terminée
        }}
      >
        Rejoindre la réunion
      </Button>
    </div>
  );
};

export default MeetingSetup;
