"use client";

// Import necessary components and icons
import Table from "@/app/components/ui/Table"; // Reusable table component
import Button from "@/app/components/ui/Button"; // Reusable button component
import Modal from "@/app/components/ui/Modal"; // Reusable modal component
import Input from "@/app/components/ui/Input"; // Reusable input component
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Icons for actions and search
import { useState } from "react"; // React hook for managing state

const UsersPage = () => {
  // State to store the list of users
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Student" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Instructor" },
  ]); 
  // NOTE: Replace this mock data with real data fetched from the backend.

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the current user being created or edited
  const [currentUser, setCurrentUser] = useState<{ id?: number; name: string; email: string; role: string }>({
    name: "",
    email: "",
    role: "Student", // Default role
  });

  // State to store the search query for filtering users
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle editing a user
  const handleEdit = (id: number) => {
    const user = users.find((user) => user.id === id); // Find the user by ID
    if (user) {
      setCurrentUser(user); // Set the current user to the selected user
      setIsModalOpen(true); // Open the modal
    }
  };

  // Function to handle deleting a user
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id)); // Remove the user from the list
      // NOTE: Replace this with a DELETE request to the backend.
    }
  };

  // Function to handle saving a user (create or update)
  const handleSave = () => {
    if (currentUser.name.trim() === "" || currentUser.email.trim() === "" || currentUser.role.trim() === "") {
      alert("All fields are required."); // Validate input fields
      return;
    }

    if (currentUser.id) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === currentUser.id ? { ...user, ...currentUser } : user
        )
      );
      // NOTE: Replace this with a PUT request to update the user in the backend.
    } else {
      // Create new user
      setUsers((prev) => [
        ...prev,
        { id: Date.now(), ...currentUser }, // Add the new user to the list
      ]);
      // NOTE: Replace this with a POST request to create the user in the backend.
    }
    setIsModalOpen(false); // Close the modal
    setCurrentUser({ name: "", email: "", role: "Student" }); // Reset the current user state
  };

  // Function to handle opening the modal for creating a new user
  const handleCreate = () => {
    setCurrentUser({ name: "", email: "", role: "Student" }); // Reset the current user state
    setIsModalOpen(true); // Open the modal
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header section with title and "Create User" button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <Button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Create User
        </Button>
      </div>

      {/* Search bar for filtering users */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-md">
          <Input
            id="search"
            name="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
            className="pl-10"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" /> {/* Search icon */}
        </div>
      </div>

      {/* Table displaying the list of users */}
      <Table
        headers={["Name", "Email", "Role", "Actions"]} // Table headers
        rows={filteredUsers.map((user) => [
          user.name,
          user.email,
          user.role,
          <div className="flex space-x-2" key={user.id}>
            {/* Edit button */}
            <button
              onClick={() => handleEdit(user.id)}
              className="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              <FaEdit />
            </button>
            {/* Delete button */}
            <button
              onClick={() => handleDelete(user.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>,
        ])}
      />

      {/* Modal for creating or editing a user */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {currentUser.id ? "Edit User" : "Create User"} {/* Modal title */}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submission
              handleSave(); // Save the user
            }}
            className="space-y-4"
          >
            {/* Name input field */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="userName"
                name="userName"
                placeholder="Enter user name"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Email input field */}
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="userEmail"
                name="userEmail"
                placeholder="Enter user email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            {/* Role dropdown */}
            <div>
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="userRole"
                name="userRole"
                value={currentUser.role}
                onChange={(e) =>
                  setCurrentUser((prev) => ({ ...prev, role: e.target.value }))
                }
                className="block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
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

export default UsersPage;