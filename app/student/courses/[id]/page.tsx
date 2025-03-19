"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import CourseDetailClient from "../components/detailscours";
import { STATIC_COURSES, MODULES } from "../courses-data";

export default function CourseDetailPage() {
  const { id } = useParams();
  const courseId = parseInt(id as string, 10);
  const course = STATIC_COURSES.find((c) => c.id === courseId);
  const courseModules =
    MODULES.find((m) => m.courseId === courseId)?.modules || [];

  // Simuler une vérification d'inscription 
  const isEnrolled = true; 

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cours non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/student/courses"
          className="text-blue-900 hover:underline mb-4 inline-block"
        >
          ← Retour au catalogue
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {course.title}
        </h1>

        <CourseDetailClient
          course={course}
          modules={courseModules}
          isEnrolled={isEnrolled}
        />
      </div>
    </div>
  );
}
