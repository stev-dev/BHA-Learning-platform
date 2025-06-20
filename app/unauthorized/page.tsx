"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection vers la page de connexion après 5 secondes
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl text-white">🔒</span>
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Accès non autorisé
        </h1>
        <p className="text-gray-600 mb-8">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          Vous serez redirigé vers la page de connexion dans quelques instants.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Retour à la connexion
        </button>
      </div>
    </div>
  );
}
