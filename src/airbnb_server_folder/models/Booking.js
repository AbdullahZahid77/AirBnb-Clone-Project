const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }, // Reference to the property
    firstName: { type: String, required: true }, // First name of the guest
    lastName: { type: String, required: true }, // Last name of the guest
    phoneNumber: { type: String, required: true }, // Phone number of the guest
    numberOfPersons: { type: Number, required: true }, // Number of persons
    startDate: { type: Date, required: true }, // Check-in date
    endDate: { type: Date, required: true }, // Check-out date
    totalPrice: { type: Number, required: true }, // Total price of the booking
}, { timestamps: true }); // Adds `createdAt` and `updatedAt` fields automatically

module.exports = mongoose.model('Booking', bookingSchema);
