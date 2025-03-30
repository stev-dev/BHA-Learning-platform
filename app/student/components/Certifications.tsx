import Image from "next/image";
import { motion } from "framer-motion";

// Données de certification (exemple)
const certifications = [
  {
    id: 1,
    image: "/images/CR1.avif",
    type: "Certification",
    title: "certification d'un cours",
  },
  {
    id: 2,
    image: "/images/R4.jpeg", 
    type: "Certification",
    title: "certification d'un module",
  },
  {
    id: 3,
    image: "/images/R5.avif",
    type: "Certification",
    title: "certification d'un projet",
  },
];

const CertificationsGrid = () => {
  return (
    <div className="mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 50 }} // Animation initiale
            whileInView={{ opacity: 1, y: 0 }} // Animation lorsqu'il est visible
            viewport={{ once: true }} // L'animation ne se déclenche qu'une fois
            transition={{ duration: 0.5, delay: index * 0.2 }} // Délai pour un effet séquentiel
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {/* Conteneur de l'image */}
            <div className="h-40 relative">
              <Image
                src={cert.image}
                alt={cert.title}
                layout="fill"
                objectFit="cover w-20"
              />
            </div>

            {/* Contenu texte */}
            <div className="p-4">
              <div className="text-xs text-blue-500 font-semibold mb-2">
                {cert.type}
              </div>
              <h3 className="text-gray-800 font-semibold">{cert.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsGrid;
