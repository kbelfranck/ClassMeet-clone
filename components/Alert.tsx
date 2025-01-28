// Importation des modules nécessaires
import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';  // Import du composant Button personnalisé
import { Card, CardContent } from './ui/card';  // Import des composants Card et CardContent personnalisés

// Définition des types pour les props du composant PermissionCard
interface PermissionCardProps {
  title: string;  // Titre de l'alerte (obligatoire)
  iconUrl?: string;  // URL de l'icône (optionnelle)
}

// Définition du composant Alert qui accepte un titre et une icône en props
const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    // Conteneur principal centré sur toute la hauteur de l'écran
    <section className="flex-center h-screen w-full">
      
      {/* Carte contenant l'alerte, avec un fond sombre et des bords arrondis */}
      <Card className="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
        
        {/* Contenu de la carte */}
        <CardContent>
          <div className="flex flex-col gap-9">
            
            {/* Section pour l'icône, affichée si iconUrl est fourni */}
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                // Affichage de l'icône avec une taille de 72px
                <div className="flex-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              
              {/* Titre de l'alerte, centré et avec une taille de police plus grande */}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            {/* Bouton pour revenir à la page d'accueil */}
            <Button asChild className="bg-blue-1">
              {/* Lien vers la page d'accueil */}
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

// Exportation du composant Alert pour l'utiliser dans d'autres parties de l'application
export default Alert;
