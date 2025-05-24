import React from "react";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function SelectField({ label, options, error, className = "", ...props }: SelectFieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-medium mb-1">{label}</label>
      <select
        {...props}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}