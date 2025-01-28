'use client';

import Image from 'next/image';  // Import du composant Image de Next.js pour afficher les images de manière optimisée

import { cn } from '@/lib/utils';  // Import d'une fonction utilitaire pour gérer la classe CSS

interface HomeCardProps {
  className?: string;  // Classe CSS optionnelle pour personnaliser le style de la carte
  img: string;  // URL de l'image à afficher dans la carte
  title: string;  // Titre à afficher sur la carte
  description: string;  // Description à afficher sous le titre
  handleClick?: () => void;  // Fonction optionnelle à exécuter lorsqu'on clique sur la carte
}

// Composant HomeCard qui affiche une carte avec une image, un titre et une description
const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
        className  // Ajoute une classe CSS personnalisée si elle est fournie
      )}
      onClick={handleClick}  // Exécute la fonction handleClick lorsque la carte est cliquée
    >
      {/* Section pour l'image avec un effet de glassmorphism */}
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="meeting" width={27} height={27} />  {/* Affiche l'image */}
      </div>

      {/* Contenu de la carte : titre et description */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>  {/* Titre de la carte */}
        <p className="text-lg font-normal">{description}</p>  {/* Description de la carte */}
      </div>
    </section>
  );
};

export default HomeCard;
