"use client";

import React from "react";
import { AuthProvider } from "@/lib/AuthContext";
import { ScrollProvider } from "@/app/student/components/scroll-context"; // Importez le contexte de défilement
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider><ScrollProvider>{children}</ScrollProvider></AuthProvider>;
}
