"use client";

// -----------------------------------------------------------------------------
// Ce composant gère le formulaire d'ajout/modification de catégorie.
// Il est réutilisable pour l'ajout et l'édition grâce à la prop initialValues.
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { InputField } from "@/app/components/ui/InputField";
import { Button } from "@/app/components/ui/Button";

export function CategoryForm({
  onSubmit,         // Fonction appelée à la soumission du formulaire (à connecter à l'API)
  initialValues = null, // Valeurs initiales pour l'édition (null pour l'ajout)
}: {
  onSubmit: (data: any) => void;
  initialValues?: any;
}) {
  // État local pour le formulaire et les erreurs
  const [form, setForm] = useState({
    name: initialValues?.name || "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // Met à jour le formulaire si initialValues change (utile pour l'édition)
  useEffect(() => {
    if (initialValues) {
      setForm({ name: initialValues.name || "" });
    }
  }, [initialValues]);

  // Gère la saisie utilisateur
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation simple
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Category name is required";
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
      {/* Champ nom de la catégorie */}
      <InputField
        label="Category Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="off"
      />
      {/* Bouton de soumission */}
      <div className="flex justify-end mt-6">
        <Button type="submit" className="bg-violet-400 text-white px-6 py-2 rounded-lg font-semibold">
          {initialValues ? "Update Category" : "Add Category"}
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
- Gérer le chargement et les erreurs côté parent si besoin
*/