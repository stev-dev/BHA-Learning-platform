import type React from "react";
import "./globals.css"; // Styles globaux
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "BHA Learning Platform",
  description: "A platform for learning and growth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
