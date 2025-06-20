"use client";

// -----------------------------------------------------------------------------
// Ce composant gère le formulaire d'ajout/modification d'utilisateur.
// Il est réutilisable pour l'ajout et l'édition grâce à la prop initialValues.
// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { InputField } from "@/app/components/ui/InputField";
import { SelectField } from "@/app/components/ui/SelectField";
import { Button } from "@/app/components/ui/Button";

// Options pour les rôles et statuts (tu peux les garder ou les charger depuis le backend)
const roleOptions = [
  { value: "Student", label: "Student" },
  { value: "Instructor", label: "Instructor" },
  { value: "Admin", label: "Administrator" },
];
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Pending", label: "Pending" },
];

export function UserForm({
  onSubmit,         // Fonction appelée à la soumission du formulaire (à connecter à l'API)
  initialValues = null, // Valeurs initiales pour l'édition (null pour l'ajout)
}: {
  onSubmit: (data: any) => void;
  initialValues?: any;
}) {
  // ---------------------------------------------------------------------------
  // États locaux pour le formulaire et les erreurs de validation
  // ---------------------------------------------------------------------------
  const [form, setForm] = useState({
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    role: initialValues?.role || "",
    status: initialValues?.status || "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // ---------------------------------------------------------------------------
  // Met à jour le formulaire si initialValues change (utile pour l'édition)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        email: initialValues.email || "",
        role: initialValues.role || "",
        status: initialValues.status || "",
      });
    }
  }, [initialValues]);

  // ---------------------------------------------------------------------------
  // Gère la saisie utilisateur dans les champs du formulaire
  // ---------------------------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------------------------------------------
  // Validation simple des champs (à améliorer si besoin)
  // ---------------------------------------------------------------------------
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.role) newErrors.role = "Role is required";
    if (!form.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------------------------------------
  // Soumission du formulaire : appelle la fonction onSubmit passée en prop
  // ---------------------------------------------------------------------------
  // À connecter à une fonction qui fait un appel API (POST ou PUT) côté parent
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {/* Champ nom */}
      <InputField
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="off"
      />
      {/* Champ email */}
      <InputField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="off"
      />
      {/* Sélecteur de rôle */}
      <SelectField
        label="Role"
        name="role"
        value={form.role}
        onChange={handleChange}
        options={roleOptions}
        error={errors.role}
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
          {initialValues ? "Update User" : "Add User"}
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
- Charger les options de rôle/statut depuis le backend si elles sont dynamiques
*/