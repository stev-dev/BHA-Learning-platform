"use client";

import React, { useState, ChangeEvent } from "react";

interface AvatarUploaderProps {
  avatarUrl?: string;
  onChange: (file: File | null) => void;
  ariaLabel?: string;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ avatarUrl, onChange, ariaLabel }) => {
  const [preview, setPreview] = useState<string | undefined>(avatarUrl);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setPreview(avatarUrl);
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="avatar-upload" className="cursor-pointer">
        <img
          src={preview || "/images/default-avatar.png"}
          alt="Student Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600"
          aria-label={ariaLabel || "Student avatar"}
        />
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload avatar"
        />
        <div className="mt-2 text-indigo-600 text-sm underline">Change Avatar</div>
      </label>
    </div>
  );
};

export default AvatarUploader;
