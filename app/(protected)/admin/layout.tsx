"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminNavbar } from "../../components/admin/AdminNavbar";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ouvert par défaut
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/getUserRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.roles || !data.roles.includes("admin")) {
            router.replace("/unauthorized");
          } else {
            setChecking(false);
          }
        });
    }
  }, [user, isLoaded, router]);

  if (checking) return null;

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