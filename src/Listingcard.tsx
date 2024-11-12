// src/Listingcard.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ListingcardProps {
  id: number;
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
  id,
  image,
  title,
  propertyType,
  guests,
  bedrooms,
  bathrooms,
  pricePerNight,
  rating,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Link to={`/listings/${id}`}>
      <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent link navigation on button click
                setIsFavorited(!isFavorited);
              }}
              className={`${
                isFavorited ? "text-red-500" : "text-gray-400"
              } hover:text-red-500 transition-colors duration-200`}
            >
              {isFavorited ? "♥" : "♡"}
            </button>
          </div>
          <p className="text-gray-600">{propertyType}</p>
          <div className="mt-4 text-gray-900 font-bold text-xl">
            ${pricePerNight}{" "}
            <span className="text-sm font-normal">/ night</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-600">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Listingcard;
