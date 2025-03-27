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

export interface SubModuleContent {
  title: string;
  contentItems: ContentItem[];
}

export interface Module {
  title: string;
  subModules: string[];
}

export interface ExtendedModule extends Module {
  subModulesContent?: SubModuleContent[];
  progress?: number;
}

export interface UserCourse {
  courseId: number;
  progress: number;
  enrolledAt: string;
}

export interface Achievements {
  idusers: number;
  badge: string;
  idcours: string;
  completed?: number;
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
  
];

export const Static_Achievements: Achievements[] = [
  {
    idusers: 1,
    badge: "beginner",
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
