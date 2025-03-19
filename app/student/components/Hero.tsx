"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const controls = useAnimation(); // Contrôle les animations
  const bannerRef = useRef<HTMLDivElement>(null); // Référence pour la bannière

  // Configuration de l'Intersection Observer pour l'animation au défilement
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, y: 0 }); // Déclenche l'animation
          }
        });
      },
      {
        threshold: 0.1, // Déclenche l'animation lorsque 10% de l'élément est visible
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current); // Observe la bannière
    }

    // Nettoyage
    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, [controls]);

  return (
    <div
      ref={bannerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/header.jpg" 
          alt="Éducation en ligne"
          layout="fill"
          objectFit="cover"
          
        />
      </div>

      {/* Contenu de la bannière */}
      <motion.div
        className="text-center px-4 z-10"
        initial={{ opacity: 0, y: 50 }} // Animation initiale
        animate={controls} // Contrôle l'animation
        transition={{ duration: 1 }} // Durée de l'animation
      >
        <h1 className="text-black text-4xl md:text-5xl font-bold mb-8">
          BUSINESS HOUSE ACADEMY
        </h1>
        <motion.p
          className="text-black text-2xl md:text-4xl font-bold mb-8 w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1, delay: 0.5 }} // Délai pour l'animation du paragraphe
        >
          Apprenez, Enseignez, Réussissez ! Créez, partagez et suivez des cours
          en ligne où que vous soyez.
        </motion.p>
        <motion.div
          className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          transition={{ duration: 1, delay: 1 }} // Délai pour l'animation du champ de recherche
        >
          <div className="flex">
            <input
              type="text"
              placeholder="Que souhaitez-vous apprendre ?"
              className="flex-1 p-4 rounded-l-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-amber-600 text-white p-4 rounded-r-lg font-medium hover:bg-blue-950 transition-colors">
              RECHERCHER
            </button>
          </div>
        </motion.div>
        <motion.p
          className="text-white mt-4"
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 1, delay: 1.5 }} // Délai pour l'animation du texte
        >
          Ou laissez-nous vous guider
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
