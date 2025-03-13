"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookPlus,
  Library,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Publish Course",
    href: "/dashboard/publish",
    icon: BookPlus,
  },
  {
    title: "My Courses",
    href: "/dashboard/courses",
    icon: Library,
  },
  {
    title: "Profile Settings",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className="space-y-4 py-4 text-black">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold text-blue-900">Instructor Dashboard</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors ${
                pathname === item.href ? "bg-blue-100 text-blue-600" : "text-gray-900"
              }`}
            >
              <item.icon className="mr-2 h-4 w-4 text-gray-600" />
              {item.title}
            </Link>
          ))}
          <button
            className="w-full flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4 text-gray-600" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white shadow-lg z-40 transition-transform duration-200 ease-in-out`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed inset-y-0 z-50 flex-col w-64 bg-white border-r">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="p-8 text-black">{children}</main>
      </div>
    </div>
  );
}