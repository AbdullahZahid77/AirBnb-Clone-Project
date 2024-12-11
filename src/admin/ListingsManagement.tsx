import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Listing {
  _id: string;
  title: string;
  pricePerNight: number;
}

const ListingsManagement: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/listings") // Assumed endpoint
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:5000/api/admin/listings/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setListings(listings.filter((listing) => listing._id !== id));
      })
      .catch((error) => console.error("Error deleting listing:", error));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Listings</h1>
      <Link
        to="/admin/listings/add"
        className="mb-4 block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Add New Listing
      </Link>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Price per Night</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id}>
              <td className="px-4 py-2 border-b">{listing.title}</td>
              <td className="px-4 py-2 border-b">${listing.pricePerNight}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingsManagement;
