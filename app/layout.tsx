import React from "react";
import "./globals.css"; // Styles globaux

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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="max-h-screen flex flex-col">
        <div>{children}</div>
      </body>
    </html>
  );
}
