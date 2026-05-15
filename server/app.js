import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/admin.auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import clientAuthRoutes from "./src/routes/client.auth.routes.js";
import bannersRoutes from "./src/routes/banners.routes.js";
import mainBannerRoutes from "./src/routes/mainBanner.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import subcategoryRoutes from "./src/routes/subcategory.routes.js";
import clientsRoutes from "./src/routes/clients.routes.js";
import bulkImportRoutes from "./src/routes/bulkImport.routes.js";

import { notFound, errorHandler } from "./src/middlewares/error.middleware.js";

// ✅ Swagger import
import setupSwagger from "./src/config/swagger.js";

dotenv.config();

const app = express();

// =========================
// DATABASE
// =========================
connectDB();

// =========================
// MIDDLEWARES
// =========================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static("uploads"));

// =========================
// CORS
// =========================
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed for this origin"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// =========================
// ROUTES
// =========================
app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/client", clientAuthRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/main-banners", mainBannerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/bulk-import", bulkImportRoutes);
app.use("/api/clients", clientsRoutes);

// =========================
// SWAGGER (IMPORTANT)
// =========================
setupSwagger(app);

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// =========================
// ERROR HANDLERS (MUST BE LAST)
// =========================
app.use(notFound);
app.use(errorHandler);

export default app;
