const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique ID for the property
    title: { type: String, required: true }, // Title of the property
    type: { type: String, required: true }, // Type of the property (e.g., Farmhouse, Apartment)
    pricePerNight: { type: Number, required: true }, // Price per night
    rating: { type: Number, required: true, min: 0, max: 5 }, // Rating of the property
    reviews: { type: Number, required: true }, // Number of reviews
    location: { type: String, required: true }, // Location of the property
    description: { type: String, required: true }, // Detailed description
    guests: { type: Number, required: true }, // Max number of guests
    bedrooms: { type: Number, required: true }, // Number of bedrooms
    bathrooms: { type: Number, required: true }, // Number of bathrooms
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the host (user)
    images: [{ type: String }], // Store image URLs or paths
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Property', propertySchema);
