"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CourseViewerProps {
  course: any;
  isEnrolled: boolean;
}

export default function CourseViewer({ course, isEnrolled }: CourseViewerProps) {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState(0);

  const handleEnroll = async () => {
    try {
      const response = await fetch(`/api/courses/${course.id}/enroll`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to enroll');
      }

      router.refresh();
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <div className="prose max-w-none" 
               dangerouslySetInnerHTML={{ __html: course.description }} 
          />
          
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Enroll Now
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              {course.modules?.map((module: any, index: number) => (
                <div key={module.id} className="border rounded-md p-4">
                  <h3 className="font-medium">{module.title}</h3>
                  <div className="mt-2 space-y-2">
                    {module.lessons?.map((lesson: any) => (
                      <button
                        key={lesson.id}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
                        onClick={() => setActiveModule(index)}
                      >
                        {lesson.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}