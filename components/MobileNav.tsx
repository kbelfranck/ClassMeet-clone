'use client';

import Image from 'next/image';  // Importation du composant Image pour gérer les images dans Next.js
import Link from 'next/link';  // Importation du composant Link pour la gestion des liens dans Next.js
import { usePathname } from 'next/navigation';  // Importation du hook usePathname pour obtenir l'URL actuelle

// Importation des composants du menu latéral (Sheet) et des liens de la barre latérale
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';  // Importation des liens de la barre latérale depuis une constante
import { cn } from '@/lib/utils';  // Importation de la fonction cn pour gérer les classes conditionnelles

const MobileNav = () => {
  const pathname = usePathname();  // Récupération du chemin actuel de l'URL pour déterminer le lien actif

  return (
    <section className="w-full max-w-[264px]">  {/* Conteneur du menu latéral avec largeur maximale */}
      <Sheet>
        {/* Déclencheur du menu latéral (icône hamburger) */}
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"  // L'icône hamburger est cachée sur les écrans larges
          />
        </SheetTrigger>

        {/* Contenu du menu latéral */}
        <SheetContent side="left" className="border-none bg-dark-1">
          {/* Lien vers la page d'accueil avec le logo */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="ClassMeet logo"
            />
            <p className="text-[26px] font-extrabold text-white">ClassMeet</p>
          </Link>
          
          {/* Conteneur pour les liens du menu */}
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              {/* Liste des liens du menu latéral */}
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {/* Boucle sur les liens de la barre latérale */}
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;  // Vérifie si l'élément est actif en comparant l'URL actuelle avec le lien

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}  // Lien vers la route du menu
                        key={item.label}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',  // Style de base pour les liens
                          {
                            'bg-blue-1': isActive,  // Applique un fond bleu si le lien est actif
                          }
                        )}
                      >
                        {/* Affichage de l'icône et du texte du lien */}
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
