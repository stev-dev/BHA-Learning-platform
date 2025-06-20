"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/getUserRole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.roles || !data.roles.includes("instructor")) {
            router.replace("/unauthorized");
          } else {
            setChecking(false);
          }
        });
    }
  }, [user, isLoaded, router]);

  if (checking) return null;

  return <>{children}</>;
} 