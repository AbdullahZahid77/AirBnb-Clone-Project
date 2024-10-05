import React, { useState } from "react";

interface ListingcardProps {
  image: string;
  title: string;
  propertyType: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  rating: number;
}

const Listingcard: React.FC<ListingcardProps> = ({
  image,
  title,
  propertyType,
  guests,
  bedrooms,
  bathrooms,
  pricePerNight,
  rating,
}) => {
  // State to toggle details view
  const [showDetails, setShowDetails] = useState(false);

  // State to track if the listing is "favorited"
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div
      className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl" // Apply hover effect here
    >
      {/* Property Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Property Details */}
      <div className="p-4">
        {/* Property Title and Favorite Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={() => setIsFavorited(!isFavorited)} // Toggle favorite
            className={`${
              isFavorited ? "text-red-500" : "text-gray-400"
            } hover:text-red-500 transition-colors duration-200`}
          >
            {isFavorited ? "♥" : "♡"}
          </button>
        </div>

        {/* Property Type */}
        <p className="text-gray-600">{propertyType}</p>

        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-500 text-sm mt-2"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {/* Property Info (Guests, Bedrooms, Bathrooms) - Only show if details are toggled */}
        {showDetails && (
          <div className="mt-2 flex items-center text-gray-600 text-sm space-x-4">
            <span>{guests} guests</span>
            <span>{bedrooms} bedrooms</span>
            <span>{bathrooms} bathrooms</span>
          </div>
        )}

        {/* Price per night */}
        <div className="mt-4 text-gray-900 font-bold text-xl">
          ${pricePerNight} <span className="text-sm font-normal">/ night</span>
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-gray-600">{rating}</span>
          <span className="ml-1 text-sm text-gray-500">(120 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default Listingcard;
