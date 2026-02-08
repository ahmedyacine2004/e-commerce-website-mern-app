import express from "express";
import multer from "multer";
import {
  signupClient,
  completeProfileAndSendOTP,
  verifyOtp,
  loginClient,
  forgotPassword,
  resetPassword,
  updateClientProfile,
} from "../controllers/clientAuthController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { clientAuthMiddleware } from "../middlewares/clientAuthMiddleware.js"; // ✅ add this

const router = express.Router();

// STEP 1: Signup
router.post("/signup", signupClient);

// STEP 2: Complete Profile + send OTP
router.put(
  "/complete-profile",
  upload.single("profilePicture"),
  completeProfileAndSendOTP,
);

// STEP 3: Verify OTP
router.post("/verify-otp", verifyOtp);

// LOGIN
router.post("/login", loginClient);

// FORGOT / RESET PASSWORD
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Update logged-in profile
router.put(
  "/update-profile",
  clientAuthMiddleware, // ✅ protect route
  upload.single("profilePicture"),
  updateClientProfile,
);

export default router;
