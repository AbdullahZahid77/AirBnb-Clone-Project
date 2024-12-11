import React, { useState } from "react";

interface ListingFormData {
  title: string;
  description: string;
  location: string;
  price: number;
}

const AddListing: React.FC = () => {
  const [formData, setFormData] = useState<ListingFormData>({
    title: "",
    description: "",
    location: "",
    price: 0,
  });

  // Updated handleChange function to handle both <input> and <textarea>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field based on the name
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted: ", formData);
    // Add form submission logic here, like API calls
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter title"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange} // Correct type for textarea
          placeholder="Enter description"
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter location"
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter price"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddListing;
