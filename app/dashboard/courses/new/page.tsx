"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseForm from '../../components/CourseForm';

export default function NewCoursePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (courseData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/instructor/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create course');
      }

      router.push('/dashboard/courses');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create course');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}
      <CourseForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}