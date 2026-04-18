const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars from the correct path
dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/User");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/housepredict";

const seedUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    const email = "test@example.com";
    const password = "password123";

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("Test user already exists. Cleaning up...");
      await User.deleteOne({ email });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name: "Test User",
      email: email,
      password: hashedPassword
    });

    await user.save();
    console.log("------------------------------------------");
    console.log("TEST USER CREATED SUCCESSFULLY");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("------------------------------------------");

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedUser();
