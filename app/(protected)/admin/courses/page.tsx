"use client";

// Importation des hooks React et des composants UI réutilisables
import { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Table } from "@/app/components/ui/Table";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { Button } from "@/app/components/ui/Button";
import { Modal } from "@/app/components/ui/Modal";
import { CourseForm } from "@/app/components/admin/CourseForm";
import { Eye, Edit, Trash2, Check, X, AlertCircle, Plus } from "lucide-react";

// ----------------------
// Données mockées (à remplacer par les données du backend)
// ----------------------
const mockCourses = [
    {
        id: 1,
        title: "Python Programming Masterclass",
        instructor: "John Doe",
        price: "$49.99",
        students: 2156,
        status: "Published",
        created: "2023-05-12",
        category: "Programming",
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        instructor: "Jane Smith",
        price: "$69.99",
        students: 1842,
        status: "Published",
        created: "2023-06-24",
        category: "Data Science",
    },
    {
        id: 3,
        title: "UI/UX Design Workshop",
        instructor: "Michael Brown",
        price: "$39.99",
        students: 954,
        status: "Published",
        created: "2023-07-15",
        category: "Design",
    },
    {
        id: 4,
        title: "Advanced React Development",
        instructor: "Emma Wilson",
        price: "$59.99",
        students: 1245,
        status: "Pending",
        created: "2023-09-02",
        category: "Programming",
    },
    {
        id: 5,
        title: "Machine Learning Fundamentals",
        instructor: "David Lee",
        price: "$79.99",
        students: 0,
        status: "Pending",
        created: "2023-10-18",
        category: "Data Science",
    },
    {
        id: 6,
        title: "Rejected Course Example",
        instructor: "Test User",
        price: "$19.99",
        students: 0,
        status: "Rejected",
        created: "2023-11-01",
        category: "Programming",
    },
];

// Liste des statuts pour les filtres
const statusList = ["All", "Published", "Pending", "Rejected"] as const;

// Couleurs pour l'affichage du statut
const statusColors = {
    Published: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-600",
};

// Catégories et formateurs mockés (à remplacer par des données du backend)
const mockCategories = [
    { value: "Programming", label: "Programming" },
    { value: "Data Science", label: "Data Science" },
    { value: "Design", label: "Design" },
];
const mockInstructors = [
    { value: "John Doe", label: "John Doe" },
    { value: "Jane Smith", label: "Jane Smith" },
    { value: "Michael Brown", label: "Michael Brown" },
    { value: "Emma Wilson", label: "Emma Wilson" },
    { value: "David Lee", label: "David Lee" },
];

export default function AdminCourses() {
    // ----------------------
    // États React pour la gestion locale (à remplacer par des hooks de données du backend)
    // ----------------------
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<typeof statusList[number]>("All");
    const [coursesList, setCoursesList] = useState(mockCourses); // À remplacer par les données du backend
    const [modalOpen, setModalOpen] = useState(false);
    const [editCourse, setEditCourse] = useState<any>(null);

    // Statistiques affichées en haut de page
    const stats = [
        {
            label: "Published Courses",
            value: coursesList.filter((c) => c.status === "Published").length,
            icon: <Check className="text-green-500" size={28} />,
            color: "bg-green-50",
        },
        {
            label: "Pending Review",
            value: coursesList.filter((c) => c.status === "Pending").length,
            icon: <AlertCircle className="text-yellow-500" size={28} />,
            color: "bg-yellow-50",
        },
        {
            label: "Rejected Courses",
            value: coursesList.filter((c) => c.status === "Rejected").length,
            icon: <X className="text-red-500" size={28} />,
            color: "bg-red-50",
        },
    ];

    // ----------------------
    // Filtres et recherche (à adapter pour le backend)
    // ----------------------
    const filtered = coursesList.filter(
        (c) =>
            (statusFilter === "All" || c.status === statusFilter) &&
            (c.title.toLowerCase().includes(search.toLowerCase()) ||
                c.instructor.toLowerCase().includes(search.toLowerCase()))
    );

    // ----------------------
    // Fonctions d'ajout, modification et suppression (à remplacer par des appels API)
    // ----------------------
    // Suppression d'un cours (à remplacer par un appel DELETE vers le backend)
    const handleDelete = (id: number) => {
        setCoursesList(coursesList.filter((c) => c.id !== id));
        // À remplacer par : await fetch('/api/courses/'+id, { method: 'DELETE' })
        // Puis recharger la liste depuis le backend
    };

    // Ajout ou modification d'un cours (à remplacer par POST/PUT vers le backend)
    const handleAddOrEdit = (data: any) => {
        if (editCourse) {
            // Modification locale (à remplacer par un appel PUT)
            setCoursesList(
                coursesList.map((c) =>
                    c.id === editCourse.id ? { ...c, ...data } : c
                )
            );
            // À remplacer par : await fetch('/api/courses/'+editCourse.id, { method: 'PUT', body: ... })
        } else {
            // Ajout local (à remplacer par un appel POST)
            setCoursesList([
                ...coursesList,
                {
                    ...data,
                    id: coursesList.length + 1, // L'id doit venir du backend
                    students: 0,
                    created: new Date().toISOString().slice(0, 10),
                },
            ]);
            // À remplacer par : await fetch('/api/courses', { method: 'POST', body: ... })
        }
        setModalOpen(false);
        setEditCourse(null);
        // Après chaque action, recharger la liste depuis le backend pour avoir les vraies données
    };

    // Préparation de la modification
    const handleEdit = (course: any) => {
        setEditCourse(course);
        setModalOpen(true);
    };

    return (
        <div className="p-4 md:p-8">
            {/* Titre et bouton d'ajout */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Course Management</h1>
                <Button
                    className="h-10 px-4 bg-violet-400 text-white font-semibold rounded-lg flex items-center gap-2"
                    onClick={() => {
                        setEditCourse(null);
                        setModalOpen(true);
                    }}
                >
                    <Plus size={18} /> Add Course
                </Button>
            </div>
            {/* Statistiques */}
            <div className="flex flex-wrap gap-4 mb-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`flex-1 min-w-[180px] flex items-center gap-4 rounded-xl p-4 ${stat.color} border`}
                    >
                        <div>{stat.icon}</div>
                        <div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-gray-500">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Barre de recherche et filtres */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
                <SearchBar
                    onSearch={setSearch}
                    placeholder="Search courses..."
                    className="flex-1 min-w-[220px]"
                />
                <div className="flex gap-2">
                    {statusList.map((status) => (
                        <Button
                            key={status}
                            className={`px-4 py-2 rounded-lg font-semibold ${
                                statusFilter === status
                                    ? "bg-violet-400 text-white"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status === "All" && "All"}
                            {status === "Published" && (
                                <>
                                    <Check className="inline mr-1" size={16} /> Published
                                </>
                            )}
                            {status === "Pending" && (
                                <>
                                    <AlertCircle className="inline mr-1" size={16} /> Pending
                                </>
                            )}
                            {status === "Rejected" && (
                                <>
                                    <X className="inline mr-1" size={16} /> Rejected
                                </>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
            {/* Tableau des cours */}
            <Card>
                <Table
                    headers={[
                        "Course Name",
                        "Category",
                        "Instructor",
                        "Price",
                        "Students",
                        "Status",
                        "Created",
                        "Actions",
                    ]}
                    rows={filtered.map((c) => [
                        c.title,
                        String(c.category),
                        c.instructor,
                        c.price,
                        c.students,
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                statusColors[c.status as keyof typeof statusColors] || "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {c.status}
                        </span>,
                        c.created,
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={() => handleDelete(c.id)}
                            >
                                <Trash2 size={18} className="text-red-500" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => handleEdit(c)}
                            >
                                <Edit size={18} className="text-gray-700" />
                            </Button>
                            <Button variant="ghost" size="icon" title="View">
                                <Eye size={18} className="text-gray-700" />
                            </Button>
                        </div>,
                    ])}
                />
            </Card>
            {/* Modal d'ajout/modification */}
            <Modal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditCourse(null);
                }}
                title={editCourse ? "Edit Course" : "Add Course"}
            >
                <CourseForm
                    onSubmit={handleAddOrEdit}
                    initialValues={editCourse}
                    categoryOptions={mockCategories}
                    instructorOptions={mockInstructors}
                />
            </Modal>
        </div>
    );
}

/*
----------------------------------------
À MODIFIER POUR LE BACKEND :
----------------------------------------

1. SUPPRIMER toutes les données mockées (mockCourses, mockCategories, mockInstructors)
2. REMPLACER les useState pour les listes par des hooks qui récupèrent les données depuis le backend (ex: via fetch ou axios)
   - Exemple : useEffect(() => { fetch('/api/courses').then(...) }, [])
3. REMPLACER les fonctions handleAddOrEdit et handleDelete par des appels API (POST, PUT, DELETE)
4. Après chaque ajout, modification ou suppression, RECHARGER la liste depuis le backend pour avoir les vraies données
5. Pour les catégories et formateurs, récupérer les listes depuis le backend pour alimenter les select
6. Gérer les erreurs et le chargement (loading, error state)
7. Sécuriser les accès côté backend (authentification, autorisation)

*/