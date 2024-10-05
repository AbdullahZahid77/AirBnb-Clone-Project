import React, { useEffect } from "react";
import "./App.css";
import Horilist from "./Horilist";
import Navbar from "./Navbar";
import Listings from "./Listings";
import Footer from "./Footer";

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
    <>
      <Navbar />
      <Horilist />
      <Listings />
      <Footer />
    </>
  );
}

export default App;
