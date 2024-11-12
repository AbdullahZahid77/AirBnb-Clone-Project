// src/pages/Booking.tsx

import React, { useState } from "react";

const Booking = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(120); // Example hard-coded price per night

  const calculateTotalPrice = () => {
    const pricePerNight = 120;
    setTotalPrice(pricePerNight * 2); // Assuming 2 nights for demo
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotalPrice();
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 space-y-8">
      {" "}
      {/* Added mt-20 for top margin */}
      <h1 className="text-2xl font-semibold text-gray-800">Booking Details</h1>
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
        <p className="mt-2 text-gray-700">Cozy Beachside Apartment</p>
        <p className="mt-1 text-gray-700">Total Price: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default Booking;
