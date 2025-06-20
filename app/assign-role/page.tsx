"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AssignRolePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentRoles, setCurrentRoles] = useState<string[]>([]);

  useEffect(() => {
    if (isLoaded && user) {
      // Récupérer les rôles actuels
      const roles = user.unsafeMetadata?.role as string[];
      if (roles && Array.isArray(roles)) {
        setCurrentRoles(roles);
        setSelectedRoles(roles);
      }
    }
  }, [user, isLoaded]);

  const handleRoleChange = (role: string) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const handleAssignRoles = async () => {
    if (!user || selectedRoles.length === 0) {
      setMessage("Veuillez sélectionner au moins un rôle");
      return;
    }

    setIsLoading(true);
    try {
      // Mettre à jour les rôles dans unsafeMetadata
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          role: selectedRoles,
        },
      });

      setMessage("Rôles assignés avec succès ! Redirection...");

      // Attendre un peu pour que les métadonnées soient mises à jour
      setTimeout(() => {
        // Rediriger selon le rôle
        if (selectedRoles.length === 1) {
          if (selectedRoles.includes("student")) {
            router.push("/student/dashboard");
          } else if (selectedRoles.includes("instructor")) {
            router.push("/instructor/courses");
          }
        } else {
          router.push("/select-role");
        }
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'assignation des rôles:", error);
      setMessage("Erreur lors de l'assignation des rôles");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connexion requise
          </h2>
          <p className="text-gray-600 mb-6">
            Vous devez être connecté pour assigner des rôles
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">🎯</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Configurer vos rôles
          </h2>
          <p className="text-gray-600 mt-2">
            Assignez des rôles à votre compte
          </p>
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Compte :</strong> {user.emailAddresses?.[0]?.emailAddress}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Rôles actuels :</strong>{" "}
              {currentRoles.length > 0
                ? currentRoles.join(", ")
                : "Aucun rôle défini"}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
            <input
              type="checkbox"
              checked={selectedRoles.includes("student")}
              onChange={() => handleRoleChange("student")}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="ml-4">
              <div className="font-semibold text-gray-900">📚 Student</div>
              <div className="text-sm text-gray-600">
                Je veux apprendre des cours
              </div>
            </div>
          </label>

          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
            <input
              type="checkbox"
              checked={selectedRoles.includes("instructor")}
              onChange={() => handleRoleChange("instructor")}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
            />
            <div className="ml-4">
              <div className="font-semibold text-gray-900">🎓 Instructor</div>
              <div className="text-sm text-gray-600">
                Je veux enseigner des cours
              </div>
            </div>
          </label>
        </div>

        <button
          onClick={handleAssignRoles}
          disabled={selectedRoles.length === 0 || isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors"
        >
          {isLoading
            ? "Assignation..."
            : selectedRoles.length === 0
            ? "Sélectionnez au moins un rôle"
            : "Enregistrer les rôles"}
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              message.includes("Erreur")
                ? "bg-red-50 text-red-800"
                : "bg-green-50 text-green-800"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Vous pouvez sélectionner plusieurs rôles si nécessaire
          </p>
        </div>
      </div>
    </div>
  );
}
