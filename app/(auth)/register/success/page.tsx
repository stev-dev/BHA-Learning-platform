"use client";

import { useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function RegisterSuccess() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const roles = JSON.parse(localStorage.getItem("bha_signup_roles") || "[]");
      fetch("/api/saveUserRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          roles,
        }),
      }).then(() => {
        localStorage.removeItem("bha_signup_roles");
        setTimeout(async () => {
          await signOut();
          router.replace("/login");
        }, 2000);
      });
    }
  }, [user, isLoaded, signOut, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Inscription réussie</h2>
        <p className="mb-6">Vous allez être redirigé vers la page de connexion...</p>
        <div className="mt-4">
          <span className="animate-spin inline-block w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full"></span>
        </div>
      </div>
    </div>
  );
} 