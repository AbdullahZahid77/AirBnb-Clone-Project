const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Property = require('./models/Property');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || '6785';

// Helper function: Generate a JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Helper Middleware: Authenticate User
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Routes

// 1. User Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// 3. GET /api/listings: Fetch all listings
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Property.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings', error: err.message });
  }
});

// 4. GET /api/listings/:id: Fetch a specific listing
app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Property.findById(req.params.id).populate('host', 'name email');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listing', error: err.message });
  }
});

// 5. POST /api/bookings: Create a booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { property, firstName, lastName, phoneNumber, numberOfPersons, startDate, endDate, totalPrice } = req.body;

  try {
    const booking = new Booking({
      userId: req.user.id,
      property,
      firstName,
      lastName,
      phoneNumber,
      numberOfPersons,
      startDate,
      endDate,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// 6. Admin Endpoints
// GET /api/admin/listings: View all listings
app.get('/api/admin/listings', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const listings = await Property.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings', error: err.message });
  }
});

// POST /api/admin/listings: Add a new listing
app.post('/api/admin/listings', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id, title, type, pricePerNight, rating, reviews, location, description, guests, bedrooms, bathrooms, host, images } = req.body;

  try {
    const newProperty = new Property({
      id,
      title,
      type,
      pricePerNight,
      rating,
      reviews,
      location,
      description,
      guests,
      bedrooms,
      bathrooms,
      host,
      images,
    });

    await newProperty.save();
    res.status(201).json({ message: 'Listing created successfully', newProperty });
  } catch (err) {
    res.status(500).json({ message: 'Error creating listing', error: err.message });
  }
});

// DELETE /api/admin/listings/:id: Delete a listing
app.delete('/api/admin/listings/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting listing', error: err.message });
  }
});

// GET /api/admin/bookings: View all bookings
app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const bookings = await Booking.find().populate('userId property', 'name title');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
