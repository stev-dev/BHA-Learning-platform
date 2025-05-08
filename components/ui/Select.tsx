"use client";

import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  "aria-label"?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-gray-700 font-semibold" aria-label={props["aria-label"] || label}>
          {label}
        </label>
      )}
      <select
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
          error ? "border-red-500" : "border-gray-300"
        } bg-white`}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Select;
