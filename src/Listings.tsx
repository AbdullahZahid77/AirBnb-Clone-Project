// src/Listings.tsx

import React, { useEffect, useState } from "react";
import Listingcard from "./Listingcard";

interface ListingData {
  _id: string; // MongoDB uses `_id` instead of `id`
  images: string[]; // Array of image URLs
  title: string;
  type: string; // Property type
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  rating: number;
  location: string;
}

const Listings: React.FC = () => {
  const [listings, setListings] = useState<ListingData[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setListings(data))
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {listings.map((listing) => (
        <Listingcard
          key={listing._id} // Use MongoDB's `_id` as the unique key
          id={listing._id} // Pass `_id` to Listingcard
          image={listing.images[0]} // Use the first image
          title={listing.title}
          propertyType={listing.type}
          guests={listing.guests}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          pricePerNight={listing.pricePerNight}
          rating={listing.rating}
        />
      ))}
    </div>
  );
};

export default Listings;
