import Image from 'next/image';  // Import du composant Image de Next.js pour une gestion optimisée des images

const Loader = () => {
  return (
    // Section contenant le loader, centré horizontalement et verticalement
    <div className="flex-center h-screen w-full">
      {/* Affichage de l'image du loader (cercle de chargement) */}
      <Image
        src="/icons/loading-circle.svg"  // Source de l'image du loader
        alt="Loading..."  // Texte alternatif pour l'accessibilité
        width={50}  // Largeur de l'image
        height={50}  // Hauteur de l'image
      />
    </div>
  );
};

export default Loader;
