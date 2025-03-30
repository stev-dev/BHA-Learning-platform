
"use client";
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import HeroBanner from './components/Hero';
import CertificationsGrid from './components/Certifications';
import ThematiquesSection from './components/ThematiquesSection';
import CoursesDuMoment from './components/CoursesDuMoment';
import PRQ from './components/PRQ';
import Milleurs from './components/Milleurs';

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Banner bg-gradient-to-r from-blue-400 to-teal-400*/}
      <HeroBanner />

      {/* Certifications */}
      <CertificationsGrid />

      {/* Thématiques */}
      <ThematiquesSection />

      {/* Voir toutes les catégories */}
      <div className="text-center py-8">
        <Link
          href={"/student/courses"}
          className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium"
        >
          VOIR TOUTES LES CATÉGORIES
        </Link>
      </div>

      {/* Découvrez nos parcours */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-teal-500 mr-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mb-1"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full mb-1"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                </div>
              </div>

              <Link href={"/courses"}>
                <div>
                  <h3 className="text-xl text-teal-500 font-semibold mb-4">
                    DÉCOUVREZ NOS PARCOURS
                  </h3>
                  <p className="text-gray-600">
                    Apprenez en ligne avec nos Parcours constitués des
                    meilleures ressources en ligne gratuites.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start">
              <div className="text-blue-900 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <Link href={"/courses"}>
                <div>
                  <h3 className="text-xl text-blue-900 font-semibold mb-4">
                    TOUS LES COURS GRATUITS DISPONIBLES
                  </h3>
                  <p className="text-gray-600">
                    Montez en compétences sur divers sujets gratuitement en vous
                    certifiant.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CoursesDuMoment />
      {/* PourQuoi Nous ? */}
      <PRQ />

      {/* Une communauté pour trouver les meilleurs BHA */}
      <Milleurs />
    </div>
  );
}