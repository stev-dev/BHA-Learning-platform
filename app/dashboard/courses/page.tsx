"use client";

import { useState } from "react";
import { MoreVertical, Search } from "lucide-react";

const mockCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    status: "published",
    students: 156,
    revenue: 4680,
    lastUpdated: "2024-03-20",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    status: "draft",
    students: 0,
    revenue: 0,
    lastUpdated: "2024-03-19",
  },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">My Courses</h2>
        <p className="text-gray-500 md:text-lg">Manage and track all your published courses.</p>
      </div>

      <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-4">
        <div className="relative flex-1 md:w-1/2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:ml-4"
          onClick={() => window.location.href = '/dashboard/publish'}
        >
          Create New Course
        </button>
      </div>

      <div className="rounded-md border border-gray-200 md:overflow-x-auto">
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredCourses.map((course) => (
            <div key={course.id} className="p-4 border rounded-md shadow-md">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p>Status: {course.status}</p>
              <p>Students: {course.students}</p>
              <p>Revenue: ${course.revenue}</p>
              <p>Last Updated: {course.lastUpdated}</p>
            </div>
          ))}
        </div>
        <table className="min-w-full divide-y divide-gray-200 hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="relative px-6 py-3 w-[50px]"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    course.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${course.revenue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                      className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                    {openMenuId === course.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpenMenuId(null)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpenMenuId(null)}
                          >
                            View Analytics
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => setOpenMenuId(null)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
