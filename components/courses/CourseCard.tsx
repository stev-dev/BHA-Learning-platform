"use client";

import React from "react";
import Image from "next/image";
import ProgressBar from "../shared/ProgressBar";
import { Course } from "../../app/models/types";

interface CourseCardProps {
  course: Course;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  return (
    <div
      className={`bg-white rounded shadow p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
      tabIndex={0}
      role="link"
      aria-label={`Course: ${course.title} by ${course.instructor}`}
    >
      <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-2">By {course.instructor}</p>
      <ProgressBar progress={course.progress} ariaLabel={`Progress: ${course.progress}%`} />
    </div>
  );
};

export default CourseCard;
