"use client";


import React, { ReactNode, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminNavbar } from "../../components/admin/AdminNavbar";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ouvert par défaut

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;