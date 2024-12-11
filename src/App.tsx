import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Horilist from "./Horilist";
import Listings from "./Listings";
import ListingDetails from "./pages/ListingDetails";
import Booking from "./pages/Booking";
import Register from "./Register";
import Login from "./Login";
import AdminDashboard from "./admin/AdminDashboard";
import Profile from "./pages/Profile"; // Add your user profile page
import BookingHistory from "./pages/BookingHistory"; // Add your booking history page
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "./context/UserContext"; // Import the UserProvider

const App: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Use code ABDULLAH-ZAHID for 30% OFF");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Horilist />
                <Listings />
              </>
            }
          />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-history"
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
