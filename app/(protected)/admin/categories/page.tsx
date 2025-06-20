"use client";

import React, { useState } from "react"; // Ajoute React ici
import { Card } from "@/app/components/ui/Card";
import { Table } from "@/app/components/ui/Table";
import { Button } from "@/app/components/ui/Button";
import { Modal } from "@/app/components/ui/Modal";
import { InputField } from "@/app/components/ui/InputField";
import { CategoryForm } from "@/app/components/admin/CategoryForm";
import { Trash2, Plus, Edit } from "lucide-react";

const mockCategories = [
	{ id: 1, name: "Web", courses: 12, created: "2024-05-01" },
	{ id: 2, name: "Mobile", courses: 8, created: "2024-05-10" },
	// ...
];

const AdminCategories = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [editCategory, setEditCategory] = useState<any>(null);
	const [categories, setCategories] = useState(mockCategories);
	const [search, setSearch] = useState("");

	const handleAddOrEdit = (data: any) => {
		if (editCategory) {
			setCategories(
				categories.map((cat) =>
					cat.id === editCategory.id ? { ...cat, ...data } : cat
				)
			);
		} else {
			setCategories([
				...categories,
				{
					...data,
					id: categories.length + 1,
					courses: 0,
					created: new Date().toISOString().slice(0, 10),
				},
			]);
		}
		setModalOpen(false);
		setEditCategory(null);
	};

	const handleEdit = (cat: any) => {
		setEditCategory(cat);
		setModalOpen(true);
	};

	const handleDelete = (id: number) => {
		setCategories(categories.filter((cat) => cat.id !== id));
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setEditCategory(null);
	};

	// Filtrage par recherche
	const filteredCategories = categories.filter((cat) =>
		cat.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl md:text-3xl font-bold">Category Management</h1>
				<Button
					className="bg-violet-200 text-violet-800 hover:bg-violet-300 hover:text-violet-900 font-semibold px-5 py-2 rounded-lg shadow transition flex items-center gap-2"
					onClick={() => {
						setEditCategory(null);
						setModalOpen(true);
					}}
				>
					<Plus size={18} /> Add Category
				</Button>
			</div>

			<div className="flex items-center gap-4 mb-4">
				<div className="flex-1 min-w-[300px]">
					<InputField
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search category..."
						className="w-full"
						id=""
						name=""
						label=""
					/>
				</div>
			</div>

			<Card>
				<Table
					headers={["Name", "Courses count", "Created at", "Actions"]}
					rows={filteredCategories.map((cat) => [
						cat.name,
						cat.courses,
						cat.created,
						<div className="flex gap-2 flex-row-reverse">
							<Button
								variant="ghost"
								size="icon"
								title="Supprimer"
								onClick={() => handleDelete(cat.id)}
							>
								<Trash2 size={18} className="text-red-500" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								title="Éditer"
								onClick={() => handleEdit(cat)}
							>
								<Edit size={18} className="text-violet-700" />
							</Button>
						</div>,
					])}
				/>
			</Card>

			<Modal
				isOpen={modalOpen}
				onClose={handleCloseModal}
				title={editCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
			>
				<CategoryForm
					onSubmit={handleAddOrEdit}
					initialValues={editCategory}
				/>
			</Modal>
		</div>
	);
};

export default AdminCategories;