// scroll-context.tsx
"use client";

import { createContext, useContext, useRef, RefObject } from "react";

interface ScrollContextType {
  parcoursRef: RefObject<HTMLDivElement>;
  topCoursesRef: RefObject<HTMLDivElement>;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const parcoursRef = useRef<HTMLDivElement>(null);
  const topCoursesRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={{ parcoursRef, topCoursesRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
