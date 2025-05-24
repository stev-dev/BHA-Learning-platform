import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  className?: string;
}

export const Avatar = ({ name, src, size = 40, className = "" }: AvatarProps) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";
    
  return src ? (
    <img
      src={src}
      alt={name}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size / 2 }}
      title={name}
    >
      {initials}
    </div>
  );
};
