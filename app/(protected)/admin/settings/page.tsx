"use client";

// Import necessary components
import Input from "@/app/components/ui/Input"; // Reusable input component
import Button from "@/app/components/ui/Button"; // Reusable button component
import { useState } from "react"; // React hook for managing state

const SettingsPage = () => {
  // State to store platform settings
  const [settings, setSettings] = useState({
    platformName: "E-Learning Platform",
    defaultLanguage: "English",
    theme: "Light",
  });
  // NOTE: Replace this mock data with real data fetched from the backend.

  // Function to handle saving settings
  const handleSave = () => {
    if (
      settings.platformName.trim() === "" ||
      settings.defaultLanguage.trim() === "" ||
      settings.theme.trim() === ""
    ) {
      alert("All fields are required."); // Validate input fields
      return;
    }

    // Simulate saving settings (e.g., API call)
    console.log("Settings saved:", settings);
    alert("Settings have been saved successfully!");
    // NOTE: Replace this with a PUT request to update settings in the backend.
  };

  // Function to handle input changes
  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value })); // Update the specific field in the settings state
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Platform Settings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form submission
          handleSave(); // Save the settings
        }}
        className="space-y-4"
      >
        {/* Platform Name input field */}
        <div>
          <label htmlFor="platformName" className="block text-sm font-medium text-gray-700">
            Platform Name
          </label>
          <Input
            id="platformName"
            name="platformName"
            placeholder="Enter platform name"
            value={settings.platformName}
            onChange={(e) => handleChange("platformName", e.target.value)}
          />
        </div>

        {/* Default Language input field */}
        <div>
          <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700">
            Default Language
          </label>
          <Input
            id="defaultLanguage"
            name="defaultLanguage"
            placeholder="Enter default language"
            value={settings.defaultLanguage}
            onChange={(e) => handleChange("defaultLanguage", e.target.value)}
          />
        </div>

        {/* Theme input field */}
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <Input
            id="theme"
            name="theme"
            placeholder="Enter theme (e.g., Light or Dark)"
            value={settings.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
          />
        </div>

        {/* Save button */}
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;