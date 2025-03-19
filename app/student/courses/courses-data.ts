export interface Course {
  id: number;
  title: string;
  category: string;
  image: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  description: string;
  rating: number;
  students: number;
  isFeatured?: boolean;
}

export interface ContentItem {
  type: "video" | "quiz" | "pdf";
  title: string;
  url?: string;
  completed?: boolean;
}

export interface Module {
  title: string;
  subModules: string[];
  content?: ContentItem[];
}

export interface UserCourse {
  courseId: number;
  progress: number;
  enrolledAt: string;
}

export const STATIC_COURSES: Course[] = [
  {
    id: 1,
    title: "Introduction à la cybersécurité",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Débutant",
    duration: "6 heures",
    description:
      "Apprenez les bases de la cybersécurité et protégez vos actifs numériques.",
    rating: 4.8,
    students: 1234,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Certification CCST en support informatique",
    category: "Informatique",
    image: "/images/OIP.jpeg",
    level: "Débutant",
    duration: "10 heures",
    description: "Formation complète en support informatique avec pratique.",
    rating: 4.6,
    students: 856,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Cybersécurité avancée",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Intermédiaire",
    duration: "12 heures",
    description:
      "Techniques avancées pour les professionnels de la cybersécurité.",
    rating: 4.9,
    students: 567,
  },
  {
    id: 4,
    title: "Bases de l'apprentissage automatique",
    category: "Informatique",
    image: "/images/ml.jpeg",
    level: "Débutant",
    duration: "8 heures",
    description:
      "Introduction aux concepts et applications de l'apprentissage automatique.",
    rating: 4.7,
    students: 789,
  },
  {
    id: 5,
    title: "Algèbre pour débutants",
    category: "Mathématiques",
    image: "/images/algebra.jpeg",
    level: "Débutant",
    duration: "5 heures",
    description:
      "Maîtrisez les bases de l'algèbre avec des exemples pratiques.",
    rating: 4.5,
    students: 980,
    isFeatured: true,
  },
  {
    id: 6,
    title: "Calcul différentiel",
    category: "Mathématiques",
    image: "/images/calculus.jpeg",
    level: "Intermédiaire",
    duration: "8 heures",
    description: "Explorez les concepts avancés du calcul différentiel.",
    rating: 4.8,
    students: 620,
  },
  {
    id: 7,
    title: "Mécanique classique",
    category: "Physique",
    image: "/images/mechanics.jpeg",
    level: "Débutant",
    duration: "7 heures",
    description: "Introduction aux lois de Newton et à la mécanique classique.",
    rating: 4.6,
    students: 450,
    isFeatured: true,
  },
  {
    id: 8,
    title: "Thermodynamique",
    category: "Physique",
    image: "/images/thermo.jpeg",
    level: "Intermédiaire",
    duration: "10 heures",
    description: "Étude des principes de la chaleur et de l'énergie.",
    rating: 4.7,
    students: 380,
  },
  {
    id: 83,
    title: "Introduction à la cybersécurité",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Débutant",
    duration: "6 heures",
    description:
      "Apprenez les bases de la cybersécurité et protégez vos actifs numériques.",
    rating: 4.8,
    students: 1234,
    isFeatured: true,
  },
  {
    id: 233,
    title: "Certification CCST en support informatique",
    category: "Informatique",
    image: "/images/OIP.jpeg",
    level: "Débutant",
    duration: "10 heures",
    description: "Formation complète en support informatique avec pratique.",
    rating: 4.6,
    students: 856,
    isFeatured: true,
  },
  {
    id: 43,
    title: "Cybersécurité avancée",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Intermédiaire",
    duration: "12 heures",
    description:
      "Techniques avancées pour les professionnels de la cybersécurité.",
    rating: 4.9,
    students: 567,
  },
  {
    id: 422,
    title: "Bases de l'apprentissage automatique",
    category: "Informatique",
    image: "/images/ml.jpeg",
    level: "Débutant",
    duration: "8 heures",
    description:
      "Introduction aux concepts et applications de l'apprentissage automatique.",
    rating: 4.7,
    students: 789,
  },
  {
    id: 44,
    title: "Algèbre pour débutants",
    category: "Mathématiques",
    image: "/images/algebra.jpeg",
    level: "Débutant",
    duration: "5 heures",
    description:
      "Maîtrisez les bases de l'algèbre avec des exemples pratiques.",
    rating: 4.5,
    students: 980,
    isFeatured: true,
  },
  {
    id: 33,
    title: "Calcul différentiel",
    category: "Mathématiques",
    image: "/images/calculus.jpeg",
    level: "Intermédiaire",
    duration: "8 heures",
    description: "Explorez les concepts avancés du calcul différentiel.",
    rating: 4.8,
    students: 620,
  },
  {
    id: 22,
    title: "Mécanique classique",
    category: "Physique",
    image: "/images/mechanics.jpeg",
    level: "Débutant",
    duration: "7 heures",
    description: "Introduction aux lois de Newton et à la mécanique classique.",
    rating: 4.6,
    students: 450,
    isFeatured: true,
  },
  {
    id: 122,
    title: "Thermodynamique",
    category: "Physique",
    image: "/images/thermo.jpeg",
    level: "Intermédiaire",
    duration: "10 heures",
    description: "Étude des principes de la chaleur et de l'énergie.",
    rating: 4.7,
    students: 380,
  },
  {
    id: 1444,
    title: "Introduction à la cybersécurité",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Débutant",
    duration: "6 heures",
    description:
      "Apprenez les bases de la cybersécurité et protégez vos actifs numériques.",
    rating: 4.8,
    students: 1234,
    isFeatured: true,
  },
  {
    id: 244,
    title: "Certification CCST en support informatique",
    category: "Informatique",
    image: "/images/OIP.jpeg",
    level: "Débutant",
    duration: "10 heures",
    description: "Formation complète en support informatique avec pratique.",
    rating: 4.6,
    students: 856,
    isFeatured: true,
  },
  {
    id: 3840,
    title: "Cybersécurité avancée",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Intermédiaire",
    duration: "12 heures",
    description:
      "Techniques avancées pour les professionnels de la cybersécurité.",
    rating: 4.9,
    students: 567,
  },
  {
    id: 948,
    title: "Bases de l'apprentissage automatique",
    category: "Informatique",
    image: "/images/ml.jpeg",
    level: "Débutant",
    duration: "8 heures",
    description:
      "Introduction aux concepts et applications de l'apprentissage automatique.",
    rating: 4.7,
    students: 789,
  },
  {
    id: 540,
    title: "Algèbre pour débutants",
    category: "Mathématiques",
    image: "/images/algebra.jpeg",
    level: "Débutant",
    duration: "5 heures",
    description:
      "Maîtrisez les bases de l'algèbre avec des exemples pratiques.",
    rating: 4.5,
    students: 980,
    isFeatured: true,
  },
  {
    id: 694,
    title: "Calcul différentiel",
    category: "Mathématiques",
    image: "/images/calculus.jpeg",
    level: "Intermédiaire",
    duration: "8 heures",
    description: "Explorez les concepts avancés du calcul différentiel.",
    rating: 4.8,
    students: 620,
  },
  {
    id: 777,
    title: "Mécanique classique",
    category: "Physique",
    image: "/images/mechanics.jpeg",
    level: "Débutant",
    duration: "7 heures",
    description: "Introduction aux lois de Newton et à la mécanique classique.",
    rating: 4.6,
    students: 450,
    isFeatured: true,
  },
  {
    id: 843,
    title: "Thermodynamique",
    category: "Physique",
    image: "/images/thermo.jpeg",
    level: "Intermédiaire",
    duration: "10 heures",
    description: "Étude des principes de la chaleur et de l'énergie.",
    rating: 4.7,
    students: 380,
  },
  {
    id: 1,
    title: "Introduction à la cybersécurité",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Débutant",
    duration: "6 heures",
    description:
      "Apprenez les bases de la cybersécurité et protégez vos actifs numériques.",
    rating: 4.8,
    students: 1234,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Certification CCST en support informatique",
    category: "Informatique",
    image: "/images/OIP.jpeg",
    level: "Débutant",
    duration: "10 heures",
    description: "Formation complète en support informatique avec pratique.",
    rating: 4.6,
    students: 856,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Cybersécurité avancée",
    category: "Informatique",
    image: "/images/Cyber.jpeg",
    level: "Intermédiaire",
    duration: "12 heures",
    description:
      "Techniques avancées pour les professionnels de la cybersécurité.",
    rating: 4.9,
    students: 567,
  },
  {
    id: 4,
    title: "Bases de l'apprentissage automatique",
    category: "Informatique",
    image: "/images/ml.jpeg",
    level: "Débutant",
    duration: "8 heures",
    description:
      "Introduction aux concepts et applications de l'apprentissage automatique.",
    rating: 4.7,
    students: 789,
  },
  {
    id: 5,
    title: "Algèbre pour débutants",
    category: "Mathématiques",
    image: "/images/algebra.jpeg",
    level: "Débutant",
    duration: "5 heures",
    description:
      "Maîtrisez les bases de l'algèbre avec des exemples pratiques.",
    rating: 4.5,
    students: 980,
    isFeatured: true,
  },
  {
    id: 6,
    title: "Calcul différentiel",
    category: "Mathématiques",
    image: "/images/calculus.jpeg",
    level: "Intermédiaire",
    duration: "8 heures",
    description: "Explorez les concepts avancés du calcul différentiel.",
    rating: 4.8,
    students: 620,
  },
  {
    id: 7,
    title: "Mécanique classique",
    category: "Physique",
    image: "/images/mechanics.jpeg",
    level: "Débutant",
    duration: "7 heures",
    description: "Introduction aux lois de Newton et à la mécanique classique.",
    rating: 4.6,
    students: 450,
    isFeatured: true,
  },
  {
    id: 8,
    title: "Thermodynamique",
    category: "Physique",
    image: "/images/thermo.jpeg",
    level: "Intermédiaire",
    duration: "10 heures",
    description: "Étude des principes de la chaleur et de l'énergie.",
    rating: 4.7,
    students: 380,
  },
];

export const MODULES: { courseId: number; modules: Module[] }[] = [
  {
    courseId: 1,
    modules: [
      {
        title: "Vérification de mes connaissances (bêta)",
        subModules: ["dsedgvsd"],
        content: [],
      },
      {
        title: "Tutoriel de navigation dans le cours",
        subModules: ["Vidéo tutorielle"],
        content: [
          {
            type: "video",
            title: "Introduction à la navigation",
            url: "https://example.com/video/navigation.mp4",
            completed: false,
          },
        ],
      },
      {
        title: "Module 1 : Introduction à la cybersécurité",
        subModules: [
          "1.1. Le monde de la cybersécurité",
          "1.2. Données organisationnelles",
        ],
        content: [
          {
            type: "video",
            title: "Vidéo : Le monde de la cybersécurité",
            url: "https://example.com/video/cybersecurity.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Testez vos connaissances",
            url: "/quiz/cybersecurity-intro",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Notes du cours",
            url: "/pdf/cybersecurity-notes.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 2,
    modules: [
      {
        title: "Vérification de mes connaissances (bêta)",
        subModules: [],
        content: [],
      },
      {
        title: "Tutoriel de navigation dans le cours",
        subModules: ["Vidéo tutorielle"],
        content: [
          {
            type: "video",
            title: "Introduction au support informatique",
            url: "https://example.com/video/support.mp4",
            completed: false,
          },
        ],
      },
      {
        title: "Module 1 : Bases du support informatique",
        subModules: [
          "1.1. Introduction au support informatique",
          "1.2. Résolution de problèmes courants",
        ],
        content: [
          {
            type: "video",
            title: "Vidéo : Résolution de problèmes",
            url: "https://example.com/video/problem-solving.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Support informatique",
            url: "/quiz/support-basics",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Guide de support",
            url: "/pdf/support-guide.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 3,
    modules: [
      {
        title: "Vérification de mes connaissances (bêta)",
        subModules: [],
        content: [],
      },
      {
        title: "Module 1 : Techniques avancées",
        subModules: ["1.1. Analyse des menaces", "1.2. Réponse aux incidents"],
        content: [
          {
            type: "video",
            title: "Vidéo : Analyse des menaces",
            url: "https://example.com/video/threat-analysis.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Techniques avancées",
            url: "/quiz/advanced-cyber",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Manuel avancé",
            url: "/pdf/advanced-cyber.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 4,
    modules: [
      {
        title: "Module 1 : Introduction à l'IA",
        subModules: ["1.1. Concepts de base", "1.2. Algorithmes simples"],
        content: [
          {
            type: "video",
            title: "Vidéo : Concepts de base",
            url: "https://example.com/video/ai-basics.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : IA de base",
            url: "/quiz/ai-basics",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Notes sur l'IA",
            url: "/pdf/ai-notes.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 5,
    modules: [
      {
        title: "Module 1 : Fondations de l'algèbre",
        subModules: ["1.1. Équations linéaires", "1.2. Inégalités"],
        content: [
          {
            type: "video",
            title: "Vidéo : Équations linéaires",
            url: "https://example.com/video/linear-equations.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Algèbre de base",
            url: "/quiz/algebra-basics",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Notes d'algèbre",
            url: "/pdf/algebra-notes.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 6,
    modules: [
      {
        title: "Module 1 : Calcul différentiel",
        subModules: ["1.1. Dérivées", "1.2. Applications"],
        content: [
          {
            type: "video",
            title: "Vidéo : Dérivées",
            url: "https://example.com/video/derivatives.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Calcul différentiel",
            url: "/quiz/calculus",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Notes sur le calcul",
            url: "/pdf/calculus-notes.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 7,
    modules: [
      {
        title: "Module 1 : Lois de Newton",
        subModules: ["1.1. Première loi", "1.2. Deuxième loi"],
        content: [
          {
            type: "video",
            title: "Vidéo : Lois de Newton",
            url: "https://example.com/video/newton-laws.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Mécanique classique",
            url: "/quiz/mechanics",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Notes de mécanique",
            url: "/pdf/mechanics-notes.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    courseId: 8,
    modules: [
      {
        title: "Module 1 : Principes de la thermodynamique",
        subModules: ["1.1. Première loi", "1.2. Deuxième loi"],
        content: [
          {
            type: "video",
            title: "Vidéo : Thermodynamique",
            url: "https://example.com/video/thermodynamics.mp4",
            completed: false,
          },
          {
            type: "quiz",
            title: "Quiz : Thermodynamique",
            url: "/quiz/thermo",
            completed: false,
          },
          {
            type: "pdf",
            title: "PDF : Notes de thermodynamique",
            url: "/pdf/thermo-notes.pdf",
            completed: false,
          },
        ],
      },
    ],
  },
];

export interface Achievements {
  idusers: number;
  badge: string; // Nom du badge correspondant à une image
  idcours: string;
  completed?: number;
}

export const Static_Achievements: Achievements[] = [
  {
    idusers: 1,
    badge: "beginner", // Image dans public/images
    idcours: "Certification",
    completed: 55,
  },
  {
    idusers: 2,
    badge: "advanced",
    idcours: "React Mastery",
    completed: 85,
  },
];