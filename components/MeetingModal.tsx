"use client";

import { ReactNode } from "react";  // Import de ReactNode pour gérer des enfants dynamiques dans le composant
import { Dialog, DialogContent } from "./ui/dialog";  // Composants Dialog et DialogContent pour créer une fenêtre modale
import { cn } from "@/lib/utils";  // Fonction utilitaire pour gérer des classes CSS conditionnelles
import { Button } from "./ui/button";  // Composant bouton réutilisable
import Image from "next/image";  // Composant Image de Next.js pour une gestion optimisée des images

// Définition des propriétés du composant MeetingModal
interface MeetingModalProps {
  isOpen: boolean;  // Indicateur pour savoir si la modal est ouverte ou fermée
  onClose: () => void;  // Fonction pour fermer la modal
  title: string;  // Titre de la modal
  className?: string;  // Classe CSS additionnelle pour personnaliser le style
  children?: ReactNode;  // Enfants dynamiques dans le corps de la modal
  handleClick?: () => void;  // Fonction à exécuter lors du clic sur le bouton
  buttonText?: string;  // Texte du bouton
  instantMeeting?: boolean;  // Indicateur pour déterminer si la réunion est instantanée
  image?: string;  // URL de l'image à afficher en haut de la modal
  buttonClassName?: string;  // Classe CSS personnalisée pour le bouton
  buttonIcon?: string;  // URL de l'icône à afficher dans le bouton
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    // La modale est ouverte ou fermée en fonction de la valeur de isOpen, et onClose gère sa fermeture
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Contenu de la modale avec des classes utilitaires pour la mise en page */}
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          
          {/* Si une image est fournie, elle est affichée ici */}
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          
          {/* Affichage du titre de la modal avec des classes utilitaires et une classe personnalisée si fournie */}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          
          {/* Affichage des enfants dynamiques, si fournis */}
          {children}
          
          {/* Bouton d'action pour planifier une réunion ou effectuer une action */}
          <Button
            className={
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}  // L'action à effectuer lors du clic
          >
            {/* Si une icône est fournie, elle est affichée avant le texte du bouton */}
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {/* Affichage du texte du bouton ou "Schedule Meeting" par défaut */}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
