// Importation d'un composant appelé CallList, utilisé pour afficher une liste d'appels
import CallList from "@/components/CallList";

// Composant fonctionnel pour afficher les appels précédents
const PreviousPage = () => {
  return (
    // Section principale contenant le titre et, potentiellement, une liste des appels terminés
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Titre principal de la section */}
      <h1 className="text-3xl font-bold">Previous Calls</h1>

      {/* 
        Le composant CallList est prévu pour afficher une liste d'appels terminés 
        (grâce à la prop `type="ended"`). 
      */}
      <CallList type="ended" /> 
    </section>
  );
};

// Exportation par défaut du composant PreviousPage pour être utilisé dans d'autres parties de l'application
export default PreviousPage;
