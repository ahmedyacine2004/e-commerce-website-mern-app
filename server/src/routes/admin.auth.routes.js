import express from "express";
import { transporter } from "../config/smtp.js";
import { generateOTP, saveOTP, verifyOTP } from "../utils/otp.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: Email OTP authentication
 */

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to email
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Server error
 */
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
      html: `<h2>${otp}</h2>`,
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("SMTP ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP code
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
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
