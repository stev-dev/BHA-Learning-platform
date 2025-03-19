"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaUser,
  FaPalette,
  FaLaptopCode,
  FaGraduationCap,
  FaHeartbeat,
  FaCalculator,
  FaFlask,
  FaUsers,
  FaDatabase,
  FaCode,
  FaCogs,
} from "react-icons/fa"; // Icônes modernes de React Icons

// Définir le type pour les thématiques
interface Thematique {
  id: number;
  icon: JSX.Element; // Icône moderne
  title: string;
}

// Données des thématiques avec des icônes modernes
const thematiques: Thematique[] = [
  {
    id: 1,
    icon: <FaChartLine className="w-12 h-12" />,
    title: "DÉVELOPPEMENT PROFESSIONNEL",
  },
  {
    id: 2,
    icon: <FaUser className="w-12 h-12" />,
    title: "DÉVELOPPEMENT PERSONNEL",
  },
  {
    id: 3,
    icon: <FaPalette className="w-12 h-12" />,
    title: "ARTS, DESIGN ET CRÉATIVITÉ",
  },
  {
    id: 4,
    icon: <FaLaptopCode className="w-12 h-12" />,
    title: "INFORMATIQUE",
  },
  {
    id: 5,
    icon: <FaGraduationCap className="w-12 h-12" />,
    title: "EDUCATION ET ENSEIGNEMENT",
  },
  {
    id: 6,
    icon: <FaHeartbeat className="w-12 h-12" />,
    title: "SANTÉ ET MÉDECINE",
  },
  {
    id: 7,
    icon: <FaCalculator className="w-12 h-12" />,
    title: "MATHÉMATIQUES",
  },
  { id: 8, icon: <FaFlask className="w-12 h-12" />, title: "SCIENCES" },
  {
    id: 9,
    icon: <FaUsers className="w-12 h-12" />,
    title: "SCIENCES HUMAINES",
  },
  { id: 10, icon: <FaDatabase className="w-12 h-12" />, title: "DATA SCIENCE" },
  { id: 11, icon: <FaCode className="w-12 h-12" />, title: "PROGRAMMATION" },
  { id: 12, icon: <FaCogs className="w-12 h-12" />, title: "INGÉNIERIE" },
];

const ThematiquesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [speed, setSpeed] = useState(30);

  // Ajuster la vitesse en fonction de la largeur de l'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpeed(20); // Plus rapide sur mobile
      } else if (window.innerWidth < 1024) {
        setSpeed(25); // Moyen sur tablettes
      } else {
        setSpeed(30); // Plus lent sur desktop
      }
    };

    handleResize(); // Définir la vitesse initiale
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Diviser les thématiques en deux groupes
  const premierGroupe = thematiques.slice(0, 6);
  const deuxiemeGroupe = thematiques.slice(6, 12);

  // Animation pour les éléments
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-50 py-12 overflow-hidden">
      <div className=" mx-auto px-4">
        <h2 className="text-3xl text-center text-blue-900 font-semibold mb-10">
          LES THÉMATIQUES
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Sélectionnez la catégorie qui vous intéresse et découvrez les
          formations disponibles.
        </p>

        {/* Premier groupe - défilement vers la gauche */}
        <div className="mb-16 relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          >
            {[...premierGroupe, ...premierGroupe].map((theme, index) => (
              <motion.div
                key={`top-${index}`}
                className="flex-shrink-0 flex flex-col items-center mx-6 md:mx-8"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                onMouseEnter={() => setHoveredIndex(theme.id)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4 hover:shadow-lg transition-shadow">
                  <span className="text-blue-900">{theme.icon}</span>
                </div>
                <h3 className="text-xs text-center text-gray-700 font-medium w-32">
                  {theme.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Deuxième groupe - défilement vers la droite */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
          >
            {[...deuxiemeGroupe, ...deuxiemeGroupe].map((theme, index) => (
              <motion.div
                key={`bottom-${index}`}
                className="flex-shrink-0 flex flex-col items-center mx-6 md:mx-8"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                onMouseEnter={() => setHoveredIndex(theme.id)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-4 hover:shadow-lg transition-shadow">
                  <span className="text-blue-900">{theme.icon}</span>
                </div>
                <h3 className="text-xs text-center text-gray-700 font-medium w-32">
                  {theme.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThematiquesSection;
