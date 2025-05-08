"use client";

import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
  ariaLabel?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, ariaLabel }) => {
  return (
    <div
      className="w-full bg-gray-200 rounded h-3"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel || "Course progress"}
    >
      <div
        className="bg-indigo-600 h-3 rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
