import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.routes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();

// DB
connectDB();

// Before routes
app.use(express.json({ limit: "50mb" })); // allow JSON bodies up to 50MB
app.use(express.urlencoded({ limit: "50mb", extended: true })); // handle URL-encoded bodies

// Dynamic CORS for multiple allowed origins
const allowedOrigins = ["http://localhost:3001", "http://localhost:5173"];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS not allowed for this origin'), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));



// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
