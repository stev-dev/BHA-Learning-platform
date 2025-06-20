import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/config/auth";

interface AuthErrorProps {
  errorType: keyof typeof authConfig.errorMessages;
  onRetry?: () => void;
}

export default function AuthError({ errorType, onRetry }: AuthErrorProps) {
  const router = useRouter();
  const errorMessage = authConfig.errorMessages[errorType];

  useEffect(() => {
    // Redirection automatique après 5 secondes
    const timer = setTimeout(() => {
      router.push(authConfig.publicRoutes.login);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl text-white">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          {errorType === "sessionExpired" ? "Session expirée" : "Erreur d'authentification"}
        </h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        <div className="space-y-4">
          {errorType === "sessionExpired" && (
            <button
              onClick={() => router.push(authConfig.publicRoutes.login)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Se reconnecter
            </button>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          )}

          <button
            onClick={() => router.push(authConfig.publicRoutes.login)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
