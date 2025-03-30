import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useScroll } from "@/app/student/components/scroll-context"; // Importez le contexte de défilement
// Define types for the data
interface Statistics {
  moocs: number;
  users: number;
  reviews: number;
}

interface Mooc {
  id: number;
  title: string;
  category: string;
  rating: number;
  image: string;
}

// Data defined at the top with types
const STATISTICS: Statistics = {
  moocs: 10000,
  users: 300000,
  reviews: 100000,
};

const TOP_MOOCS: Mooc[] = [
  {
    id: 1,
    title: "VIGIPIRATE : SENSIBILISEZ-VOUS AU RISQUE TERRORISTE",
    category: "Cybersécurité",
    rating: 4.8,
    image: "/images/Cyber.jpeg",
  },
  {
    id: 2,
    title: "SECNUMACADÉMIE : SE FORMER À LA SÉCURITÉ INFORMATIQUE",
    category: "Cybersécurité",
    rating: 4.5,
    image: "/images/Cyber.jpeg",
  },
  {
    id: 3,
    title: "MACHINE LEARNING",
    category: "Machine Learning",
    rating: 4.3,
    image: "/images/ml.jpeg",
  },
  {
    id: 4,
    title: "ENSEIGNER LE FRANÇAIS LANGUE ÉTRANGÈRE AUJOURD'HUI",
    category: "Langues étrangères",
    rating: 4.7,
    image: "/images/flr.webp",
  },
];

// Reusable Statistic Item Component with typed props
interface StatisticItemProps {
  end: number;
  label: string;
  inView: boolean;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  end,
  label,
  inView,
}) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-blue-900">
      {label === "Cours" ? "+ " : ""}
      <CountUp end={inView ? end : 0} duration={2.5} separator="," />
    </div>
    <div className="text-gray-600">{label}</div>
  </div>
);

// Reusable MOOC Item Component with typed props
interface MoocItemProps {
  mooc: Mooc;
  inView: boolean;
}

const MoocItem: React.FC<MoocItemProps> = ({ mooc, inView }) => (
  <div
    key={mooc.id}
    className={`border-b py-4 flex items-center transition-all duration-700 ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
    <div className="w-16 h-16 relative mr-4">
      <Image
        src={mooc.image}
        alt={mooc.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <h4 className="text-gray-800 font-medium">{mooc.title}</h4>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
          <span className="text-sm text-gray-600">{mooc.rating}</span>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-1">{mooc.category}</div>
    </div>
  </div>
);

const Meilleurs: React.FC = () => {
  // Intersection Observer Hooks with explicit types
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [descRef, descInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [moocsRef, moocsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { topCoursesRef } = useScroll();

  return (
    <div className="container mx-auto px-4 py-12" ref={topCoursesRef}>
      {/* Title Section */}
      <div
        ref={titleRef}
        className={`transition-opacity duration-1000 ${
          titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl text-center text-blue-900 font-semibold mb-6">
          UNE COMMUNAUTÉ POUR TROUVER LES MEILLEURS BHA
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Notre plateforme bénéficie d'une communauté active qui contribue,
          collecte des badges et partage son expérience en notant les Cours.
        </p>
      </div>

      {/* Statistics Section */}
      <div
        ref={statsRef}
        className={`flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16 mb-12 transition-all duration-1000 ${
          statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <StatisticItem
          end={STATISTICS.moocs}
          label="Cours"
          inView={statsInView}
        />
        <hr className="hidden md:block border-t-2 border-blue-200 w-16" />
        <StatisticItem
          end={STATISTICS.users}
          label="Internautes"
          inView={statsInView}
        />
        <hr className="hidden md:block border-t-2 border-blue-200 w-16" />
        <StatisticItem
          end={STATISTICS.reviews}
          label="Avis"
          inView={statsInView}
        />
      </div>

      {/* Description and MOOCs Grid */}
      <div
        className=" grid grid-cols-1 md:grid-cols-3 gap-8"
        ref={topCoursesRef}
      >
        {/* Description Section */}
        <div
          ref={descRef}
          id="top-courses"
          className={`md:col-span-1 transition-all duration-1000 ${
            descInView
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <h3 className="text-xl text-blue-900 font-semibold mb-4">
            Le classement de l'écosystème
          </h3>
          <p className="text-gray-600 mb-4">
            Notre objectif est de vous guider dans vos recherches, en toute{" "}
            <span className="font-semibold">simplicité</span>. C'est pourquoi
            chacun peut s'exprimer ! Notre plateforme bénéficie ainsi d'une{" "}
            <span className="font-semibold">communauté active</span> qui
            contribue, collecte des badges et partage son expérience en{" "}
            <span className="font-semibold">notant les Cours</span>. À vous
            ensuite de vous faire votre propre avis et de les{" "}
            <span className="font-semibold">partager</span> !
          </p>
          <p className="text-gray-600">
            En vous inscrivant sur My Mooc vous n'aurez pas seulement accès à un
            moteur de{" "}
            <span className="font-semibold">recherche personnalisé</span> et aux{" "}
            <span className="font-semibold">
              classements des meilleurs Cours
            </span>
            , mais vous aurez peut-être aussi la chance de faire partie de notre
            palmarès des « <span className="font-semibold">serial moocers</span>{" "}
            ».
          </p>
        </div>

        {/* MOOCs Section */}
        <div
          ref={moocsRef}
          className={`md:col-span-2 transition-all duration-1000 ${
            moocsInView
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="flex space-x-4 mb-4 border-b">
            <button className="text-blue-900 border-b-2 border-blue-700 pb-2 font-medium">
              TOP Cours
            </button>
          </div>
          <div>
            {TOP_MOOCS.map((mooc) => (
              <MoocItem key={mooc.id} mooc={mooc} inView={moocsInView} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meilleurs;
