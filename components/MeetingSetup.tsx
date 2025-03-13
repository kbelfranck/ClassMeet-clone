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
  const callEndedAt = useCallEndedAt();    // Heure de fin de l'appel

  // Vérifie si l'appel est prévu pour commencer à une heure future ou s'il est déjà terminé
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();  // Récupère l'objet d'appel via le hook useCall

  // Si le hook useCall ne trouve pas d'appel en cours, une erreur est lancée
  if (!call) {
    throw new Error('useStreamCall must be used within a StreamCall component.');
  }

  // États séparés pour la désactivation de la caméra et du micro
  const [disableCamera, setDisableCamera] = useState(false);
  const [disableMicrophone, setDisableMicrophone] = useState(false);

  // Utilisation de useEffect pour activer ou désactiver la caméra et le micro de façon asynchrone
  useEffect(() => {
    const toggleDevices = async () => {
      // Gestion de la caméra
      if (call.camera) {
        if (disableCamera) {
          console.log("Désactivation de la caméra");
          await call.camera.disable();
        } else {
          console.log("Activation de la caméra");
          await call.camera.enable();
        }
      } else {
        console.error("Camera non disponible");
      }
  
      // Gestion du micro
      if (call.microphone) {
        if (disableMicrophone) {
          console.log("Désactivation du micro");
          await call.microphone.disable();
        } else {
          console.log("Activation du micro");
          await call.microphone.enable();
        }
      } else {
        console.error("Microphone non disponible");
      }
    };
  
    toggleDevices();
  }, [disableCamera, disableMicrophone, call.camera, call.microphone]);

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
      
      {/* Section pour configurer la caméra et le micro avec deux cases à cocher distinctes */}
      <div className="flex flex-col gap-4 items-center justify-center h-24">
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={disableCamera}  // L'état de la case dépend de disableCamera
            onChange={(e) => setDisableCamera(e.target.checked)}  // Met à jour l'état pour la caméra
          />
          Rejoindre la réunion avec la caméra désactivée
        </label>
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={disableMicrophone}  // L'état de la case dépend de disableMicrophone
            onChange={(e) => setDisableMicrophone(e.target.checked)}  // Met à jour l'état pour le micro
          />
          Rejoindre la réunion avec le micro désactivé
        </label>
        <DeviceSettings />  {/* Permet à l'utilisateur de configurer ses périphériques */}
      </div>
      
      {/* Bouton pour rejoindre la réunion */}
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();             // Rejoint la réunion
          setIsSetupComplete(true);  // Marque la configuration comme terminée
        }}
      >
        Rejoindre la réunion
      </Button>
    </div>
  );
};

export default MeetingSetup;
