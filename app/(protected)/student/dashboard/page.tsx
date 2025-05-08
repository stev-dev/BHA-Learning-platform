import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "../../../../components/courses/CourseCard";
import Select from "../../../../components/ui/Select";
import { StudentProfile, Course } from "../../../models/types";

async function fetchProfile(): Promise<StudentProfile> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/student/profile`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

async function fetchCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/student/courses`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
}

const DashboardPage = async () => {
  let profile: StudentProfile | null = null;
  let courses: Course[] = [];

  try {
    profile = await fetchProfile();
    courses = await fetchCourses();
  } catch (error) {
    // Handle error or show fallback UI
  }

  if (!profile) {
    return <p className="text-red-600">Failed to load profile.</p>;
  }

  // Filter and sort state for client interactivity
  // Since this is a server component, we will render static for now
  // Client interactivity can be added later if needed

  const continueLearning = courses.slice(0, 4);
  const recommendedCourses: Course[] = [
    {
      id: "rec1",
      title: "Recommended Course 1",
      thumbnailUrl: "/images/CR1.avif",
      instructor: "Instructor A",
      progress: 0,
    },
    {
      id: "rec2",
      title: "Recommended Course 2",
      thumbnailUrl: "/images/CR2.jpg",
      instructor: "Instructor B",
      progress: 0,
    },
  ];

  return (
    <section className="p-6 min-h-screen bg-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold font-sans text-gray-900">
          Welcome back, {profile.name}!
        </h1>
        <p className="text-lg text-gray-700 mt-1">Keep learning, {profile.name}!</p>
      </header>

      <nav className="mb-6 flex space-x-4" aria-label="Quick links">
        <Link
          href="/student/profile"
          className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
        >
          Profile
        </Link>
        <Link
          href="/student/courses"
          className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
        >
          Course Library
        </Link>
        <Link
          href="/student/search"
          className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
        >
          Search
        </Link>
      </nav>

      <section aria-labelledby="continue-learning-heading" className="mb-8">
        <h2
          id="continue-learning-heading"
          className="text-xl font-bold font-sans mb-4 text-gray-900"
        >
          Continue Learning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {continueLearning.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section aria-labelledby="recommended-courses-heading" className="mb-8">
        <h2
          id="recommended-courses-heading"
          className="text-xl font-bold font-sans mb-4 text-gray-900"
        >
          Recommended Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section aria-labelledby="filter-sort-heading" className="mb-8">
        <h2 id="filter-sort-heading" className="text-xl font-bold font-sans mb-4 text-gray-900">
          Filter & Sort Courses
        </h2>
        {/* For now, static Select component without interactivity */}
        <Select
          label="Sort by"
          options={[
            { value: "progress", label: "Progress" },
            { value: "category", label: "Category" },
          ]}
          aria-label="Sort courses"
          onChange={() => {}}
        />
      </section>
    </section>
  );
};

export default DashboardPage;
