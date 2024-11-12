// src/Listings.tsx

import React, { useEffect, useState } from "react";
import Listingcard from "./Listingcard";

interface ListingData {
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
          key={listing.id}
          id={listing.id}
          image={listing.image}
          title={listing.title}
          propertyType={listing.propertyType}
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
