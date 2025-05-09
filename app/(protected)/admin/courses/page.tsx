"use client";

// Import necessary components and icons
import Table from "@/app/components/ui/Table"; // Reusable table component
import Button from "@/app/components/ui/Button"; // Reusable button component
import Modal from "@/app/components/ui/Modal"; // Reusable modal component
import Input from "@/app/components/ui/Input"; // Reusable input component
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Icons for actions and search
import { useState } from "react"; // React hook for managing state

const CoursesPage = () => {
  // State to store the list of courses
  const [courses, setCourses] = useState([
    { id: 1, title: "React for Beginners", instructor: "John Doe", duration: "10h" },
    { id: 2, title: "Advanced CSS", instructor: "Jane Smith", duration: "8h" },
  ]);
  // NOTE: Replace this mock data with real data fetched from the backend.

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the current course being created or edited
  const [currentCourse, setCurrentCourse] = useState<{ id?: number; title: string; instructor: string; duration: string }>({
    title: "",
    instructor: "",
    duration: "",
  });

  // State to store the search query for filtering courses
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle editing a course
  const handleEdit = (id: number) => {
    const course = courses.find((course) => course.id === id); // Find the course by ID
    if (course) {
      setCurrentCourse(course); // Set the current course to the selected course
      setIsModalOpen(true); // Open the modal
    }
  };

  // Function to handle deleting a course
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      setCourses((prev) => prev.filter((course) => course.id !== id)); // Remove the course from the list
      // NOTE: Replace this with a DELETE request to the backend.
    }
  };

  // Function to handle saving a course (create or update)
  const handleSave = () => {
    if (currentCourse.title.trim() === "" || currentCourse.instructor.trim() === "" || currentCourse.duration.trim() === "") {
      alert("All fields are required."); // Validate input fields
      return;
    }

    if (currentCourse.id) {
      // Update existing course
      setCourses((prev) =>
        prev.map((course) =>
          course.id === currentCourse.id ? { ...course, ...currentCourse } : course
        )
      );
      // NOTE: Replace this with a PUT request to update the course in the backend.
    } else {
      // Create new course
      setCourses((prev) => [
        ...prev,
        { id: Date.now(), ...currentCourse }, // Add the new course to the list
      ]);
      // NOTE: Replace this with a POST request to create the course in the backend.
    }
    setIsModalOpen(false); // Close the modal
    setCurrentCourse({ title: "", instructor: "", duration: "" }); // Reset the current course state
  };

  // Function to handle opening the modal for creating a new course
  const handleCreate = () => {
    setCurrentCourse({ title: "", instructor: "", duration: "" }); // Reset the current course state
    setIsModalOpen(true); // Open the modal
  };

  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header section with title and "Create Course" button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
        <Button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Create Course
        </Button>
      </div>

      {/* Search bar for filtering courses */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-md">
          <Input
            id="search"
            name="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
            className="pl-10"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" /> {/* Search icon */}
        </div>
      </div>

      {/* Table displaying the list of courses */}
      <Table
        headers={["Title", "Instructor", "Duration", "Actions"]} // Table headers
        rows={filteredCourses.map((course) => [
          course.title,
          course.instructor,
          course.duration,
          <div className="flex space-x-2" key={course.id}>
            {/* Edit button */}
            <button
              onClick={() => handleEdit(course.id)}
              className="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              <FaEdit />
            </button>
            {/* Delete button */}
            <button
              onClick={() => handleDelete(course.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>,
        ])}
      />

      {/* Modal for creating or editing a course */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {currentCourse.id ? "Edit Course" : "Create Course"} {/* Modal title */}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submission
              handleSave(); // Save the course
            }}
            className="space-y-4"
          >
            {/* Title input field */}
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <Input
                id="courseTitle"
                name="courseTitle"
                placeholder="Enter course title"
                value={currentCourse.title}
                onChange={(e) =>
                  setCurrentCourse((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            {/* Instructor input field */}
            <div>
              <label htmlFor="courseInstructor" className="block text-sm font-medium text-gray-700">
                Instructor
              </label>
              <Input
                id="courseInstructor"
                name="courseInstructor"
                placeholder="Enter instructor name"
                value={currentCourse.instructor}
                onChange={(e) =>
                  setCurrentCourse((prev) => ({ ...prev, instructor: e.target.value }))
                }
              />
            </div>

            {/* Duration input field */}
            <div>
              <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <Input
                id="courseDuration"
                name="courseDuration"
                placeholder="Enter course duration (e.g., 10h)"
                value={currentCourse.duration}
                onChange={(e) =>
                  setCurrentCourse((prev) => ({ ...prev, duration: e.target.value }))
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

export default CoursesPage;