import React from "react";

interface BadgeProps {
  colorClass?: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ colorClass = "", children, className = "" }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass} ${className}`}>
      {children}
    </span>
  );
}