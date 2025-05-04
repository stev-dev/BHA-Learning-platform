'use client'; // This marks this component as a client-side component

import React, { useState } from "react";

const initialCourses = [
  { id: 1, title: "Math 101", description: "Introduction to Math", duration: "3 months" },
  { id: 2, title: "Science 101", description: "Basic Science concepts", duration: "4 months" },
  { id: 3, title: "History 101", description: "World History Overview", duration: "2 months" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [newCourse, setNewCourse] = useState({ title: "", description: "", duration: "" });
  const [editingCourse, setEditingCourse] = useState<{ id: number; title: string; description: string; duration: string } | null>(null);

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title && newCourse.description && newCourse.duration) {
      setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
      setNewCourse({ title: "", description: "", duration: "" }); // Clear form
      alert("Course added successfully!");
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
    alert("Course deleted successfully!");
  };

  const handleEditCourse = (id: number) => {
    const course = courses.find((course) => course.id === id);
    if (course) {
      setEditingCourse(course);
    }
  };

  const handleUpdateCourse = () => {
    if (editingCourse) {
      setCourses(
        courses.map((course) =>
          course.id === editingCourse.id ? { ...editingCourse } : course
        )
      );
      setEditingCourse(null); // Reset editing mode
      alert("Course updated successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courses Management</h1>
      
      {/* Search */}
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Courses Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-left">Duration</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No courses found.
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{course.title}</td>
                  <td className="border border-gray-300 p-2">{course.description}</td>
                  <td className="border border-gray-300 p-2">{course.duration}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleEditCourse(course.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter course title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter course description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter course duration"
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Course
          </button>
        </form>
      </div>

      {/* Edit Course Form */}
      {editingCourse && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Edit Course</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCourse();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editingCourse.description}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editingCourse.duration}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, duration: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
