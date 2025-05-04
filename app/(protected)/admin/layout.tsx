import React from "react";
import Link from "next/link";
import LogoutButton from "./_components/LogoutButton"; // Adjust path if needed

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/users" className="block p-2 rounded hover:bg-gray-700">
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/courses" className="block p-2 rounded hover:bg-gray-700">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="block p-2 rounded hover:bg-gray-700">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block p-2 rounded hover:bg-gray-700">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
