"use client";

import React, { useState, useEffect, FormEvent } from "react";
import AvatarUploader from "../../../../components/shared/AvatarUploader";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import CourseCard from "../../../../components/courses/CourseCard";
import { StudentProfile, Course } from "../../../models/types";

interface ProfileFormProps {
  initialProfile: StudentProfile;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile }) => {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(profile.notificationsEnabled);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("bio", profile.bio || "");
      formData.append("notificationsEnabled", notificationsEnabled ? "true" : "false");
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await fetch("/api/student/profile", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const updatedProfile: StudentProfile = await res.json();
      setProfile(updatedProfile);
      setSaving(false);
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Student profile form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <AvatarUploader
            avatarUrl={profile.avatarUrl}
            onChange={handleAvatarChange}
            ariaLabel="Student avatar uploader"
          />
        </div>
        <div className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            required
            aria-label="Name"
          />
          <Input
            label="Email"
            name="email"
            value={profile.email}
            readOnly
            aria-label="Email (read-only)"
          />
          <label htmlFor="bio" className="block text-gray-700 font-semibold">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio || ""}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={4}
            aria-label="Bio"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {profile.enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Button type="submit" disabled={saving} aria-label="Save changes">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-bold mb-2">Settings</h2>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={handleNotificationsToggle}
            aria-label="Toggle notifications"
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="notifications" className="font-medium text-gray-700">
            Enable Notifications
          </label>
        </div>
        <div className="mt-3">
          <a
            href="/change-password"
            className="text-indigo-600 hover:underline"
            aria-label="Change password"
          >
            Change Password
          </a>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
