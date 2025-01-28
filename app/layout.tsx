// Importation des modules nécessaires
import { ReactNode } from "react"; // Importation de ReactNode pour typage des enfants du composant
import type { Metadata } from "next"; // Importation du type Metadata pour définir les métadonnées de la page
import { ClerkProvider } from "@clerk/nextjs"; // Importation de ClerkProvider pour l'authentification via Clerk
import { Inter } from "next/font/google"; // Importation de la police "Inter" depuis Google Fonts

// Importation des styles nécessaires
import "@stream-io/video-react-sdk/dist/css/styles.css"; // Styles pour le SDK de Stream Video
import "react-datepicker/dist/react-datepicker.css"; // Styles pour le composant de date-picker
import "./globals.css"; // Importation des styles globaux de l'application
import { Toaster } from "@/components/ui/toaster"; // Importation d'un composant Toaster (probablement pour les notifications)

// Initialisation de la police Inter avec le sous-ensemble "latin"
const inter = Inter({ subsets: ["latin"] });

// Définition des métadonnées pour la page
export const metadata: Metadata = {
  title: "ClassMeet", // Titre de la page
  description: "Video Conference App", // Description de la page
  icons: {
    icon: "/icons/logo.svg", // Définition de l'icône de la page
  },
};

// Définition du composant RootLayout
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    // Définition de la structure HTML de la page
    <html lang="en"> 
      {/* ClerkProvider enveloppe toute l'application pour fournir l'authentification et l'apparence */}
      <ClerkProvider
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton", // Variante d'affichage des boutons sociaux sous forme d'icônes
            logoImageUrl: "", 
          },
          variables: {
            colorText: "#fff", // Couleur du texte en blanc
            colorPrimary: "#0E78F9", // Couleur primaire pour l'application
            colorBackground: "#1C1F2E", // Couleur de fond sombre pour l'application
            colorInputBackground: "#252A41", // Couleur d'arrière-plan des champs de saisie
            colorInputText: "#fff", // Couleur du texte dans les champs de saisie
          },
        }}
      >
        {/* Application du fond et de la police Inter à l'ensemble du body */}
        <body className={`${inter.className} bg-dark-2`}>
          {/* Le Toaster est probablement utilisé pour afficher des notifications de manière dynamique */}
          <Toaster />
          {/* Les enfants du composant RootLayout (les autres pages de l'app) */}
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
