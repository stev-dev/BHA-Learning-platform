export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  prerequisites: string[];
  languages: string[];
  certification: boolean;
}

export interface Module {
  title: string;
  description: string;
  subModules: string[];
}

export const courseData: Course = {
  id: "net-infra-01",
  title: "Infrastructure Réseau et Sécurité Avancée",
  description:
    "Ce cours couvre les principes fondamentaux de la mise en réseau, la configuration des équipements réseau, et les pratiques de sécurité avancées pour les environnements d'entreprise.",
  instructor: "Prof. Marie Dupont",
  duration: "40 heures",
  level: "Intermédiaire",
  prerequisites: ["Connaissances de base en réseaux", "Notions de TCP/IP"],
  languages: ["Français", "Anglais"],
  certification: true,
};

export const modulesData = [
  {
    title: "Fondamentaux des Réseaux",
    description:
      "Introduction aux concepts fondamentaux des réseaux informatiques",
    subModules: [
      "Introduction aux réseaux",
      "Modèle OSI et TCP/IP",
      "Adressage IP et sous-réseaux",
      "Protocoles de routage",
    ],
    subModulesContent: [
      {
        title: "Introduction aux réseaux",
        contentItems: [
          {
            type: "video",
            title: "Comprendre les réseaux informatiques",
            duration: "15 min",
            completed: true,
          },
          {
            type: "pdf",
            title: "Guide des composants réseau",
            url: "/docs/network-components-guide.pdf",
            completed: true,
          },
          {
            type: "quiz",
            title: "Quiz sur les bases des réseaux",
            url: "/quizzes/network-basics",
            completed: true,
            score: 92,
          },
        ],
      },
      {
        title: "Modèle OSI et TCP/IP",
        contentItems: [
          {
            type: "video",
            title: "Le modèle OSI expliqué",
            duration: "20 min",
            completed: false,
          },
          {
            type: "video",
            title: "TCP/IP en détail",
            duration: "18 min",
            completed: false,
          },
          {
            type: "quiz",
            title: "Évaluation sur les modèles de réseau",
            url: "/quizzes/network-models",
            completed: false,
          },
        ],
      },
      {
        title: "Adressage IP et sous-réseaux",
        contentItems: [
          {
            type: "video",
            title: "Comprendre l'adressage IPv4",
            duration: "25 min",
            completed: false,
          },
          {
            type: "lab",
            title: "Travaux pratiques sur les sous-réseaux",
            url: "/labs/subnetting",
            completed: false,
          },
        ],
      },
      {
        title: "Protocoles de routage",
        contentItems: [
          {
            type: "video",
            title: "Introduction aux protocoles de routage",
            duration: "22 min",
            completed: false,
          },
          {
            type: "simulation",
            title: "Simulation de routage RIP et OSPF",
            url: "/simulations/routing-protocols",
            completed: false,
          },
        ],
      },
    ],
    progress: 35,
    passingScore: 70,
  },
  // Autres modules (inchangés, omis pour brièveté)
];
