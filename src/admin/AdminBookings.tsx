import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/bookings",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div>
      <h1>Bookings Management</h1>
      <div>
        <h2>All Bookings</h2>
        <ul>
          {bookings.map((booking: any) => (
            <li key={booking._id}>
              <p>
                Guest: {booking.firstName} {booking.lastName} -{" "}
                {booking.phoneNumber}
              </p>
              <p>Property: {booking.property.title}</p>
              <p>
                Dates: {booking.startDate} to {booking.endDate}
              </p>
              <p>Total Price: ${booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBookings;
