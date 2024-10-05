import React, { useState } from "react";

const Navbar: React.FC = () => {
  // Add state for the active navigation link
  const [activeLink, setActiveLink] = useState<string>("Home"); // Default active link is "Home"

  // Function to handle link clicks without page reload
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">AIRBNB</div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent page reload
              handleLinkClick("Home");
            }}
            className={`${
              activeLink === "Home"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent page reload
              handleLinkClick("Experiences");
            }}
            className={`${
              activeLink === "Experiences"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Experiences
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent page reload
              handleLinkClick("Online Experiences");
            }}
            className={`${
              activeLink === "Online Experiences"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Online Experiences
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          {/* Location Input */}
          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Search Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* User Menu (Login/Signup) */}
        <div className="flex space-x-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent page reload
              handleLinkClick("Login");
            }}
            className={`${
              activeLink === "Login"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Login
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent page reload
              handleLinkClick("Signup");
            }}
            className={`${
              activeLink === "Signup"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
