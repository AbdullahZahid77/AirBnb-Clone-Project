import React, { useEffect, useState } from "react";

interface Listing {
  _id: string;
  title: string;
  location: string;
  pricePerNight: number;
}

const ListingsManagement: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/listings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const addListing = async () => {
    const newListing = {
      title: "New Property",
      location: "New York",
      pricePerNight: 100,
    };

    try {
      const response = await fetch("http://localhost:5000/api/admin/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const createdListing = await response.json();
      setListings((prev) => [...prev, createdListing]);
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  const deleteListing = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/listings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listings Management</h1>
      <button
        onClick={addListing}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Listing
      </button>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id} className="p-2 border-b">
            <h3>{listing.title}</h3>
            <p>{listing.location}</p>
            <p>${listing.pricePerNight}/night</p>
            <button
              onClick={() => deleteListing(listing._id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Delete Listing
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsManagement;
