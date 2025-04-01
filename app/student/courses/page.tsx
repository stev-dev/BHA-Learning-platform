"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Course } from "./courses-data";
// CourseCard Component
const CourseCard: React.FC<{ course: Course; uniqueKey: string }> = ({
  course,
  uniqueKey,
}) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col w-full max-w-[280px] mx-auto h-full">
    <div className="relative h-32 w-full">
      <Image
        src={course.image}
        alt={course.title}
        fill
        className="object-cover rounded-t-lg"
      />
      
    </div>
    <div className="p-3 flex-1 flex flex-col">
      <div className="flex items-center gap-1 mb-1">
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
            course.level === "Débutant"
              ? "bg-green-100 text-green-800"
              : course.level === "Intermédiaire"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {course.level}
        </span>
        <span className="text-[10px] text-gray-600 flex items-center gap-0.5">
          <Clock className="w-3 h-3" />
          {course.duration}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
        {course.title}
      </h3>
      <p className="text-xs text-gray-600 mb-2 flex-1 line-clamp-2">
        {course.description}
      </p>
      <div className="flex items-center justify-between text-xs mt-auto">
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="font-medium ml-0.5">{course.rating}</span>
          </div>
          <span className="text-gray-600">
            {course.students.toLocaleString()} étudiants
          </span>
        </div>
        <Link
          href={`/student/courses/${course.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-xs"
        >
          Voir →
        </Link>
      </div>
    </div>
  </div>
);

// Composant de pagination séparé pour plus de clarté
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  categoryId: string;
}> = ({ currentPage, totalPages, onPageChange, categoryId }) => {
  // Affiche maximum 5 boutons de page à la fois
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      // Si on a moins de pages que le maximum de boutons, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sinon, afficher les pages autour de la page courante
      let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      let endPage = startPage + maxButtons - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

    
      if (startPage > 1) {
        pageNumbers.unshift(1);
        if (startPage > 2) pageNumbers.splice(1, 0, -1); 
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push(-1);
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Page précédente"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) =>
          page === -1 ? (
            // Clé unique pour les ellipses
            <span key={`ellipsis-${categoryId}-${index}`} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              // Clé unique pour chaque bouton de page
              key={`pageBtn-${categoryId}-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Page suivante"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};
{'/* Page principale des cours */}'}
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [selectedLevel, setSelectedLevel] = useState<string>("Tous");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [categoryPages, setCategoryPages] = useState<Record<string, number>>(
    {}
  );
  const coursesPerPage = 3; 

  // CORRECTION: Utilisation correcte de l'importation asynchrone
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        
        const { STATIC_COURSES: fetchedCourses } = await import(
          "./courses-data"
        );
        setCourses(fetchedCourses);
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
    setExpandedCategories(new Set());
    setCategoryPages({});
  };

  // Filtrer les cours selon les critères
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

  // Regrouper les cours par catégorie
  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  // Fonction pour basculer l'état d'expansion d'une catégorie
  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
        // Initialiser la page à 1 lors de l'expansion
        setCategoryPages((prev) => ({ ...prev, [category]: 1 }));
      }
      return newSet;
    });
  };

  // Obtenir les cours pour une catégorie, avec pagination si la catégorie est étendue
  const getCoursesForCategory = (category: string) => {
    const categoryCourses = groupedCourses[category] || [];

    if (!expandedCategories.has(category)) {
      // Afficher seulement les 8 premiers si la catégorie n'est pas étendue
      return categoryCourses.slice(0, coursesPerPage);
    }

    // Pagination pour la catégorie étendue
    const page = categoryPages[category] || 1;
    const indexOfLastCourse = page * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    return categoryCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  };

  // Calculer le nombre total de pages pour une catégorie
  const getTotalPagesForCategory = (category: string) => {
    const categoryCourses = groupedCourses[category] || [];
    return Math.ceil(categoryCourses.length / coursesPerPage);
  };

  // Gérer le changement de page pour une catégorie
  const handlePageChange = (category: string, page: number) => {
    setCategoryPages((prev) => ({ ...prev, [category]: page }));
    // Faire défiler vers le haut de la section de catégorie
    const categoryElement = document.getElementById(`category-${category}`);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Listes des catégories et des niveaux disponibles
  const categories = [
    "Tous",
    ...Array.from(new Set(courses.map((course) => course.category))),
  ];
  const levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

  // Générer des IDs de catégorie sécurisés pour les clés
  const categoryToId = (category: string): string => {
    return category.replace(/\s+/g, "-").toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête et filtres */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/student"
            className="text-blue-900 hover:underline py-2 inline-block"
          >
            ← Retour à l'accueil
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
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
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="category-select"
                >
                  Catégorie
                </label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setExpandedCategories(new Set());
                    setCategoryPages({});
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                >
                  {categories.map((category) => (
                    <option
                      key={`cat-opt-${categoryToId(category)}`}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-48">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="level-select"
                >
                  Niveau
                </label>
                <select
                  id="level-select"
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setExpandedCategories(new Set());
                    setCategoryPages({});
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                >
                  {levels.map((level) => (
                    <option key={`level-opt-${level}`} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
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

        {/* Affichage des cours */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="animate-pulse">
                <div className="bg-gray-200 h-32 rounded-t-lg" />
                <div className="bg-white p-3 rounded-b-lg space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="space-y-12">
            {/* Affichage des sections de cours par catégorie */}
            {Object.entries(groupedCourses).map( // Utilisation de Object.entries pour obtenir les catégories et leurs cours
              ([category, categoryCourses]) => {
                const categoryId = categoryToId(category);
                return (
                  <section
                    key={`cat-section-${categoryId}`}
                    id={`category-${category}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {category} ({categoryCourses.length})
                      </h2>
                      {categoryCourses.length > coursesPerPage && (
                        <button
                          onClick={() => toggleCategoryExpansion(category)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                          {expandedCategories.has(category)
                            ? "Réduire"
                            : "Voir tous les cours"}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expandedCategories.has(category) // Ajoutez la classe de rotation si la catégorie est expandée
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {getCoursesForCategory(category).map((course, index) => (
                        <CourseCard
                          key={`course-${categoryId}-${course.id}-${index}`}
                          course={course}
                          uniqueKey={`${categoryId}-${course.id}-${index}`}
                        />
                      ))}
                    </div>

                    {/* Pagination pour la catégorie étendue */}
                    {expandedCategories.has(category) &&
                      getTotalPagesForCategory(category) > 1 && (
                        <Pagination
                          categoryId={categoryId}
                          currentPage={categoryPages[category] || 1}
                          totalPages={getTotalPagesForCategory(category)}
                          onPageChange={(page) =>
                            handlePageChange(category, page)
                          }
                        />
                      )}
                  </section>
                );
              }
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun cours trouvé
              </h3>
              <p className="text-gray-600">
                Aucun cours ne correspond à vos critères. Essayez d'ajuster vos
                filtres ou termes de recherche.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Tous");
                  setSelectedLevel("Tous");
                }}
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
