// Importation du composant MeetingTypeList depuis '@/components'
// Ce composant semble être utilisé pour afficher une liste de types de réunions
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  // Création d'une nouvelle date basée sur l'heure actuelle
  const now = new Date();

  // Formatage de l'heure dans un format local français (HH:MM)
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Formatage de la date dans un format complet (jour de la semaine, mois, jour, année)
  const date = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(now);

  return (
    // Section principale qui contient tout le contenu de la page d'accueil
    <section className="flex size-full flex-col gap-5 text-white">
      {/* Image d'arrière-plan avec un effet de couverture, ici une image de "hero" */}
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        {/* Conteneur interne pour centrer le contenu et ajouter du padding */}
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {/* Message de bienvenue */}
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Bienvenue sur ClassMeet 😊
          </h2>
          {/* Affichage de l'heure et de la date actuelles */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      {/* Affichage de la liste des types de réunions, par exemple avec le composant MeetingTypeList */}
      <MeetingTypeList />
    </section>
  );
};

// Exportation du composant Home pour être utilisé dans d'autres parties de l'application
export default Home;
