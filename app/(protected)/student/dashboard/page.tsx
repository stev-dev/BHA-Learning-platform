"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function StudentDashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">
            BHA - Espace Étudiant
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/role-selection"
              className="text-gray-700 hover:text-blue-600"
            >
              Changer de rôle
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-4">
            Bienvenue, {user?.firstName}!
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Vous êtes connecté en tant qu'étudiant. Explorez vos cours et
            continuez votre apprentissage.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Mes Cours
              </h3>
              <p className="text-blue-600 mb-4">
                Accédez à tous vos cours inscrits
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                Voir mes cours
              </button>
            </div>

            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Progression
              </h3>
              <p className="text-green-600 mb-4">
                Suivez votre progression d'apprentissage
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                Voir progression
              </button>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Certificats
              </h3>
              <p className="text-purple-600 mb-4">
                Vos certificats et accomplissements
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md">
                Mes certificats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
