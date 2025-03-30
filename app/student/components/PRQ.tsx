import React from 'react'
import Image from 'next/image'
export default function PRQ() {
  return (
    <div>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center text-blue-900 font-semibold mb-10">
            PourQuoi Nous ?
          </h2>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              Plateforme flexible et accessible
              <p className="text-gray-600 mb-4">
                Accédez à vos formations quand vous le souhaitez, de n'importe
                où et sur n'importe quel appareil, pour apprendre à votre propre
                rythme.
              </p>
              Pratique continue
              <p className="text-gray-600 mb-4">
                Des exercices et des tests réguliers sont intégrés dans chaque
                formation pour vous permettre d'appliquer immédiatement vos
                connaissances et maîtriser les compétences acquises.
              </p>
              Qualité des formations et des formateurs
              <p className="text-gray-600 mb-4">
                Nos formations, créées par des experts, offrent un contenu de
                qualité et actualisé, alliant théorie et pratique pour une
                expérience d'apprentissage complète.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Image
                src="/images/logo.png"
                alt="My MOOC Logo"
                width={300}
                height={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-center text-gray-600">
                Plusieurs milliers de formations en ligne gratuites et
                certifiantes disponibles à tout moment.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-blue-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <p className="text-center text-gray-600">
                Le leader francophone dans la recherche d'un Cours avec 50
                000 avis consultables.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-teal-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5"
                  />
                </svg>
              </div>
              <p className="text-center text-gray-600">
                Une plateforme disponible en 5 langues et accessible
                gratuitement sur tous supports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
