import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const BookingsManagement: React.FC = () => {
  const { token } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorMessage = `Error ${response.status}: ${response.statusText}`;
          setError(errorMessage);
          setBookings([]);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setBookings(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bookings-management">
      <h2 className="text-xl font-bold mb-4">Bookings Management</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="p-2 border-b">
              <h3>Property: {booking.property?.title}</h3>
              <p>User: {booking.userId?.name}</p>
              <p>
                Dates: {booking.startDate} - {booking.endDate}
              </p>
              <p>Total: ${booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingsManagement;
