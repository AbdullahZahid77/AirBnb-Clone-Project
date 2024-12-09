const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path to match your project structure

const users = [
    { name: "John Doe", email: "johndoe@example.com", password: "password123", isAdmin: false },
    { name: "Jane Smith", email: "janesmith@example.com", password: "password123", isAdmin: false },
    { name: "Admin User", email: "admin@example.com", password: "adminpass", isAdmin: true },
    { name: "Alice Johnson", email: "alicej@example.com", password: "password123", isAdmin: false },
    { name: "Bob Brown", email: "bobbrown@example.com", password: "password123", isAdmin: false },
    { name: "Chris Green", email: "chrisgreen@example.com", password: "password123", isAdmin: false },
    { name: "Emma White", email: "emmawhite@example.com", password: "password123", isAdmin: true },
    { name: "Michael Black", email: "mblack@example.com", password: "password123", isAdmin: false },
    { name: "Sophia Blue", email: "sblue@example.com", password: "password123", isAdmin: false },
    { name: "Liam Gray", email: "liamgray@example.com", password: "password123", isAdmin: false },
];

const insertUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/airbnb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Hash passwords
        for (let user of users) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        // Insert users into the database
        await User.insertMany(users);
        console.log('10 users inserted successfully');
    } catch (err) {
        console.error('Error inserting users:', err.message);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

insertUsers();
