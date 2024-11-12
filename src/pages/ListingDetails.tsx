// src/pages/ListingDetails.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

const ListingDetails = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/booking");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 space-y-8">
      {" "}
      {/* Added mt-20 for top margin */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <img
          src="https://via.placeholder.com/600"
          alt="Listing"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="md:pl-8 space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Cozy Beachside Apartment
          </h1>
          <p className="text-sm text-gray-600">
            Entire apartment • 2 guests • 1 bedroom • 1 bath
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
              Wi-Fi
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
              Kitchen
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
              Pool
            </span>
          </div>
          <p className="mt-4 text-gray-700">$120 per night</p>
          <button
            onClick={handleBooking}
            className="mt-6 w-full md:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
