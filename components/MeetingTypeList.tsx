/* eslint-disable camelcase */
'use client';

import { useState } from 'react';  // Importation du hook useState pour gérer l'état du composant
import { useRouter } from 'next/navigation';  // Importation du hook useRouter pour gérer la navigation dans l'application Next.js

import HomeCard from './HomeCard';  // Importation du composant HomeCard pour l'affichage des cartes de la page d'accueil
import MeetingModal from './MeetingModal';  // Importation du composant MeetingModal pour afficher les modaux de création ou de participation aux réunions
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';  // Importation des fonctions et hooks du SDK Stream.io pour gérer les appels vidéo
import { useUser } from '@clerk/nextjs';  // Importation du hook useUser pour gérer l'utilisateur authentifié avec Clerk
import Loader from './Loader';  // Importation du composant Loader pour afficher un indicateur de chargement
import { Textarea } from './ui/textarea';  // Importation du composant Textarea pour les champs de texte
import ReactDatePicker from 'react-datepicker';  // Importation de ReactDatePicker pour la sélection de date et heure
import { useToast } from './ui/use-toast';  // Importation du hook useToast pour afficher des messages toast
import { Input } from './ui/input';  // Importation du composant Input pour les champs de saisie de texte

// Valeurs initiales pour le formulaire de réunion
const initialValues = {
  dateTime: new Date(),  // Par défaut, la réunion commence immédiatement
  description: '',  // Description vide au départ
  link: '',  // Lien vide au départ
  UE: '',
};

const MeetingTypeList = () => {
  const router = useRouter();  // Utilisation du hook useRouter pour la navigation
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);  // État pour déterminer quel type de réunion est en cours de création ou de participation
  const [values, setValues] = useState(initialValues);  // État pour les valeurs du formulaire
  const [callDetail, setCallDetail] = useState<Call>();  // Détails de l'appel en cours
  const client = useStreamVideoClient();  // Récupère le client vidéo Stream.io
  const { user } = useUser();  // Récupère les informations de l'utilisateur authentifié
  const { toast } = useToast();  // Récupère la fonction pour afficher des messages toast

  // Fonction pour créer une réunion
  const createMeeting = async () => {
    if (!client || !user) return;  // Si le client ou l'utilisateur n'est pas défini, retourne rien
    try {
      // Si la date et l'heure ne sont pas définies, affiche un message d'erreur
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      
      const id = crypto.randomUUID();  // Génère un identifiant unique pour l'appel
      const call = client.call('default', id);  // Crée un appel avec le client Stream.io

      // Si l'appel ne peut pas être créé, lance une erreur
      if (!call) throw new Error('Failed to create meeting');
      
      // Si la description est vide, définit la description par défaut "Instant Meeting"
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.UE || 'Instant Meeting';

      // Crée ou récupère l'appel avec les paramètres définis
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);  // Met à jour les détails de l'appel avec les informations du nouvel appel

      // Si la description est vide, redirige l'utilisateur vers la page de la réunion
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',  // Affiche un toast pour confirmer que la réunion a été créée
      });
    } catch (error) {
      console.error(error);  // En cas d'erreur, affiche une erreur dans la console
      toast({ title: 'Failed to create Meeting' });  // Affiche un toast d'erreur
    }
  };

  // Si le client ou l'utilisateur n'est pas disponible, afficher un loader
  if (!client || !user) return <Loader />;

  // Crée le lien pour rejoindre la réunion
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Cartes de la page d'accueil pour chaque action de réunion */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}  // Lance une réunion instantanée
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}  // Permet de rejoindre une réunion via un lien
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}  // Permet de planifier une réunion
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}  // Redirige vers la page des enregistrements
      />

      {/* Modal pour la création d'une réunion planifiée */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })  // Met à jour la description de la réunion
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}  // Met à jour la date et l'heure de la réunion
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);  // Copie le lien de la réunion dans le presse-papiers
            toast({ title: 'Link Copied' });  // Affiche un toast pour indiquer que le lien a été copié
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Modal pour rejoindre une réunion via un lien */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}  // Redirige vers la réunion en fonction du lien saisi
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}  // Met à jour le lien de la réunion
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      {/* Modal pour démarrer une réunion instantanée */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}  // Crée une réunion instantanée
      >
        <Input
          placeholder="CODE UE - description"
          onChange={(e) => setValues({ ...values, UE: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
