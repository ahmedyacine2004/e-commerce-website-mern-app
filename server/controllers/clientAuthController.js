import Client from "../models/clientModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/clientTokenUtils.js";
import { generateOTP, saveOTP, verifyOTP } from "../utils/otp.js";
import { transporter } from "../config/smtp.js";

// Temporary in-memory signup store
const signupStore = {}; // { email: { fullName, passwordHash } }

/* =========================
   SIGNUP (PRE-VERIFICATION)
========================= */
export const signupClient = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await Client.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Store signup info temporarily
    signupStore[email] = { fullName, passwordHash: hashedPassword };

    const otp = generateOTP();
    saveOTP(email, otp);

    // Fancy signup verification email
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🔒 Verify Your Email for Your App Name",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 12px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #2c3e50;">Your App Name</h1>
          <p style="color: #7f8c8d; font-size: 16px;">Secure Email Verification</p>
        </div>
        <div style="background-color: #ffffff; padding: 25px; border-radius: 12px; text-align: center; border: 1px solid #ddd;">
          <h2 style="color: #e74c3c; font-size: 32px; margin: 0;">${otp}</h2>
          <p style="color: #34495e; font-size: 16px; margin-top: 10px;">
            Hi <b>${fullName}</b>, please use the OTP above to verify your email address.
            <br/>
            It expires in <b>5 minutes</b>.
          </p>
        </div>
        <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin-top: 15px;">
          If you did not request this, ignore this email. <br/>
          &copy; 2026 Your App Name
        </p>
      </div>
      `,
    });

    res.status(200).json({ message: "OTP sent. Please verify your email." });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* =========================
   VERIFY OTP & CREATE USER
========================= */
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const result = verifyOTP(email, otp);
  if (!result.valid) return res.status(400).json({ message: result.message });

  const signupData = signupStore[email];
  if (!signupData)
    return res
      .status(400)
      .json({ message: "No signup in progress for this email" });

  try {
    const client = await Client.create({
      fullName: signupData.fullName,
      email,
      password: signupData.passwordHash,
      isVerified: true,
    });

    delete signupStore[email];

    const token = generateToken(client);

    res.json({
      message: "Signup successful",
      token,
      id: client._id,
      fullName: client.fullName,
      email: client.email,
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Verification failed" });
  }
};

/* =========================
   LOGIN
========================= */
export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!client.isVerified)
      return res
        .status(403)
        .json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(client);
    res.json({
      id: client._id,
      fullName: client.fullName,
      email: client.email,
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) return res.status(400).json({ message: "Email not found" });

    const otp = generateOTP();
    saveOTP(email, otp);

    // Fancy password reset email
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🔑 Reset Your Password",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 12px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #2c3e50;">Your App Name</h1>
          <p style="color: #7f8c8d; font-size: 16px;">Password Reset OTP</p>
        </div>
        <div style="background-color: #ffffff; padding: 25px; border-radius: 12px; text-align: center; border: 1px solid #ddd;">
          <h2 style="color: #e74c3c; font-size: 32px; margin: 0;">${otp}</h2>
          <p style="color: #34495e; font-size: 16px; margin-top: 10px;">
            Use this OTP to reset your password. It expires in <b>5 minutes</b>.
          </p>
        </div>
        <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin-top: 15px;">
          If you did not request this, ignore this email. <br/>
          &copy; 2026 Your App Name
        </p>
      </div>
      `,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) return res.status(400).json({ message: "Email not found" });

    client.password = await bcrypt.hash(password, 10);
    await client.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
};
