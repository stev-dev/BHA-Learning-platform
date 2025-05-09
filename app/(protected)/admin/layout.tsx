import React from "react";
import Navbar from "@/app/components/admin/Navbar";
import Sidebar from "@/app/components/admin/Sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}