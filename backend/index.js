const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS => cross Origin resource sharing
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
// body parser
app.use(express.json({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// Middleware for handling errors
app.use(helmet());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Platform API",
      version: "1.0.0",
      description: "API documentation for the Learning Platform",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Path to the API docs
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", userRoutes);
app.use("/api", chatRoutes);

// Handle wrong API paths
app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  errorMiddleware(err, req, res);
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
