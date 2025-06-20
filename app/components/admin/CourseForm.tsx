"use client";

// -----------------------------------------------------------------------------
// Ce composant gère le formulaire d'ajout/modification de cours.
// Il est réutilisable pour l'ajout et l'édition grâce à la prop initialValues.
// Les options de catégorie et d'instructeur sont passées en props.
// ----------------------------------------------------------------------------/

import React, { useState, useEffect } from "react";
import { InputField } from "@/app/components/ui/InputField";
import { SelectField } from "@/app/components/ui/SelectField";
import { Button } from "@/app/components/ui/Button";

// Options de statut (tu peux les garder ou les charger depuis le backend)
const statusOptions = [
  { value: "Published", label: "Published" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" },
];

export function CourseForm({
  onSubmit,         // Fonction appelée à la soumission du formulaire (à connecter à l'API)
  initialValues = null, // Valeurs initiales pour l'édition (null pour l'ajout)
  categoryOptions = [], // Liste des catégories (à charger depuis le backend)
  instructorOptions = [], // Liste des instructeurs (à charger depuis le backend)
}: {
  onSubmit: (data: any) => void;
  initialValues?: any;
  categoryOptions: { value: string; label: string }[];
  instructorOptions: { value: string; label: string }[];
}) {
  // État local pour le formulaire et les erreurs
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    category: initialValues?.category || "",
    instructor: initialValues?.instructor || "",
    price: initialValues?.price || "",
    status: initialValues?.status || "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // Met à jour le formulaire si initialValues change (utile pour l'édition)
  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        category: initialValues.category || "",
        instructor: initialValues.instructor || "",
        price: initialValues.price || "",
        status: initialValues.status || "",
      });
    }
  }, [initialValues]);

  // Gère la saisie utilisateur
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation simple
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.title.trim()) newErrors.title = "Course name is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.instructor) newErrors.instructor = "Instructor is required";
    if (!form.price.trim()) newErrors.price = "Price is required";
    if (!form.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  // À connecter à une fonction qui fait un appel API (POST ou PUT) côté parent
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {/* Champ nom du cours */}
      <InputField
        label="Course Name"
        name="title"
        value={form.title}
        onChange={handleChange}
        error={errors.title}
        autoComplete="off"
      />
      {/* Sélecteur de catégorie */}
      <SelectField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={categoryOptions}
        error={errors.category}
      />
      {/* Sélecteur d'instructeur */}
      <SelectField
        label="Instructor"
        name="instructor"
        value={form.instructor}
        onChange={handleChange}
        options={instructorOptions}
        error={errors.instructor}
      />
      {/* Champ prix */}
      <InputField
        label="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        error={errors.price}
        autoComplete="off"
      />
      {/* Sélecteur de statut */}
      <SelectField
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        options={statusOptions}
        error={errors.status}
      />
      {/* Bouton de soumission */}
      <div className="flex justify-end mt-6">
        <Button type="submit" className="bg-violet-400 text-white px-6 py-2 rounded-lg font-semibold">
          {initialValues ? "Update Course" : "Add Course"}
        </Button>
      </div>
    </form>
  );
}

/*
------------------------------------------------------------------------------
À MODIFIER POUR LE BACKEND :
------------------------------------------------------------------------------
- Connecter la prop onSubmit à une fonction qui fait un appel API (POST pour l'ajout, PUT pour la modification)
- Charger les options de catégorie et d'instructeur depuis le backend (API)
- Gérer le chargement et les erreurs côté parent si besoin
*/