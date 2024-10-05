import "./App.css";
import Horilist from "./Horilist";
import Navbar from "./Navbar";
import Listingcard from "./Listingcard";
// import Footer from "./Footer";
function App() {
  return (
    <>
      <Horilist />
      <Navbar />
      <div className="p-8">
        <Listingcard
          image="https://example.com/property.jpg"
          title="Beautiful Beachfront Villa"
          propertyType="Entire home"
          guests={4}
          bedrooms={2}
          bathrooms={2}
          pricePerNight={150}
          rating={4.8}
        />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
