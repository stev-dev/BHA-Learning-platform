"use client";

import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  "aria-label"?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = "100%", height = "1rem", className, "aria-label": ariaLabel }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className || ""}`}
      style={{ width, height }}
      role="status"
      aria-label={ariaLabel || "Loading content"}
    />
  );
};

export default Skeleton;
