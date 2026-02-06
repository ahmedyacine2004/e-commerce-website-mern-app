import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String }, // for OTP verification
    resetToken: { type: String }, // for password reset
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
