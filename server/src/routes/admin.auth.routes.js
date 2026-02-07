import express from "express";
import { transporter } from "../config/smtp.js";
import { generateOTP, saveOTP, verifyOTP } from "../utils/otp.js";

const router = express.Router();

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ message: "Invalid email" });

  const otp = generateOTP();
  saveOTP(email, otp);

  try {
    await transporter.sendMail({
      from: `"Lhamdane Shop" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code from Lhamdane Shop ✅",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #2c3e50;">Lhamdane Shop</h1>
      <p style="color: #7f8c8d; font-size: 14px;">Secure One-Time Password (OTP)</p>
    </div>
    <div style="background-color: #f1f1f1; padding: 20px; text-align: center; border-radius: 10px; margin-bottom: 20px;">
      <h2 style="color: #e74c3c; font-size: 28px; margin: 0;">${otp}</h2>
      <p style="color: #34495e; font-size: 16px; margin: 5px 0 0;">Use this code to verify your email. It expires in <b>5 minutes</b>.</p>
    </div>
    <p style="color: #7f8c8d; font-size: 12px; text-align: center;">
      If you did not request this code, you can safely ignore this email.<br/>
      &copy; 2026 Lhamdane Shop
    </p>
  </div>
  `,
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("SMTP ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP required" });

  const result = verifyOTP(email, otp);
  if (!result.valid) return res.status(400).json({ message: result.message });

  res.json({
    success: true,
    admin: { email },
    token: "fake-jwt-token-123456",
  });
});

export default router;
