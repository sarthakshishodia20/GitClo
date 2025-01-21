const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URL;

let client;
async function connectClient() {
    if (!client) {
        client = new MongoClient(uri);  // Using the latest MongoClient syntax without deprecated options
        await client.connect();
        console.log("MongoDB Connected");
    }
}

async function signup(req, res) {
    const { username, password, email } = req.body;

    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        // Check if the username already exists
        const user = await usersCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare new user object
        const newUser = {
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followerUsers: [],
            starRepo: [],
        };

        // Insert new user
        const result = await usersCollection.insertOne(newUser);

        // Ensure JWT_SECRET_KEY exists
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined in environment variables");
        }

        // Generate JWT token with the user ID
        const token = jwt.sign(
            { id: result.insertedId.toString() },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Respond with the token
        return res.json({ token });
    } catch (err) {
        console.error("Error During signup: ", err.message);
        return res.status(500).json({ error: "Server error" });
    }
}

// Placeholder functions for other user routes
const login = (req, res) => res.send("Logging in");
const getUserProfile = (req, res) => res.send("Profile fetched");
const updateUserProfile = (req, res) => res.send("Updating profile");
const deleteUserProfile = (req, res) => res.send("Deleting User Profile");
const getAllUsers = (req, res) => res.send("All users fetched");

// Export functions for use in routing
module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};
