'use client'; // This marks this component as a client-side component

import React, { useState } from "react";

const initialSettings = {
  appName: "BHA Learning Platform",
  theme: "light",
  notifications: true,
  privacy: "public",
  defaultLanguage: "en",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [editingSettings, setEditingSettings] = useState<boolean>(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type,  } = e.target;
  const checked = true;
  if (type === "checkbox") {
    // Cast the event target to HTMLInputElement to ensure that checked is accessible
    setSettings({
      ...settings,
      [name]: (checked as boolean), // Typecast 'checked' to boolean
    });
  } else {
    setSettings({
      ...settings,
      [name]: value,
    });
  }
};


  const handleSaveSettings = () => {
    setEditingSettings(false);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">App Settings</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">App Name</label>
            <input
              type="text"
              name="appName"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={settings.appName}
              onChange={handleChange}
              disabled={!editingSettings}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <select
              name="theme"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={settings.theme}
              onChange={handleChange}
              disabled={!editingSettings}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Default Language</label>
            <select
              name="defaultLanguage"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={settings.defaultLanguage}
              onChange={handleChange}
              disabled={!editingSettings}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              className="h-4 w-4 text-blue-600"
              checked={settings.notifications}
              onChange={handleChange}
              disabled={!editingSettings}
            />
            <label className="ml-2 text-sm text-gray-700">Enable Notifications</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Privacy</label>
            <select
              name="privacy"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={settings.privacy}
              onChange={handleChange}
              disabled={!editingSettings}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="flex justify-between">
        {editingSettings ? (
          <button
            onClick={handleSaveSettings}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Settings
          </button>
        ) : (
          <button
            onClick={() => setEditingSettings(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Settings
          </button>
        )}
      </div>
    </div>
  );
}
