const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User'); // Make sure you have User schema in `models/User.js`

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Helper function: Generate a JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });
};

// Routes
// User Registration
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = generateToken(user);

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

// Example Protected Route
app.get('/api/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: 'Access granted', user: decoded });
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
});

// Other routes (listings, bookings, etc.)
const listings = require('./data.json'); // Ensure correct path to your JSON file

app.get('/api/listings', (req, res) => {
    res.json(listings);
});

app.get('/api/listings/:id', (req, res) => {
    const listing = listings.find(listing => listing.id === parseInt(req.params.id));
    if (listing) {
        res.json(listing);
    } else {
        res.status(404).send('Listing not found');
    }
});

app.get('/api/listings/search', (req, res) => {
    const query = req.query.query;
    const filteredListings = listings.filter(listing =>
        listing.location.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredListings);
});

app.post('/api/bookings', (req, res) => {
    res.status(201).send('Booking created');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
