// src/pages/ListingDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Listing {
  id: number;
  image: string;
  title: string;
  propertyType: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  rating: number;
  description: string;
}

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    // Fetch listing data by ID
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setListing(data);
      })
      .catch((error) =>
        console.error("Error fetching listing details:", error)
      );
  }, [id]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 space-y-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="md:pl-8 space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            {listing.title}
          </h1>
          <p className="text-sm text-gray-600">
            {listing.propertyType} • {listing.guests} guests •{" "}
            {listing.bedrooms} bedrooms • {listing.bathrooms} bathrooms
          </p>
          <p className="mt-4 text-gray-700">
            ${listing.pricePerNight} per night
          </p>
          <p className="text-gray-600 mt-2">{listing.description}</p>
          <button
            onClick={() => navigate(`/book/${id}`)}
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
