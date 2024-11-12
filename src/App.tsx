import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Horilist from "./Horilist";
import Listings from "./Listings";
import ListingDetails from "./pages/ListingDetails";
import Booking from "./pages/Booking";

function App() {
  // Using useEffect to trigger the alert 5 seconds after the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      alert("Use code ABDULLAH-ZAHID for 30% OFF");
    }, 5000); // Delay of 5000ms (5 seconds)

    // Clean up the timeout in case the component unmounts before the timer finishes
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once after the initial rendering

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Horilist />
              <Listings />
            </>
          }
        />
        <Route path="/listing-details" element={<ListingDetails />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
