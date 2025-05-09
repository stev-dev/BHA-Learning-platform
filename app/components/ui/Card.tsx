import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;