import Client from "../models/clientModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/clientTokenUtils.js";
import { generateOTP, saveOTP, verifyOTP } from "../utils/otp.js";
import { transporter } from "../config/smtp.js";

// Temporary in-memory signup store
const signupStore = {}; // { email: { fullName, passwordHash, phone, gender, profilePicture } }

/* =========================
   STEP 1: Signup (basic)
========================= */
export const signupClient = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existing = await Client.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    signupStore[email] = {
      fullName,
      passwordHash: hashedPassword,
      phone: null,
      gender: null,
      profilePicture: null,
    };

    res.status(200).json({
      message: "Signup saved. Complete your profile next.",
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* =========================
   STEP 2: Complete Profile & Send OTP
========================= */
export const completeProfileAndSendOTP = async (req, res) => {
  const { email, phone, gender } = req.body;
  const profilePicture = req.file?.path;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const tempSignup = signupStore[email];
  if (!tempSignup) return res.status(400).json({ message: "Signup not found" });

  // Update profile in temp signup
  tempSignup.phone = phone || tempSignup.phone;
  tempSignup.gender = gender || tempSignup.gender;
  tempSignup.profilePicture = profilePicture || tempSignup.profilePicture;

  // Generate OTP
  const otp = generateOTP();
  saveOTP(email, otp);

  // Send email (UI untouched)
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
          Hi <b>${tempSignup.fullName}</b>, please use the OTP above to verify your email address.
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

  res.status(200).json({
    message: "Profile saved. OTP sent to your email.",
  });
};

/* =========================
   STEP 3: Verify OTP & Create User
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
      phone: signupData.phone,
      gender: signupData.gender,
      profilePicture: signupData.profilePicture, // store original
      isVerified: true,
    });

    delete signupStore[email];

    const token = generateToken(client);

    // Build the full URL for the frontend
    const profilePicUrl = client.profilePicture
      ? `http://localhost:5000/${client.profilePicture.replace("\\", "/")}`
      : null;

    res.json({
      message: "Signup successful",
      token,
      id: client._id,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      gender: client.gender,
      pfp: profilePicUrl, // frontend uses `pfp`
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

    // Build the full URL for the frontend
    const profilePicUrl = client.profilePicture
      ? `http://localhost:5000/${client.profilePicture.replace("\\", "/")}`
      : null;

    res.json({
      id: client._id,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      gender: client.gender,
      pfp: profilePicUrl, // frontend expects this
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

    // Email UI untouched
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

/* =========================
   Update Profile for logged-in users
========================= */
export const updateClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    client.fullName = req.body.fullName || client.fullName;
    client.phone = req.body.phone || client.phone;
    client.gender = req.body.gender || client.gender;

    if (req.file) {
      client.profilePicture = req.file.path;
    }

    await client.save();

    res.json({
      message: "Profile updated successfully",
      client,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
