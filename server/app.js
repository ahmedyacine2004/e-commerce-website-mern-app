import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // ✔ correct

const app = express();
app.use(express.json());
app.use(cors());

// ---------- Routes ----------
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Server running ✅"));

export default app; // ✅ must have default export
