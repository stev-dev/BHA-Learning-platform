"use client";

import { SignUp, useUser, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/auth";

export default function RegisterPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      // Si déjà connecté, forcer la déconnexion puis reload la page
      signOut().then(() => {
        router.replace("/register");
      });
    }
  }, [user, isLoaded, router, signOut]);

  const handleContinue = () => {
    if (roles.length === 0) {
      setError("Veuillez sélectionner au moins un rôle");
      return;
        }
    localStorage.setItem("bha_signup_roles", JSON.stringify(roles));
    setStep(2);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">BHA</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Choisissez votre rôle</h1>
            <p className="text-gray-600 mt-2">
              Sélectionnez un ou plusieurs rôles
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
              <input
                type="checkbox"
                checked={roles.includes(UserRole.STUDENT)}
                onChange={() =>
                  setRoles((r) =>
                    r.includes(UserRole.STUDENT)
                      ? r.filter((x) => x !== UserRole.STUDENT)
                      : [...r, UserRole.STUDENT]
                  )
                }
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
                checked={roles.includes(UserRole.INSTRUCTOR)}
                onChange={() =>
                  setRoles((r) =>
                    r.includes(UserRole.INSTRUCTOR)
                      ? r.filter((x) => x !== UserRole.INSTRUCTOR)
                      : [...r, UserRole.INSTRUCTOR]
                  )
                }
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
            onClick={handleContinue}
            disabled={roles.length === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            {roles.length === 0
              ? "Sélectionnez au moins un rôle"
              : "Continuer"}
          </button>
        </div>
      </div>
    );
  }

  // Étape 2: Formulaire d'inscription Clerk
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">BHA</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-600 mt-2">
            Rejoignez notre plateforme d'apprentissage
          </p>
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Rôles sélectionnés :</strong> {roles.join(", ")}
            </p>
          </div>
        </div>

        <SignUp
          path="/register"
          routing="path"
          signInUrl="/login"
          afterSignUpUrl="/register/success"
          appearance={{
            elements: {
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
              card: "shadow-lg",
            },
          }}
        />
      </div>
    </div>
  );
}
