const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const listings = require('./data.json');  // Make sure your JSON file path is correct





app.use(cors()); // Enable CORS for all routes and origins

app.use(express.json());
// Other middleware and routes...


app.use(express.json());

// Endpoint to get all listings
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

// Endpoint to get listing details by ID
app.get('/api/listings/:id', (req, res) => {
  const listing = listings.find(listing => listing.id === parseInt(req.params.id));
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).send('Listing not found');
  }
});

// Search listings by location query
app.get('/api/listings/search', (req, res) => {
  const query = req.query.query;
  const filteredListings = listings.filter(listing => listing.location.toLowerCase().includes(query.toLowerCase()));
  res.json(filteredListings);
});

// Mock endpoint to create a booking
app.post('/api/bookings', (req, res) => {
  res.status(201).send('Booking created');  // Adjust as needed for real functionality
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
