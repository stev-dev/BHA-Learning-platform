"use client";
import { SignIn, useUser, useClerk } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromRegister = searchParams.get("from") === "register";

  if (isLoaded && user) {
    if (fromRegister) {
      // Affiche un message d'inscription réussie, pas l'écran de déconnexion
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Inscription réussie</h2>
            <p className="mb-6">Veuillez vous déconnecter pour vous connecter avec un autre compte, ou continuer.</p>
            <button
              onClick={async () => {
                await signOut();
                router.replace("/login");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Se déconnecter / Changer de compte
            </button>
          </div>
        </div>
      );
    }
    // Cas normal : déjà connecté
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Vous êtes déjà connecté</h2>
          <p className="mb-6">Pour vous connecter avec un autre compte, veuillez vous déconnecter.</p>
          <button
            onClick={async () => {
              await signOut();
              router.replace("/login");
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Se déconnecter / Changer de compte
          </button>
        </div>
      </div>
    );
  }

  // Sinon, affiche le formulaire Clerk
  return <SignIn routing="hash" signUpUrl="/register" afterSignInUrl="/post-login" />;
} 