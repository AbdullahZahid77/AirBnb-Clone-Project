// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");

// const User = require("./models/User"); // Assuming the user model is in the 'models' folder
// const router = express.Router();

// // POST /api/auth/login
// router.post(
//   "/login",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password is required").exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       // Check if user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ msg: "Invalid credentials. User does not exist." });
//       }

//       // Check if password matches
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ msg: "Invalid credentials." });
//       }

//       // Create and sign the JWT token
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       const token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "1h", // Token expires in 1 hour
//       });

//       res.json({ token });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );

// module.exports = router;
