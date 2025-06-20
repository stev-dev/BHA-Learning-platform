import React, { useState } from "react";

export function SearchBar({
  onSearch,
  placeholder = "Search...",
  className = "",
}: {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 bg-white ${className}`}
    />
  );
}
