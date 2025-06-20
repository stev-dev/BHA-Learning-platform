import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function PostLogin() {
  // 1. Récupérer l'utilisateur Clerk côté serveur
  const user = await currentUser();

  // Si la session n'est pas encore prête, affiche un loader et force un refresh
  if (!user) {
    // Meta refresh every 2s
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content="2" />
        </head>
        <body>
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Connexion en cours, veuillez patienter...</span>
          </div>
        </body>
      </html>
    );
  }

  // Log pour debug
  // eslint-disable-next-line no-console
  console.log("currentUser", user);

  // 2. Récupérer le rôle depuis MongoDB
  const client = await clientPromise;
  const db = client.db("learningplateform");
  const users = db.collection("users");
  const dbUser = await users.findOne({ userId: user.id });

  // Log pour debug
  // eslint-disable-next-line no-console
  console.log("dbUser", dbUser);

  if (!dbUser || !dbUser.roles) {
    redirect("/unauthorized");
  }

  // 3. Rediriger selon le rôle
  const roles = dbUser.roles;
  if (roles.includes("admin")) {
    redirect("/admin/dashboard");
  } else if (roles.length === 1 && roles[0] === "student") {
    redirect("/student/dashboard");
  } else if (roles.length === 1 && roles[0] === "instructor") {
    redirect("/instructor/courses");
  } else if (roles.includes("student") && roles.includes("instructor")) {
    redirect("/role-selection");
  } else {
    redirect("/unauthorized");
  }

  // Fallback
  return null;
} 