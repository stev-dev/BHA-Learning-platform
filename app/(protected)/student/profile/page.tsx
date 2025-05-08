import React from "react";
import ProfileForm from "./ProfileForm";
import { StudentProfile } from "../../../models/types";

async function fetchProfile(): Promise<StudentProfile> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/student/profile`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

const ProfilePage = async () => {
  let profile: StudentProfile | null = null;
  try {
    profile = await fetchProfile();
  } catch (error) {
    // Handle error or show fallback UI
  }

  if (!profile) {
    return <p className="text-red-600">Failed to load profile.</p>;
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Student Profile</h1>
      <ProfileForm initialProfile={profile} />
    </section>
  );
};

export default ProfilePage;
