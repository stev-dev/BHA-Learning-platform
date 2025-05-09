"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Manage Categories", path: "/admin/categories" },
    { name: "Manage Courses", path: "/admin/courses" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              pathname === item.path
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
    </div>
  );
};

export default Sidebar;