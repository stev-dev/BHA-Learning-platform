"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Menu,
  Search,
  X,
  ChevronDown,
  User,
  Book,
  Briefcase,
  Star,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { user, logout } = useAuth(); // Utilisez le contexte d'authentification
  const pathname = usePathname();

  const pagesSansLayout = ["/auth/login", "/auth/register", "/student/courses", "/student/courses/[id]"];

  if (pagesSansLayout.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Main Nav */}
              <div className="flex items-center space-x-8">
                <Link
                  href="/student"
                  className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src="/images/logo.png"
                    width={52}
                    height={52}
                    alt="Logo"
                    className="rounded-md"
                  />
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                  <Link
                    href="/student/courses"
                    className="flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    <Book className="h-4 w-4 mr-1" />
                    <span>Catégories</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    <span>Parcours</span>
                  </Link>
                </div>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Rechercher un Cours"
                    className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-6">
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200 flex items-center"
                  >
                    <Star className="h-4 w-4 mr-1" />
                    <span>Les tops</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-amber-600 group transition-colors duration-200 relative"
                  >
                    <span>Blog</span>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200 flex items-center"
                  >
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>Entreprises</span>
                  </Link>

                  {/* Bouton Sign in ou Compte */}
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsAccountOpen(!isAccountOpen)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-6 py-2 transition-colors duration-200 shadow-sm hover:shadow flex items-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        <span>Compte</span>
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>
                      {isAccountOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                          <div className="p-4 border-b">
                            <p className="text-sm font-medium text-gray-900">
                              Bienvenue, {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              logout();
                              setIsAccountOpen(false); // Ferme la carte après déconnexion
                            }}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 flex items-center"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Déconnexion
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg px-6 py-2 transition-colors duration-200 shadow-sm hover:shadow flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span>Sign in</span>
                    </Link>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-200"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                  <span className="sr-only">Menu</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-4 pt-4 pb-6 space-y-3">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Rechercher un cours"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <Link
                  href="/student/courses"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                >
                  <Book className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Catégories</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                >
                  <Star className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Parcours</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                >
                  <Star className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Les tops</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                >
                  <BookOpen className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Blog</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                >
                  <Briefcase className="h-4 w-4 mr-2 text-amber-600" />
                  <span>Entreprises</span>
                </Link>

                {/* Menu mobile pour Sign in ou Compte */}
                {user ? (
                  <div className="relative w-full">
                    <button
                      onClick={() => setIsAccountOpen(!isAccountOpen)}
                      className="w-full flex items-center justify-between bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-xl px-6 py-3 transition-all duration-300 hover:from-amber-700 hover:to-amber-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-3" />
                        <span className="text-base">Compte</span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          isAccountOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {isAccountOpen && (
                      <div className="absolute left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-10 transform origin-top animate-slide-down">
                        <div className="p-4 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 tracking-tight">
                            Bienvenue, {user.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 rounded-b-xl"
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          <span className="text-sm font-medium">
                            Déconnexion
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-xl px-6 py-3 transition-all duration-300 hover:from-amber-700 hover:to-amber-800 shadow-md hover:shadow-lg"
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span className="text-base">Sign in</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow bg-white">
          <div>{children}</div>
        </main>

        {/* Footer reste inchangé */}
        <footer className="bg-blue-900 text-white py-6 mt-1 border-t">
          <div className="max-w-scrren mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* À propos */}
              <div>
                <h3 className="text-lg font-semibold text-amber-600  mb-3">
                  À propos
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Notre mission
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Équipe
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Carrières
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Ressources */}
              <div>
                <h3 className="text-lg font-semibold text-amber-600  mb-3">
                  Ressources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Webinaires
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold text-amber-600 mb-3">
                  Support
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Centre d'aide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Légal */}
              <div>
                <h3 className="text-lg font-semibold text-amber-600 mb-3">
                  Légal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Conditions d'utilisation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Politique de confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-amber-600 transition-colors duration-200"
                    >
                      Mentions légales
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bas du footer */}
            <div className="mt-8 pt-8 pb-8  border-t bg-blue-900">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-amber-50">
                  © {new Date().getFullYear()} BHA. Tous droits réservés.
                </p>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-amber-50 hover:text-amber-600 transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-amber-50 hover:text-amber-600 transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-amber-50 hover:text-amber-600 transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-amber-50 hover:text-amber-600 transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                      <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                      <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}