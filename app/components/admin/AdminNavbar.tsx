"use client";

import { Avatar } from "../ui/Avatar";

export const AdminNavbar = () => (
  <header className="h-16 bg-white border-b flex items-center justify-between px-6">
    <div className="font-semibold text-lg text-gray-800">
      Admin Dashboard
    </div>
    <div className="flex items-center gap-4">
      {/* Ici tu peux ajouter des notifications, paramètres, etc. */}
      <Avatar name="Admin" />
    </div>
  </header>
);