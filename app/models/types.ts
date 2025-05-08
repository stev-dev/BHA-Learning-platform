export interface Course {
  id: string;
  title: string;
  thumbnailUrl: string;
  instructor: string;
  progress: number; // 0 to 100
  category?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  enrolledCourses: Course[];
  notificationsEnabled: boolean;
}
