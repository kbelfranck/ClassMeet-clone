"use client"; // Directive Next.js pour indiquer que ce fichier est exécuté côté client

// Importation des hooks et composants nécessaires
import { useUser } from "@clerk/nextjs"; // Récupère les informations de l'utilisateur actuel
import { useStreamVideoClient } from "@stream-io/video-react-sdk"; // Utilise le client Stream pour gérer les appels vidéo
import { useRouter } from "next/navigation"; // Permet de naviguer entre les pages côté client

// Importation des hooks et composants personnalisés
import { useGetCallById } from "@/hooks/useGetCallById"; // Hook pour récupérer les détails d'un appel par ID
import { Button } from "@/components/ui/button"; // Composant bouton personnalisé
import { useToast } from "@/components/ui/use-toast"; // Hook pour afficher des notifications

// Composant Table pour afficher des informations clés (titre et description)
const Table = ({
  title,
  description,
}: {
  title: string; // Le titre de l'information
  description: string; // La description ou la valeur associée
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      {/* Titre en gras */}
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      {/* Description avec gestion du débordement */}
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

// Composant principal pour gérer la salle de réunion personnelle
const PersonalRoom = () => {
  const router = useRouter(); // Hook pour naviguer entre les pages
  const { user } = useUser(); // Récupération de l'utilisateur actuel
  const client = useStreamVideoClient(); // Client Stream pour gérer les appels vidéo
  const { toast } = useToast(); // Hook pour afficher des messages toast (notifications)

  // ID de la réunion basé sur l'ID utilisateur
  const meetingId = user?.id;

  // Récupération de l'appel actuel (si existant) via un hook personnalisé
  const { call } = useGetCallById(meetingId!);

  // Fonction pour démarrer une salle de réunion
  const startRoom = async () => {
    if (!client || !user) return; // Vérifie que le client et l'utilisateur existent

    // Création d'un appel avec l'ID de la réunion
    const newCall = client.call("default", meetingId!);

    // Si aucun appel n'existe, on en crée un nouveau
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(), // Date de début de l'appel
        },
      });
    }

    // Redirection vers la page de réunion avec les paramètres
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  // Lien d'invitation pour rejoindre la réunion
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Titre principal de la section */}
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      
      {/* Informations sur la réunion */}
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-5">
        {/* Bouton pour démarrer la réunion */}
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        
        {/* Bouton pour copier le lien d'invitation */}
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink); // Copie le lien dans le presse-papier
            toast({
              title: "Link Copied", // Notification de succès
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom; // Exportation du composant pour une utilisation dans d'autres fichiers
