const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS => cross Origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// body parser
app.use(express.json());

// Error handling middleware
// app.use(errorMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
