import "./App.css";
import Horilist from "./Horilist";
import Navbar from "./Navbar";
import Listings from "./Listings"; // Import the Listings component
import Footer from "./Footer";

function App() {
  return (
    <>
      <Horilist />
      <Navbar />
      <Listings /> {/* Use the Listings component */}
      <Footer />
    </>
  );
}

export default App;
