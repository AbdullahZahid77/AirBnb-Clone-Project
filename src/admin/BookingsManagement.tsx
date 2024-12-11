import React, { useState, useEffect } from "react";

interface Booking {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  property: {
    title: string;
    pricePerNight: number;
  };
  dateBooked: string;
}

const BookingsManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings") // Assumed endpoint
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">User</th>
            <th className="px-4 py-2 border-b">Property</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Date Booked</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="px-4 py-2 border-b">{booking.user.name}</td>
              <td className="px-4 py-2 border-b">{booking.property.title}</td>
              <td className="px-4 py-2 border-b">
                ${booking.property.pricePerNight}
              </td>
              <td className="px-4 py-2 border-b">{booking.dateBooked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsManagement;
