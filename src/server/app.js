import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

const app = express();

// Whitelist local frontend and live production domain (filtering out undefined values)
const allowedOrigins = [
  "http://localhost:5173",
  "https://saviour-s-kitchen.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy error: Origin not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Handle preflight OPTIONS requests for all routes
app.options("*", cors(corsOptions));

// Apply main CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Saviour's Kitchen API is running.",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error.",
  });
});

export default app;