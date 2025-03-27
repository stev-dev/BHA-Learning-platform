"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileText,
  Server,
} from "lucide-react";
import { Module, Course } from "./data";

interface ContentItem {
  type: "video" | "pdf";
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
  const [selectedSubModule, setSelectedSubModule] = useState<{
    moduleIndex: number;
    subModuleIndex: number;
  } | null>({ moduleIndex: 0, subModuleIndex: 0 });
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectSubModule = (moduleIndex: number, subModuleIndex: number) => {
    setSelectedSubModule({ moduleIndex, subModuleIndex });
  };

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

  const getPreviousSubModule = () => {
    if (!selectedSubModule) return null;
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

  const getNextSubModule = () => {
    if (!selectedSubModule) return null;
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
    if (prev) setSelectedSubModule(prev);
  };

  const handleNext = () => {
    const next = getNextSubModule();
    if (next) setSelectedSubModule(next);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
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
                className="w-full flex items-center justify-between text-left py-2 px-2 rounded hover:bg-gray-700"
              >
                <span className="text-white font-semibold">
                  Module {moduleIndex + 1}: {module.title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedModules.includes(moduleIndex) ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedModules.includes(moduleIndex) && (
                <div className="ml-4 space-y-1 mt-1">
                  {module.subModules.map((subModule, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => selectSubModule(moduleIndex, subIndex)}
                      className={`w-full flex items-center gap-2 py-2 text-left rounded-md px-2 ${
                        selectedSubModule?.moduleIndex === moduleIndex &&
                        selectedSubModule?.subModuleIndex === subIndex
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
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        {selectedSubModule ? (
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">
                  Module {selectedSubModule.moduleIndex + 1} {`>`} Leçon{" "}
                  {selectedSubModule.subModuleIndex + 1}
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {
                    modules[selectedSubModule.moduleIndex].subModules[
                      selectedSubModule.subModuleIndex
                    ]
                  }
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

            {!isEnrolled ? (
              <div className="space-y-8">
                {/* Section Vidéos */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Vidéos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules[selectedSubModule.moduleIndex].subModulesContent?.[
                      selectedSubModule.subModuleIndex
                    ]?.contentItems
                      .filter((item) => item.type === "video")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <PlayCircle className="w-6 h-6 text-blue-500" />
                              <span className="font-medium">{item.title}</span>
                              {item.duration && (
                                <span className="text-sm text-gray-500 ml-2">
                                  ({item.duration})
                                </span>
                              )}
                            </div>
                            {item.completed && (
                              <span className="text-green-600 text-sm">
                                Complété
                              </span>
                            )}
                          </div>
                          <div className="bg-gray-200 h-48 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={() => window.open(item.url, "_blank")}
                                className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center hover:bg-blue-600 transition-colors"
                              >
                                <PlayCircle className="w-8 h-8" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>

                {/* Section PDFs des Cours */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Documents du Cours
                  </h2>
                  <div className="space-y-4">
                    {modules[selectedSubModule.moduleIndex].subModulesContent?.[
                      selectedSubModule.subModuleIndex
                    ]?.contentItems
                      .filter((item) => item.type === "pdf")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-purple-500" />
                            <div>
                              <span className="font-medium">{item.title}</span>
                              <p className="text-sm text-gray-500">
                                Document de référence
                              </p>
                            </div>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors flex items-center gap-2"
                          >
                            <FileText className="w-5 h-5" />
                            Ouvrir
                          </a>
                        </div>
                      ))}
                  </div>
                </section>

                {/* Navigation */}
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
                  Inscrivez-vous pour accéder aux vidéos et documents du cours.
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
