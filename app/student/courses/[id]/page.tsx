"use client";

import Link from "next/link";
import CourseDetailClient from "../components/detailscours";
import { courseData, modulesData } from "../components/data";

export default function CourseDetailPage() {
  const isEnrolled = true;
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
          {courseData.title}
        </h1>
        <CourseDetailClient
          course={courseData}
          modules={modulesData}
          isEnrolled={isEnrolled}
        />
      </div>
    </div>
  );
}