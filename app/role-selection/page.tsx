import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function RoleSelectionPage() {
  // 1. Récupérer l'utilisateur Clerk côté serveur
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }

  // 2. Récupérer le rôle depuis MongoDB
  const client = await clientPromise;
  const db = client.db("learningplateform");
  const users = db.collection("users");
  const dbUser = await users.findOne({ userId: user.id });

  if (!dbUser || !dbUser.roles) {
    redirect("/unauthorized");
  }

  const roles = dbUser.roles;
  if (roles.length === 1) {
    if (roles[0] === "student") redirect("/student/dashboard");
    if (roles[0] === "instructor") redirect("/instructor/courses");
  }

  // 3. Afficher le choix si plusieurs rôles
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Choisissez votre rôle</h1>
        <div className="space-y-4">
          {roles.includes("student") && (
            <form action="/student/dashboard" method="get">
              <button
                type="submit"
                className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continuer en tant qu'étudiant
              </button>
            </form>
          )}
          {roles.includes("instructor") && (
            <form action="/instructor/courses" method="get">
              <button
                type="submit"
                className="w-full p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Continuer en tant qu'instructeur
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
