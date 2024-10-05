import React from "react";
import Listingcard from "./Listingcard";

interface ListingData {
  image: string;
  title: string;
  propertyType: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  rating: number;
}

const listings: ListingData[] = [
  {
    image: "https://example.com/property1.jpg",
    title: "Beautiful Beachfront Villa",
    propertyType: "Entire home",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150,
    rating: 4.8,
  },
  {
    image: "https://example.com/property1.jpg",
    title: "Beautiful Beachfront Villa",
    propertyType: "Entire home",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150,
    rating: 4.8,
  },
  {
    image: "https://example.com/property1.jpg",
    title: "Beautiful Beachfront Villa",
    propertyType: "Entire home",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150,
    rating: 4.8,
  },
  {
    image: "https://example.com/property1.jpg",
    title: "Beautiful Beachfront Villa",
    propertyType: "Entire home",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150,
    rating: 4.8,
  },
  {
    image: "https://example.com/property2.jpg",
    title: "Cozy Mountain Cabin",
    propertyType: "Cabin",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    pricePerNight: 200,
    rating: 4.9,
  },
  {
    image: "https://example.com/property3.jpg",
    title: "Urban Apartment in City Center",
    propertyType: "Apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 100,
    rating: 4.5,
  },
  // Add more listings as needed
];

const Listings: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {listings.map((listing, index) => (
        <Listingcard
          key={index}
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
