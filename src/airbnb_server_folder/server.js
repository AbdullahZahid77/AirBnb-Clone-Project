const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User"); // Ensure your User schema is in `models/User.js`

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
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "6785";

// Helper function: Generate a JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: "1d" } // Token expires in 1 day
  );
};

// Middleware: Authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded token data to request object
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Routes
// 1. User Registration
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
});

// 2. User Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// 3. Protected Route Example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

// 4. Listings Routes
const listings = require("./data.json"); // Ensure correct path to your JSON file

// Get all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Get listing by ID
app.get("/api/listings/:id", (req, res) => {
  const listing = listings.find((listing) => listing.id === parseInt(req.params.id));
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).send("Listing not found");
  }
});

// Search listings
app.get("/api/listings/search", (req, res) => {
  const query = req.query.query;
  const filteredListings = listings.filter((listing) =>
    listing.location.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredListings);
});

// 5. Booking Route (Example)
app.post("/api/bookings", authenticateToken, (req, res) => {
  // For example, use req.body for booking details (like listingId, userId, etc.)
  res.status(201).send("Booking created");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
