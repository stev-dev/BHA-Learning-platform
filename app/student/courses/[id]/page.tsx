"use client";

import Link from "next/link";
import CourseDetailClient from "../components/detailscours";
import { courseData, modulesData } from "../components/data";

export default function CourseDetailPage() {
  const isEnrolled = true;
  return (
    <div className="max-h-screen bg-gray-50">
      <div className="max-w-full mx-auto px-2 sm:px-2 lg:px-4 py-4">
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