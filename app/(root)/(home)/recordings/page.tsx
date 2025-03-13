
// import CallList from '@/components/CallList';

import CallList from "@/components/CallList";

// Composant fonctionnel qui représente une page pour afficher les enregistrements
const PreviousPage = () => {
  return (
    // Conteneur principal de la section
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Titre principal de la page */}
      <h1 className="text-3xl font-bold">Recordings</h1>

      
      <CallList type="recordings" /> 
    </section>
  );
};

// Exportation par défaut du composant PreviousPage pour être utilisé dans d'autres fichiers
export default PreviousPage;
