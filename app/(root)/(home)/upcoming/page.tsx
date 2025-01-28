// Importation du composant CallList depuis le dossier '@/components'. Ce composant est utilisé ici pour afficher une liste d'appels à venir

import CallList from '@/components/CallList';

// Composant fonctionnel qui représente la page des réunions à venir
const UpcomingPage = () => {
  return (
    // Section principale contenant le titre et la liste des réunions à venir
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Titre principal de la page */}
      <h1 className="text-3xl font-bold">Upcoming Meeting</h1>

      {/* 
        Utilisation du composant CallList avec la prop type="upcoming". 
        Cela indique que le composant affichera uniquement les réunions à venir.
      */}
      <CallList type="upcoming" />
    </section>
  );
};

// Exportation par défaut du composant UpcomingPage pour être utilisé ailleurs dans l'application
export default UpcomingPage;
