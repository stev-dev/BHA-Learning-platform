"use client";

// Import necessary components and icons
import Table from "@/app/components/ui/Table"; // Reusable table component
import Button from "@/app/components/ui/Button"; // Reusable button component
import Modal from "@/app/components/ui/Modal"; // Reusable modal component
import Input from "@/app/components/ui/Input"; // Reusable input component
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Icons for actions and search
import { useState } from "react"; // React hook for managing state

const CategoriesPage = () => {
  // State to store the list of categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Programming", courses: 10 },
    { id: 2, name: "Design", courses: 5 },
  ]);
  // NOTE: Replace this mock data with real data fetched from the backend.

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the current category being created or edited
  const [currentCategory, setCurrentCategory] = useState<{ id?: number; name: string }>({
    name: "",
  });

  // State to store the search query for filtering categories
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle editing a category
  const handleEdit = (id: number) => {
    const category = categories.find((cat) => cat.id === id); // Find the category by ID
    if (category) {
      setCurrentCategory(category); // Set the current category to the selected category
      setIsModalOpen(true); // Open the modal
    }
  };

  // Function to handle deleting a category
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      setCategories((prev) => prev.filter((category) => category.id !== id)); // Remove the category from the list
      // NOTE: Replace this with a DELETE request to the backend.
    }
  };

  // Function to handle saving a category (create or update)
  const handleSave = () => {
    if (currentCategory.name.trim() === "") {
      alert("Category name cannot be empty."); // Validate input fields
      return;
    }

    if (currentCategory.id) {
      // Update existing category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === currentCategory.id ? { ...cat, name: currentCategory.name } : cat
        )
      );
      // NOTE: Replace this with a PUT request to update the category in the backend.
    } else {
      // Create new category
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: currentCategory.name, courses: 0 }, // Add the new category to the list
      ]);
      // NOTE: Replace this with a POST request to create the category in the backend.
    }
    setIsModalOpen(false); // Close the modal
    setCurrentCategory({ name: "" }); // Reset the current category state
  };

  // Function to handle opening the modal for creating a new category
  const handleCreate = () => {
    setCurrentCategory({ name: "" }); // Reset the current category state
    setIsModalOpen(true); // Open the modal
  };

  // Filter categories based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header section with title and "Create Category" button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
        <Button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Create Category
        </Button>
      </div>

      {/* Search bar for filtering categories */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-md">
          <Input
            id="search"
            name="search"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
            className="pl-10"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" /> {/* Search icon */}
        </div>
      </div>

      {/* Table displaying the list of categories */}
      <Table
        headers={["Name", "Courses", "Actions"]} // Table headers
        rows={filteredCategories.map((category) => [
          category.name,
          category.courses,
          <div className="flex space-x-2" key={category.id}>
            {/* Edit button */}
            <button
              onClick={() => handleEdit(category.id)}
              className="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              <FaEdit />
            </button>
            {/* Delete button */}
            <button
              onClick={() => handleDelete(category.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>,
        ])}
      />

      {/* Modal for creating or editing a category */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {currentCategory.id ? "Edit Category" : "Create Category"} {/* Modal title */}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submission
              handleSave(); // Save the category
            }}
            className="space-y-4"
          >
            {/* Name input field */}
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <Input
                id="categoryName"
                name="categoryName"
                placeholder="Enter category name"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Save button */}
            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
              Save
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CategoriesPage;