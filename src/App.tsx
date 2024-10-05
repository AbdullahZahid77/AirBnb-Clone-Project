import "./App.css";
import Horilist from "./Horilist";
import Navbar from "./Navbar";
import Listings from "./Listings"; // Import the Listings component
import Footer from "./Footer";

function App() {
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
