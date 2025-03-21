// app/admin/layout.tsx
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center">Admin Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <a
                href="/admin/dashboard"
                className="block px-6 py-3 hover:bg-blue-600 transition duration-300 rounded-lg"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/courses"
                className="block px-6 py-3 hover:bg-blue-600 transition duration-300 rounded-lg"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                className="block px-6 py-3 hover:bg-blue-600 transition duration-300 rounded-lg"
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="/admin/settings"
                className="block px-6 py-3 hover:bg-blue-600 transition duration-300 rounded-lg"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className="px-6 py-4 border-t border-gray-300">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to Your Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ New Course</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
