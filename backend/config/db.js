const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const dbUrl = process.env.MONGO_URL || "";
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data) => {
      console.log(`MongoDB Connected with ${data.connection.host}`);
    });
  } catch (err) {
    console.error(err.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
