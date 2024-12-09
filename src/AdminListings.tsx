import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminListings: React.FC = () => {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: "",
    type: "",
    pricePerNight: 0,
    rating: 0,
    reviews: 0,
    location: "",
    description: "",
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    host: "",
    images: [],
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/listings",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/listings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleAddListing = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/listings", newListing, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNewListing({
        title: "",
        type: "",
        pricePerNight: 0,
        rating: 0,
        reviews: 0,
        location: "",
        description: "",
        guests: 0,
        bedrooms: 0,
        bathrooms: 0,
        host: "",
        images: [],
      });
      fetchListings();
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  return (
    <div>
      <h1>Listings Management</h1>
      <div>
        <h2>Add New Listing</h2>
        {/* Form for adding a new listing */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddListing();
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={newListing.title}
            onChange={(e) =>
              setNewListing({ ...newListing, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Type"
            value={newListing.type}
            onChange={(e) =>
              setNewListing({ ...newListing, type: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Price Per Night"
            value={newListing.pricePerNight}
            onChange={(e) =>
              setNewListing({
                ...newListing,
                pricePerNight: Number(e.target.value),
              })
            }
            required
          />
          {/* Add other fields here */}
          <button type="submit">Add Listing</button>
        </form>
      </div>

      <div>
        <h2>All Listings</h2>
        <ul>
          {listings.map((listing: any) => (
            <li key={listing._id}>
              {listing.title} - ${listing.pricePerNight}
              <button onClick={() => handleDelete(listing._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminListings;
