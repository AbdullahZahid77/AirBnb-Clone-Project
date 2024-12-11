import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("Home"); // Default active link
  const { user, token, logout } = useContext(UserContext)!;

  const isAuthenticated = !!token; // Check if user is authenticated
  const isAdmin = user?.isAdmin; // Check if user is admin
  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token"); // Clear JWT token from localStorage
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">AIRBNB</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            onClick={() => handleLinkClick("Home")}
            className={`${
              activeLink === "Home"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/experiences"
            onClick={() => handleLinkClick("Experiences")}
            className={`${
              activeLink === "Experiences"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Experiences
          </Link>
          <Link
            to="/online-experiences"
            onClick={() => handleLinkClick("Online Experiences")}
            className={`${
              activeLink === "Online Experiences"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Online Experiences
          </Link>

          {/* Admin Panel Link */}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => handleLinkClick("Admin Panel")}
              className={`${
                activeLink === "Admin Panel"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Admin Panel
            </Link>
          )}

          {/* User Profile and Booking History Links */}
          {isAuthenticated && (
            <>
              <Link
                to="/profile"
                onClick={() => handleLinkClick("Profile")}
                className={`${
                  activeLink === "Profile"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Profile
              </Link>
              <Link
                to="/booking-history"
                onClick={() => handleLinkClick("Booking History")}
                className={`${
                  activeLink === "Booking History"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Booking History
              </Link>
            </>
          )}
        </div>

        {/* User Menu (Authentication Links) */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-blue-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => handleLinkClick("Login")}
                className={`${
                  activeLink === "Login"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => handleLinkClick("Signup")}
                className={`${
                  activeLink === "Signup"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
