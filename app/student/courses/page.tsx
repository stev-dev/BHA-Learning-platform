"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Clock,
  BookOpen,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Course } from "./courses-data";

const STATIC_COURSES = (await import("./courses-data")).STATIC_COURSES;

// Course Card Component (unchanged)
const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
    <div className="relative h-48 sm:h-56 md:h-60 w-full">
      <Image
        src={course.image}
        alt={course.title}
        fill
        className="object-cover rounded-t-xl"
      />
      {course.isFeatured && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
          Mis en avant
        </div>
      )}
    </div>
    <div className="p-3 sm:p-4 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            course.level === "Débutant"
              ? "bg-green-100 text-green-800"
              : course.level === "Intermédiaire"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {course.level}
        </span>
        <span className="text-xs text-gray-600 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {course.duration}
        </span>
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {course.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
        {course.description}
      </p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium ml-1">{course.rating}</span>
          </div>
          <span className="text-gray-600">
            {course.students.toLocaleString()} étudiants
          </span>
        </div>
        <Link
          href={`/student/courses/${course.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Voir le cours →
        </Link>
      </div>
    </div>
  </div>
);

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedLevel, setSelectedLevel] = useState<string>("Tous");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
  const coursesPerPage = 3; // Number of courses per page in expanded view

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        setCourses(STATIC_COURSES);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    setExpandedCategory(null); // Reset expanded category on search
    setCurrentPage({}); // Reset pagination
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery) ||
      course.description.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategory === "Tous" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "Tous" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const handleShowMore = (category: string) => {
    setExpandedCategory(category);
    setCurrentPage((prev) => ({ ...prev, [category]: 1 }));
  };

  const getCoursesForCategory = (category: string) => {
    const categoryCourses = groupedCourses[category] || [];
    if (expandedCategory !== category) {
      return categoryCourses.slice(0, 3); // Show only 3 courses initially
    }

    // Pagination for expanded category
    const page = currentPage[category] || 1;
    const indexOfLastCourse = page * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    return categoryCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  };

  const getTotalPagesForCategory = (category: string) => {
    const categoryCourses = groupedCourses[category] || [];
    return Math.ceil(categoryCourses.length / coursesPerPage);
  };

  const handlePageChange = (category: string, page: number) => {
    setCurrentPage((prev) => ({ ...prev, [category]: page }));
  };

  const categories = [
    "Tous",
    ...new Set(courses.map((course) => course.category)),
  ];
  const levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Filters (unchanged) */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/student"
            className="text-blue-900 hover:underline px-4 sm:px-6 lg:px-8 py-4"
          >
            ← Retour à l'accueil
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des cours..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm sm:text-base"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors sm:w-auto w-full justify-center text-sm sm:text-base"
            >
              <Filter className="h-5 w-5" />
              Filtres
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 flex flex-col sm:flex-row gap-4 pb-4">
              <div className="flex flex-col gap-2 w-full sm:w-48">
                <label className="text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setExpandedCategory(null);
                    setCurrentPage({});
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-48">
                <label className="text-sm font-medium text-gray-700">
                  Niveau
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setExpandedCategory(null);
                    setCurrentPage({});
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Explorer notre catalogue de cours
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Découvrez {filteredCourses.length} cours conçus pour votre parcours
            d'apprentissage
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3,4].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-48 sm:h-56 md:h-60 rounded-t-xl" />
                <div className="bg-white p-3 sm:p-4 rounded-b-xl">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedCourses).map(
              ([category, categoryCourses]) => (
                <section key={category}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {category} ({categoryCourses.length})
                    </h2>
                    <button
                      onClick={() => handleShowMore(category)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Voir tous les cours →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCoursesForCategory(category).map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>

                  {/* Pagination for Expanded Category */}
                  {expandedCategory === category &&
                    getTotalPagesForCategory(category) > 1 && (
                      <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            handlePageChange(
                              category,
                              (currentPage[category] || 1) - 1
                            )
                          }
                          disabled={(currentPage[category] || 1) === 1}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-600" />
                        </button>

                        <div className="flex gap-1">
                          {Array.from(
                            { length: getTotalPagesForCategory(category) },
                            (_, i) => i + 1
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(category, page)}
                              className={`px-3 py-1 rounded-md ${
                                (currentPage[category] || 1) === page
                                  ? "bg-blue-900 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            handlePageChange(
                              category,
                              (currentPage[category] || 1) + 1
                            )
                          }
                          disabled={
                            (currentPage[category] || 1) ===
                            getTotalPagesForCategory(category)
                          }
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    )}
                </section>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucun cours trouvé correspondant à vos critères. Essayez d'ajuster
              vos filtres ou termes de recherche.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
