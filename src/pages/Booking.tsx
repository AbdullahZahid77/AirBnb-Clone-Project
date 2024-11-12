// src/pages/Booking.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Listing {
  id: number;
  title: string;
  pricePerNight: number;
  image: string;
  description: string;
}

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [listing, setListing] = useState<Listing | null>(null);

  // Fetch listing data by ID
  useEffect(() => {
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
      .catch((error) => console.error("Error fetching listing:", error));
  }, [id]);

  const calculateTotalPrice = () => {
    if (listing && checkInDate && checkOutDate) {
      const date1 = new Date(checkInDate);
      const date2 = new Date(checkOutDate);
      const days = Math.ceil(
        (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
      );
      const calculatedTotalPrice = days * listing.pricePerNight;
      setTotalPrice(calculatedTotalPrice);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotalPrice();
  };

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Booking Details</h1>
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {listing.title}
          </h2>
          <p className="text-gray-700">${listing.pricePerNight} per night</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="checkIn" className="block text-gray-700">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-gray-700">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
        >
          Calculate Total
        </button>
      </form>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Booking Summary</h2>
        <p className="mt-2 text-gray-700">{listing.title}</p>
        <p className="mt-1 text-gray-700">Total Price: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default Booking;
