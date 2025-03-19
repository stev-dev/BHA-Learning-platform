"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Clock,
  Lock,
  Monitor,
  Signal,
  Beaker,
  PlayCircle,
  FileText,
  HelpCircle,
  Menu,
  ChevronUp,
} from "lucide-react";
import {
  Course,
  Module,
  STATIC_COURSES,
  Static_Achievements,
} from "../courses-data";

interface ContentItem {
  type: "video" | "quiz" | "pdf";
  title: string;
  url?: string;
  completed?: boolean;
}

interface ExtendedModule extends Module {
  content?: ContentItem[];
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
  const [activeTab, setActiveTab] = useState<"Overview" | "Curriculum">(
    "Curriculum"
  );
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("Overview")}
            className={`${
              activeTab === "Overview"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("Curriculum")}
            className={`${
              activeTab === "Curriculum"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Curriculum
          </button>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Here’s what you will learn.
          </h2>

          {activeTab === "Overview" ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600">{course.description}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Objectifs d'apprentissage
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    Comprendre les concepts de base de{" "}
                    {course.category.toLowerCase()}.
                  </li>
                  <li>
                    Appliquer les connaissances dans des projets pratiques.
                  </li>
                  <li>Préparer une certification reconnue (si applicable).</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <button
                    onClick={() => toggleModule(index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Menu className="w-4 h-4 text-green-600" />
                      </div>

                      <span className="text-gray-900 font-semibold">
                        {module.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-green-500 transition-transform ${
                        expandedModules.includes(index) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedModules.includes(index) && (
                    <div className="pl-12 pr-4 pb-4">
                      {!isEnrolled ? (
                        <div className="text-gray-600">
                          <p className="mb-4">
                            Vous devez vous inscrire pour accéder au contenu de
                            ce cours.
                          </p>
                          {module.subModules.length > 0 && (
                            <div className="space-y-2">
                              {module.subModules.map((subModule, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="flex items-center gap-3 py-2 text-gray-600"
                                >
                                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-600 text-xs">
                                      {subIndex + 1}
                                    </span>
                                  </div>
                                  <span>{subModule}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {module.content && (
                            <div className="space-y-2 mt-4">
                              {module.content.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex items-center gap-3 py-2"
                                >
                                  {item.type === "video" && (
                                    <PlayCircle className="w-5 h-5 text-gray-500" />
                                  )}
                                  {item.type === "quiz" && (
                                    <HelpCircle className="w-5 h-5 text-gray-500" />
                                  )}
                                  {item.type === "pdf" && (
                                    <FileText className="w-5 h-5 text-gray-500" />
                                  )}
                                  <span className="text-gray-600">
                                    {item.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          {module.subModules.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {module.subModules.map((subModule, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="flex items-center gap-3 py-2 text-gray-600"
                                >
                                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-600 text-xs">
                                      {subIndex + 1}
                                    </span>
                                  </div>
                                  <span>{subModule}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {module.content && module.content.length > 0 && (
                            <div className="space-y-2">
                              {module.content.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex items-center gap-3 py-2"
                                >
                                  {item.type === "video" && (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-3 text-blue-600 hover:underline"
                                    >
                                      <PlayCircle className="w-5 h-5" />
                                      <span>{item.title}</span>
                                    </a>
                                  )}
                                  {item.type === "quiz" && (
                                    <a
                                      href={item.url || "#"}
                                      className="flex items-center gap-3 text-blue-600 hover:underline"
                                    >
                                      <HelpCircle className="w-5 h-5" />
                                      <span>{item.title}</span>
                                    </a>
                                  )}
                                  {item.type === "pdf" && (
                                    <a
                                      href={item.url}
                                      download
                                      className="flex items-center gap-3 text-blue-600 hover:underline"
                                    >
                                      <FileText className="w-5 h-5" />
                                      <span>{item.title}</span>
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Info de cours*/}

        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-500" />
                <span>FREE</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>6 HOURS</span>
              </div>
              <div className="flex items-center gap-2">
                <Signal className="w-5 h-5 text-gray-500" />
                <span>BEGINNER</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Monitor className="w-5 h-5 text-gray-500" />
                <span>SELF-PACED</span>
              </div>
            </div>
          </div>
          {/* Achievements*/}

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Achievements
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Badges que vous pouvez gagner dans ce cours.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {Static_Achievements.map((achievement, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center border border-green-300">
                   
                  </div>
                  <span className="text-green-700 text-sm font-medium mt-2">
                    {achievement.badge}
                  </span>
                  {achievement.completed !== undefined && (
                    <span className="text-xs text-gray-500">
                      {achievement.completed}% complété
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* showScrollToTop*/}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
