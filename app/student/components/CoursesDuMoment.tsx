"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Interface pour les cours
interface Course {
  id: number;
  title: string;
  image: string;
  rating: number;
  startDate: string;
  duration: string;
  certification: string;
}

// Exemple de données pour les cours
const courses: Course[] = [
  {
    id: 1,
    title: "Intelligence Artificielle: concepts et applications",
    image: "/images/AI.jpeg",
  
   
    rating: 4.8,
    startDate: "15 mars 2025",
    duration: "6 semaines",
    certification: "Certificat payant",
  },
  {
    id: 2,
    title: "Développement Web Full Stack avec React et Node.js",
    image: "/images/FL.jpeg",
    rating: 4.5,
    startDate: "1 avril 2025",
    duration: "8 semaines",
    certification: "Attestation gratuite",
  },
  {
    id: 3,
    title: "Data Science: analyse et visualisation de données",
    image: "/images/OIP.jpeg",
    rating: 4.7,
    startDate: "Accès immédiat",
    duration: "5 semaines",
    certification: "Certificat payant",
  },
  {
    id: 4,
    title: "Gestion de projet agile avec Scrum",
    image: "/images/Gestion.jpeg",
   

    rating: 4.6,
    startDate: "20 mars 2025",
    duration: "4 semaines",
    certification: "Certificat payant",
  },
];

const CoursesDuMoment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Animation variants pour Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 py-12" ref={containerRef}>
      <div className=" mx-auto px-4">
        <h2 className="text-3xl text-center text-blue-900 font-semibold mb-4">
          LES COURS DU MOMENT
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Retrouvez tous les cours que nous vous conseillons de suivre
          prochainement. Les cours en ligne du moment sont présents dans cette
          sélection actualisée chaque jour.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="h-40 relative">
                <div className="w-full h-full relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                </div>

                

                
               
              </div>

              <div className="p-4">
                <h3 className="text-gray-800 font-medium mb-2 line-clamp-2 h-12">
                  {course.title}
                </h3>

                {/* Étoiles de notation */}
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill={
                        i < Math.floor(course.rating) ? "currentColor" : "none"
                      }
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-600 ml-1">
                    {course.rating}/5
                  </span>
                </div>

                {/* Date de début */}
                <div className="text-gray-600 text-sm mb-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {course.startDate}
                </div>

                {/* Durée */}
                <div className="text-gray-600 text-sm mb-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {course.duration}
                </div>

                {/* Certification */}
                <div className="text-gray-600 text-sm flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {course.certification}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesDuMoment;
