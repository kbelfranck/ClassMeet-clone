// Importation de React pour créer les composants
import * as React from "react";

// Importation d'une fonction utilitaire pour gérer les classes CSS conditionnelles
import { cn } from "@/lib/utils"

// Composant Card - Conteneur principal d'une carte
const Card = React.forwardRef<
  HTMLDivElement, // Type de l'élément DOM (HTMLDivElement)
  React.HTMLAttributes<HTMLDivElement> // Propriétés standard d'un élément div HTML
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Référence à l'élément DOM
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50", // Classes de base pour la carte
      className // Classes supplémentaires passées via props
    )}
    {...props} // Passage de toutes les autres propriétés au div
  />
))
Card.displayName = "Card"; // Nom du composant pour un meilleur affichage dans le débogueur

// Composant CardHeader - Entête de la carte
const CardHeader = React.forwardRef<
  HTMLDivElement, // Type de l'élément DOM (HTMLDivElement)
  React.HTMLAttributes<HTMLDivElement> // Propriétés standard d'un élément div HTML
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Référence à l'élément DOM
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Styles pour l'entête (utilisation de flexbox)
    {...props} // Passage de toutes les autres propriétés au div
  />
))
CardHeader.displayName = "CardHeader"; // Nom du composant

// Composant CardTitle - Titre de la carte
const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Type de l'élément DOM (HTMLParagraphElement)
  React.HTMLAttributes<HTMLHeadingElement> // Propriétés pour un élément heading (comme <h3>)
>(({ className, ...props }, ref) => (
  <h3
    ref={ref} // Référence à l'élément DOM
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Styles pour le titre (taille et typographie)
      className // Classes supplémentaires passées via props
    )}
    {...props} // Passage des autres propriétés au <h3>
  />
))
CardTitle.displayName = "CardTitle"; // Nom du composant

// Composant CardDescription - Description de la carte
const CardDescription = React.forwardRef<
  HTMLParagraphElement, // Type de l'élément DOM (HTMLParagraphElement)
  React.HTMLAttributes<HTMLParagraphElement> // Propriétés pour un élément paragraphe
>(({ className, ...props }, ref) => (
  <p
    ref={ref} // Référence à l'élément DOM
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)} // Styles pour la description (couleur du texte)
    {...props} // Passage des autres propriétés au <p>
  />
))
CardDescription.displayName = "CardDescription"; // Nom du composant

// Composant CardContent - Contenu principal de la carte
const CardContent = React.forwardRef<
  HTMLDivElement, // Type de l'élément DOM (HTMLDivElement)
  React.HTMLAttributes<HTMLDivElement> // Propriétés standard d'un élément div HTML
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Contenu avec padding
))
CardContent.displayName = "CardContent"; // Nom du composant

// Composant CardFooter - Pied de la carte
const CardFooter = React.forwardRef<
  HTMLDivElement, // Type de l'élément DOM (HTMLDivElement)
  React.HTMLAttributes<HTMLDivElement> // Propriétés standard d'un élément div HTML
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Référence à l'élément DOM
    className={cn("flex items-center p-6 pt-0", className)} // Footer avec flexbox pour centrer les éléments
    {...props} // Passage des autres propriétés au div
  />
))
CardFooter.displayName = "CardFooter"; // Nom du composant

// Exportation des composants
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
