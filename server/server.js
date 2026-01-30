import dotenv from "dotenv";
dotenv.config();

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ---------- SMTP Setup ----------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // set in .env
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error("SMTP VERIFY ERROR:", error);
  else console.log("SMTP READY ✅ Gmail connected");
});

// ---------- In-memory OTP store ----------
const otpStore = {}; // { email: { code, expiresAt } }

// ---------- Helper ----------
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ---------- Routes ----------
app.get("/", (req, res) => res.send("Server running ✅"));

// Send OTP
app.post("/auth/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ message: "Invalid email" });

  const otp = generateOTP();
  otpStore[email] = { code: otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 min expiry

  try {
    await transporter.sendMail({
      from: `"Lhamdane Shop" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code ✅",
      html: `<h2>Your OTP code is <b>${otp}</b></h2><p>It expires in 5 minutes.</p>`,
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("SMTP ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
app.post("/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "No OTP sent to this email" });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: "OTP expired" });
  if (record.code !== otp) return res.status(400).json({ message: "Invalid OTP" });

  // OTP is valid, delete it
  delete otpStore[email];

  // Mock admin data + token
  res.json({
    success: true,
    admin: { email },
    token: "fake-jwt-token-123456", 
  });
});

// ---------- Start server ----------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
