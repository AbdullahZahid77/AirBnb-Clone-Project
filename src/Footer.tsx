import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="flex space-x-6">
              {" "}
              {/* Flexbox for horizontal alignment */}
              <li>
                <a href="#" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hosting
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center">
            {" "}
            {/* Flexbox for centering */}
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-400">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-400">
                Instagram
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="md:text-right">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ITU. All rights reserved.
            </p>
            <p className="text-gray-400">Made with ❤️ by Abdullah Zahid.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
