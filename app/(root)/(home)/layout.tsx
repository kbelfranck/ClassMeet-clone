// Importation des modules nécessaires
import { Metadata } from 'next'; // Permet de définir les métadonnées de la page, comme le titre et la description
import { ReactNode } from 'react'; // Type de données pour les enfants React (les composants enfants)

import Navbar from '@/components/Navbar'; // Composant pour la barre de navigation
import Sidebar from '@/components/Sidebar'; // Composant pour la barre latérale (menu)

export const metadata: Metadata = {
  title: 'Classe Virtuelle', // Titre de la page, utilisé dans les balises <title> du HTML
  description: 'A workspace for your team, powered by Stream Chat and Clerk.', // Description de la page, pour les balises meta-description
};

// Définition du composant de mise en page principal
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    // Conteneur principal
    <main className="relative">
      {/* Affichage de la barre de navigation */}
      <Navbar />

      {/* Conteneur principal de la page avec une mise en page en flex */}
      <div className="flex">
        {/* Barre latérale à gauche */}
        <Sidebar />
        
        {/* Section principale qui s'ajuste en fonction de l'écran */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          {/* Affichage des enfants (composants ou contenu) passés à cette mise en page */}
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

// Exportation de la mise en page pour l'utiliser dans d'autres parties de l'application
export default RootLayout;
