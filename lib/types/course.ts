export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  price: number;
  status: 'draft' | 'published' | 'archived';
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number; // in minutes
  order: number;
  resources: Resource[];
}

export interface Resource {
  id: string;
  lessonId: string;
  title: string;
  type: 'pdf' | 'link' | 'file';
  url: string;
}