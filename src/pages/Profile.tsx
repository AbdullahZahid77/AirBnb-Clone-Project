import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

const Profile: React.FC = () => {
  const { user, logout } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);

  console.log("user", user);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await axios.get(
            `http://localhost:5000/api/bookings/user/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setBookings(response.data);
        } catch (err) {
          console.error("Error fetching bookings:", err);
        }
      };

      fetchBookings();
    }
  }, [user]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user ? (
        <>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
          </p>
          <h2 className="mt-4 text-xl font-semibold">Your Bookings</h2>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="p-4 mt-2 border rounded-lg">
                <p>
                  <strong>Property:</strong> {booking.property.title}
                </p>
                <p>
                  <strong>Check-in:</strong> {booking.checkInDate}
                </p>
                <p>
                  <strong>Check-out:</strong> {booking.checkOutDate}
                </p>
                <p>
                  <strong>Total Price:</strong> ${booking.totalPrice}
                </p>
              </div>
            ))
          ) : (
            <p>No bookings yet.</p>
          )}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
          >
            Logout
          </button>
        </>
      ) : (
        <p>You are not logged in. Please log in to access your profile.</p>
      )}
    </div>
  );
};

export default Profile;
