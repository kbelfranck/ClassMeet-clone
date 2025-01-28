// Importation du composant SignUp depuis le module Clerk pour gérer l'inscription des utilisateurs
import { SignUp } from '@clerk/nextjs';

// Fonction de composant React pour la page d'inscription
export default function SignUpPage() {
  return (
    // La balise <main> est utilisée comme conteneur principal pour la page
    <main className="flex h-screen w-full items-center justify-center">
      {/* 
        Utilisation du composant <SignUp> fourni par Clerk pour afficher un formulaire d'inscription 
        complet avec prise en charge de diverses options comme email, mot de passe, ou OAuth.
      */}
      <SignUp />
    </main>
  );
}
