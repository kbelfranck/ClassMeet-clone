// Importation du composant SignIn depuis le module Clerk pour gérer la connexion des utilisateurs
import { SignIn } from '@clerk/nextjs';

// Fonction de composant React pour la page de connexion
export default function SiginInPage() {
  return (
    // La balise <main> sert de conteneur principal pour le contenu de la page
    <main className="flex h-screen w-full items-center justify-center">
      {/* 
        Utilisation du composant <SignIn> fourni par Clerk pour afficher un formulaire de connexion 
        qui inclut toutes les fonctionnalités nécessaires comme la gestion des sessions et des identifiants.
      */}
      <SignIn />
    </main>
  );
}
