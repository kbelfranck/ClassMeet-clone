// Importation des modules nécessaires
import * as React from 'react'; // Importation de React pour la création du composant
import { Slot } from '@radix-ui/react-slot'; // Importation du composant Slot de Radix UI pour rendre le composant enfant personnalisable
import { cva, type VariantProps } from 'class-variance-authority'; // Importation de cva pour la gestion des variantes CSS dynamiques
import { cn } from '@/lib/utils'; // Importation de la fonction 'cn' pour la gestion des classes conditionnelles

// Définition des variantes de style du bouton via cva
const buttonVariants = cva(
  // Classes de base pour le bouton (tailwindCSS)
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      // Variantes disponibles pour le bouton (type de bouton et taille)
      variant: {
        // Bouton par défaut avec couleur de fond sombre et texte clair
        default:
          'bg-slate-900 text-slate-50 hover:bg-slate-800/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90',
        // Bouton destructif avec fond rouge et texte clair
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        // Bouton avec bordure et fond blanc (type "outline")
        outline:
          'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        // Bouton secondaire avec fond clair et texte sombre
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        // Bouton transparent avec effet de survol
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        // Bouton de type "link" avec texte souligné
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
      },
      size: {
        // Taille par défaut avec hauteur et padding spécifiques
        default: 'h-10 px-4 py-2',
        // Taille petite avec hauteur plus petite et padding ajusté
        sm: 'h-9 rounded-md px-3',
        // Taille grande avec plus de padding et de hauteur
        lg: 'h-11 rounded-md px-8',
        // Taille pour les icônes avec une taille fixe
        icon: 'size-10',
      },
    },
    defaultVariants: {
      // Valeurs par défaut pour chaque variante
      variant: 'default', // Variante par défaut
      size: 'default', // Taille par défaut
    },
  }
);

// Définition des propriétés du bouton
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Les attributs standards d'un bouton HTML
    VariantProps<typeof buttonVariants> { // Les propriétés relatives aux variantes définies plus haut
  asChild?: boolean; // Propriété optionnelle pour rendre le bouton un enfant d'un autre composant (utilisation de Slot)
}

// Définition du composant Button en utilisant React.forwardRef pour gérer la référence du bouton
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'; // Si 'asChild' est vrai, le bouton devient un composant enfant (Slot), sinon c'est un <button>
    return (
      // Rendu du composant avec les classes CSS et la référence
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Application des classes dynamiques basées sur les propriétés du bouton
        ref={ref}
        {...props} // Passe les autres propriétés au bouton
      />
    );
  }
);
Button.displayName = 'Button'; // Définition du nom du composant pour une meilleure détection dans les outils de développement

// Exportation du composant Button et des variantes de bouton
export { Button, buttonVariants };
