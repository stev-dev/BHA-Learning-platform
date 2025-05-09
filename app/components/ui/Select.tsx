import React from "react";

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  disabled?: boolean;
}

export default function Select({
  name,
  value,
  onChange,
  options,
  className = "",
  disabled = false,
}: SelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md p-2 ${className}`}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}