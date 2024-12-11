import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Listing {
  id: number;
  title: string;
  pricePerNight: number;
  image: string;
  description: string;
}

const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [listing, setListing] = useState<Listing | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState(1);

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
      const calculatedTotalPrice =
        days * listing.pricePerNight * numberOfPersons;
      setTotalPrice(calculatedTotalPrice);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date1 = new Date(checkInDate);
    const date2 = new Date(checkOutDate);

    if (date1 >= date2) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    calculateTotalPrice();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to book.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          property: id,
          firstName,
          lastName,
          phoneNumber,
          numberOfPersons,
          startDate: checkInDate,
          endDate: checkOutDate,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Booking successful!");
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error booking property:", error);
      alert("There was an issue with your booking.");
    }
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
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfPersons" className="block text-gray-700">
            Number of Persons
          </label>
          <input
            type="number"
            id="numberOfPersons"
            value={numberOfPersons}
            onChange={(e) => setNumberOfPersons(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            min="1"
            required
          />
        </div>
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
          Confirm Booking
        </button>
      </form>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Booking Summary</h2>
        <p className="mt-2 text-gray-700">
          <strong>Property:</strong> {listing.title}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>First Name:</strong> {firstName}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>Last Name:</strong> {lastName}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>Number of Persons:</strong> {numberOfPersons}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>Check-in Date:</strong> {checkInDate}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>Check-out Date:</strong> {checkOutDate}
        </p>
        <p className="mt-1 text-gray-700">
          <strong>Total Price:</strong> ${totalPrice}
        </p>
      </div>
    </div>
  );
};

export default Booking;
