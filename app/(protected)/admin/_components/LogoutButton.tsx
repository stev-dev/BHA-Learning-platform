"use client";

import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    alert("Logging out...");
    // Add real logout logic later
  };

  return (
    <button
      className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
