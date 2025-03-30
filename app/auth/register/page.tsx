"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

const FormInput: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}> = ({ id, label, type, value, onChange, placeholder, required = false }) => (
  <div className="space-y-0.5">
    <label htmlFor={id} className="block text-xs font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 text-sm bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const FormButton: React.FC<{
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}> = ({ type = "button", onClick, children, variant = "primary" }) => {
  const baseStyles =
    "w-full px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none transition-colors";
  const variantStyles = {
    primary: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-300",
    secondary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [isPartner, setIsPartner] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    diploma: "",
    courseTitle: "",
    courseDescription: "",
    experience: "",
    availability: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isPartner,
          diploma: formData.diploma,
          experience: formData.experience,
          availability: formData.availability,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      login({ email: data.user.email, name: data.user.name }, data.token);
      router.push("/student");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erreur lors de l'inscription"
      );
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-4 lg:p-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-5 space-y-4">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Créez votre compte
          </h1>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setIsPartner(false)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                !isPartner
                  ? "bg-blue-950 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setIsPartner(true)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                isPartner
                  ? "bg-blue-950 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Partenaire
            </button>
          </div>
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormInput
            id="name"
            label="Votre nom"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          <FormInput
            id="email"
            label="Adresse email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
          />
          <FormInput
            id="password"
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <FormInput
            id="confirmPassword"
            label="Confirmez le mot de passe"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          {isPartner && (
            <div className="bg-gray-100 border border-gray-300 rounded-md p-2 space-y-2 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 text-center">
                Informations Partenaire
              </h2>
              <FormInput
                id="diploma"
                label="Diplôme"
                type="text"
                value={formData.diploma}
                onChange={handleChange}
                placeholder="Ex: Master"
                required
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <FormInput
                    id="experience"
                    label="Expérience"
                    type="text"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Ex: 5 ans"
                    required
                  />
                </div>
                <div className="flex-1">
                  <FormInput
                    id="availability"
                    label="Disponibilité"
                    type="text"
                    value={formData.availability}
                    onChange={handleChange}
                    placeholder="Ex: Lundi"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <FormButton type="submit" variant="primary">
            {isPartner ? "Valider mon inscription" : "Créer un compte"}
          </FormButton>
          <p className="text-xs text-gray-500 text-center">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/auth/login"
              className="text-blue-950 hover:underline font-medium"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
