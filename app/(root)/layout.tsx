import { ReactNode } from 'react'; // Importation de ReactNode pour gérer le type des enfants dans le composant

// Importation du fournisseur StreamVideoProvider qui va englober les enfants et fournir un contexte de vidéo
import StreamVideoProvider from '@/providers/StreamClientProvider';

// Définition du layout racine qui sera utilisée dans toute l'application
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    // Le composant principal de la mise en page
    <main>
      {/* Le fournisseur StreamVideoProvider englobe tous les enfants pour les fournir avec le contexte vidéo */}
      <StreamVideoProvider>
        {children} {/* Affichage des enfants (composants) passés au layout */}
      </StreamVideoProvider>
    </main>
  );
};

// Exportation du composant RootLayout pour qu'il puisse être utilisé ailleurs dans l'application
export default RootLayout;
