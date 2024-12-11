import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load bookings");
        }

        setBookings(data); // Assuming data is an array of bookings
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [token, navigate]);

  const handleDelete = async (bookingId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete booking");
      }

      setBookings(bookings.filter((booking) => booking._id !== bookingId)); // Remove deleted booking from state
      alert("Booking deleted successfully!");
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting booking:", err);
    }
  };

  // Function to format the date
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Bookings</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg shadow-lg p-4 bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {booking.property.title}
                </h2>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Booking
                </button>
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-medium">Dates:</span>{" "}
                {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Guests:</span>{" "}
                {booking.numberOfPersons}
              </div>
              <div className="text-gray-700">
                <span className="font-medium">Price:</span> $
                {booking.totalPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
