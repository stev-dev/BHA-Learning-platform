"use client";

import React, { useState } from "react";
import Link from "next/link";

// Input Component (Reusable)
const FormInput: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}> = ({ id, label, type, value, onChange, placeholder, required = false }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

// Button Component (Reusable)
const FormButton: React.FC<{
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}> = ({ type = "button", onClick, children, variant = "primary" }) => {
  const baseStyles =
    "w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none transition-colors";
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

const Register: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isPartner, setIsPartner] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    diploma: "",
    subject: "",
    specialty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword, ...rest } = formData;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    console.log("Données de base:", {
      name: rest.name,
      email: rest.email,
      password,
    });
    if (isPartner) {
      console.log("Données partenaire:", {
        diploma: rest.diploma,
        subject: rest.subject,
        specialty: rest.specialty,
      });
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 space-y-6">
        {/* Top Button and Switch */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Créez votre compte
          </h1>
          {(
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {isPartner ? "Partenaire" : "Standard"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPartner}
                  onChange={() => setIsPartner(!isPartner)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
                </div>
              </label>
            </div>
          )}
        </div>
        {/* Form (Shown when toggled) */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Partner Fields (Shown when switch is on) */}
            {isPartner && (
              <>
                <FormInput
                  id="diploma"
                  label="Votre diplôme"
                  type="text"
                  value={formData.diploma}
                  onChange={handleChange}
                  placeholder="Ex: Licence en Informatique"
                  required
                />
                <FormInput
                  id="subject"
                  label="Votre matière"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ex: Mathématiques"
                  required
                />
                <FormInput
                  id="specialty"
                  label="Votre spécialité"
                  type="text"
                  value={formData.specialty}
                  onChange={handleChange}
                  placeholder="Ex: Développement Web"
                  required
                />
              </>
            )}

            <FormButton type="submit" variant="primary">
              {isPartner ? "Valider mon inscription" : "Créer un compte"}
            </FormButton>

            <p className="text-sm text-gray-500 text-center">
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
};

export default Register;
