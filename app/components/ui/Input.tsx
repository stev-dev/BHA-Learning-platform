import React from "react";

interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
    />
  );
};

export default Input;