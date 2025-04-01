"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileText,
  Server,
  BookOpen,
  FileQuestion,
} from "lucide-react";
import { Module, Course } from "./data";

interface ContentItem {
  type: "video" | "pdf" | "exercise" | "exam";
  title: string;
  url: string;
  completed?: boolean;
  duration?: string;
}

interface SubModuleContent {
  title: string;
  contentItems: ContentItem[];
}

interface ExtendedModule extends Module {
  subModulesContent?: SubModuleContent[];
  progress?: number;
}

interface CourseDetailClientProps {
  course: Course;
  modules: ExtendedModule[];
  isEnrolled: boolean;
}

export default function CourseDetailClient({
  course,
  modules,
  isEnrolled,
}: CourseDetailClientProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([]); 
  const [selectedSubModule, setSelectedSubModule] = useState({
    moduleIndex: 0,
    subModuleIndex: 0,
  });
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isModuleExpanded = (index: number) => expandedModules.includes(index); // Fonction utilitaire pour vérifier si un module est développé
// Fonction utilitaire pourvrir ou fermer un module
  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scrollToContent = () => {
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };
/// Fonction utilitaire pour sélectionner un sous-module et faire defiler vers le contenu
  const selectSubModule = (moduleIndex: number, subModuleIndex: number) => {
    setSelectedSubModule({ moduleIndex, subModuleIndex });
    scrollToContent();
  };
/// Fonction utilitaire pour faire défiler vers le haut de la page
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
/// Fonction utilitaire pour obtenir le sous-module précédent
  const getPreviousSubModule = () => {
    const { moduleIndex, subModuleIndex } = selectedSubModule;
    if (subModuleIndex > 0) {
      return { moduleIndex, subModuleIndex: subModuleIndex - 1 };
    }
    if (moduleIndex > 0) {
      return {
        moduleIndex: moduleIndex - 1,
        subModuleIndex: modules[moduleIndex - 1].subModules.length - 1,
      };
    }
    return null;
  };
/// Fonction utilitaire pour obtenir le sous-module suivant
  const getNextSubModule = () => {
    const { moduleIndex, subModuleIndex } = selectedSubModule;
    if (subModuleIndex < modules[moduleIndex].subModules.length - 1) {
      return { moduleIndex, subModuleIndex: subModuleIndex + 1 };
    }
    if (moduleIndex < modules.length - 1) {
      return { moduleIndex: moduleIndex + 1, subModuleIndex: 0 };
    }
    return null;
  };

  const handlePrevious = () => {
    const prev = getPreviousSubModule();
    if (prev) {
      setSelectedSubModule(prev);
      scrollToContent();
    }
  };

  const handleNext = () => {
    const next = getNextSubModule();
    if (next) {
      setSelectedSubModule(next);
      scrollToContent();
    }
  };
/// Fonction utilitaire pour rendre la section de contenu du module
  const renderContentSection = (
    title: string,
    icon: React.ReactNode,
    type: ContentItem["type"],
    color: string
  ) => {
    const currentModule = modules[selectedSubModule.moduleIndex];
    const currentContent =
      currentModule.subModulesContent?.[selectedSubModule.subModuleIndex];
    const items = currentContent?.contentItems.filter(
      (item) => item.type === type
    );

    if (!items || items.length === 0) return null;

    const colorClasses = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-500",
        button: "bg-blue-500 hover:bg-blue-600",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-500",
        button: "bg-purple-500 hover:bg-purple-600",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-500",
        button: "bg-green-500 hover:bg-green-600",
      },
      red: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-500",
        button: "bg-red-500 hover:bg-red-600",
      },
    };

    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${
                colorClasses[color as keyof typeof colorClasses].bg
              } p-4 rounded-lg ${
                colorClasses[color as keyof typeof colorClasses].border
              } flex items-center justify-between hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3">
                {""}
                {item.type === "video" && (
                  <PlayCircle
                    className={`w-6 h-6 ${
                      colorClasses[color as keyof typeof colorClasses].text
                    }`}
                  />
                )}
                {item.type === "pdf" && (
                  <FileText
                    className={`w-6 h-6 ${
                      colorClasses[color as keyof typeof colorClasses].text // Utilisez la classe de couleur appropriée
                    }`}
                  />
                )}
                {item.type === "exercise" && (
                  <BookOpen
                    className={`w-6 h-6 ${
                      colorClasses[color as keyof typeof colorClasses].text 
                    }`}
                  />
                )}
                {item.type === "exam" && (
                  <FileQuestion
                    className={`w-6 h-6 ${
                      colorClasses[color as keyof typeof colorClasses].text
                    }`}
                  />
                )}
                <div>
                  <span className="font-medium">{item.title}</span>
            
                  {item.duration && (
                    <p className="text-sm text-gray-500">{item.duration}</p>
                  )}
                </div>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  colorClasses[color as keyof typeof colorClasses].button
                } text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2`}
              >
                {item.type === "video" && <PlayCircle className="w-5 h-5" />}
                {item.type === "pdf" && <FileText className="w-5 h-5" />}
                {item.type === "exercise" && <BookOpen className="w-5 h-5" />}
                {item.type === "exam" && <FileQuestion className="w-5 h-5" />}
                {item.type === "video" ? "Regarder" : "Ouvrir"}
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  };
  // Vérifiez si le module est vide ou non
  // Si le module est vide, affichez un message indiquant qu'il n'y a pas de module disponible

  if (!modules || modules.length === 0) {
    return <div className="p-6 text-center">Aucun module disponible</div>;
  }
// Vérifiez si le module sélectionné est valide ou non
  const currentModule = modules[selectedSubModule.moduleIndex];
  const currentSubModule =
    currentModule?.subModules[selectedSubModule.subModuleIndex];

  return (
    <div className="flex max-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-950 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">{course.title}</h2>
        <div className="space-y-1">
          {modules.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className="border-b border-gray-700 pb-2 mb-2"
            >
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full flex items-center justify-between text-left py-2 px-2 rounded hover:bg-white-200"
              >
                <span className="text-white font-semibold">
                  Module {moduleIndex + 1}: {module.title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    isModuleExpanded(moduleIndex) ? "rotate-180" : ""
                  }`}
                />
              </button>
             { /*Vérifiez si le module est développé ou non*/}
              {isModuleExpanded(moduleIndex) && (
                <div className="ml-4 space-y-1 mt-1">
                  {module.subModules.map((subModule, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => selectSubModule(moduleIndex, subIndex)}
                      className={`w-full flex items-center gap-2 py-2 text-left rounded-md px-2 ${
                        selectedSubModule.moduleIndex === moduleIndex &&
                        selectedSubModule.subModuleIndex === subIndex
                          ? "bg-blue-900 text-blue-200"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <span className="flex-1 text-sm">{subModule}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 overflow-y-auto" ref={contentRef}>
        {currentModule && currentSubModule ? (
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">
                  Module {selectedSubModule.moduleIndex + 1} &gt; Leçon{" "}
                  {selectedSubModule.subModuleIndex + 1}
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentSubModule}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={!getPreviousSubModule()}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!getNextSubModule()}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {isEnrolled ? (
              <div className="space-y-8">
                {renderContentSection(
                  "Vidéos du Cours",
                  <PlayCircle className="w-5 h-5 text-blue-500" />,
                  "video",
                  "blue"
                )}

                {renderContentSection(
                  "Documents du Cours",
                  <FileText className="w-5 h-5 text-purple-500" />,
                  "pdf",
                  "purple"
                )}

                {renderContentSection(
                  "Exercices Pratiques",
                  <BookOpen className="w-5 h-5 text-green-500" />,
                  "exercise",
                  "green"
                )}

                {renderContentSection(
                  "Examens et Évaluations",
                  <FileQuestion className="w-5 h-5 text-red-500" />,
                  "exam",
                  "red"
                )}

                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    disabled={!getPreviousSubModule()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Leçon Précédente
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!getNextSubModule()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    Leçon Suivante
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <Server className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Accès Restreint
                </h3>
                <p className="text-gray-600 mb-4">
                  Inscrivez-vous pour accéder aux vidéos, documents, exercices
                  et examens du cours.
                </p>
                <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  S'inscrire au Cours
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Server className="w-16 h-16 text-blue-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Bienvenue sur la Plateforme
            </h2>
            <p className="text-gray-600 max-w-md">
              Sélectionnez une leçon dans le menu à gauche pour commencer.
            </p>
          </div>
        )}
      </div>

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
