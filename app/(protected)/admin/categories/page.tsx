"use client";

import React, { useState } from "react";

const initialCategories = [
  {
    id: 1,
    name: "Web Development",
    courses: 12,
    students: 340,
    status: "Active",
  },
  {
    id: 2,
    name: "Data Science",
    courses: 8,
    students: 220,
    status: "Archived",
  },
  {
    id: 3,
    name: "Design",
    courses: 5,
    students: 150,
    status: "Active",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    const newId = categories.length + 1;
    setCategories([
      ...categories,
      { id: newId, name: newCategory, courses: 0, students: 0, status: "Active" },
    ]);
    setNewCategory("");
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories Management</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Categories</h3>
          <p className="text-xl font-semibold">{categories.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Courses</h3>
          <p className="text-xl font-semibold">
            {categories.reduce((sum, c) => sum + c.courses, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Students</h3>
          <p className="text-xl font-semibold">
            {categories.reduce((sum, c) => sum + c.students, 0)}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search categories..."
          className="border border-gray-300 rounded px-4 py-2 w-1/3"
        />
        <select className="border border-gray-300 rounded px-4 py-2">
          <option>Sort by Name</option>
          <option>Sort by Courses</option>
          <option>Sort by Students</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Category</th>
              <th className="border border-gray-300 p-2 text-left">Courses</th>
              <th className="border border-gray-300 p-2 text-left">Students</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No categories available.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{category.name}</td>
                  <td className="border border-gray-300 p-2">{category.courses}</td>
                  <td className="border border-gray-300 p-2">{category.students}</td>
                  <td className="border border-gray-300 p-2">{category.status}</td>
                  <td className="border border-gray-300 p-2">
                    <button className="text-blue-600 hover:underline mr-2">
                      View
                    </button>
                    <button className="text-green-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(category.id)}
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

      {/* Add New Category Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
