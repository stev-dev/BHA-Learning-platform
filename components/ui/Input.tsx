"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  readOnly?: boolean;
  "aria-label"?: string;
}

const Input: React.FC<InputProps> = ({ label, error, readOnly, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-gray-700 font-semibold" aria-label={props["aria-label"] || label}>
          {label}
        </label>
      )}
      <input
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
          error ? "border-red-500" : "border-gray-300"
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        readOnly={readOnly}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
