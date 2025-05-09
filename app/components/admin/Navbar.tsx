"use client";

import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-gray-700 text-white flex items-center justify-between px-6 shadow-md">
      {/* Admin Dashboard Title */}
      <div className="text-xl font-bold">Admin Dashboard</div>

      {/* Profile and Logout Buttons */}
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <FaUserCircle className="text-lg" />
          <span>Profile</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;