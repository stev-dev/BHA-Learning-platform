"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  "aria-label"?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  const baseClasses =
    "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-400",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
