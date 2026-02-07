import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/admin.auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import clientAuthRoutes from "./src/routes/client.auth.routes.js";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";

dotenv.config();
const app = express();

// DB
connectDB();

// Before routes
app.use(express.json({ limit: "50mb" })); // allow JSON bodies up to 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true })); // handle URL-encoded bodies

// Dynamic CORS for multiple allowed origins
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS not allowed for this origin"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/client", clientAuthRoutes); // Client authentication routes

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
