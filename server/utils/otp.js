// In-memory OTP store
const otpStore = {}; // { email: { code, expiresAt } }

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const saveOTP = (email, code) => {
  otpStore[email] = { code, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 min expiry
};

export const verifyOTP = (email, otp) => {
  const record = otpStore[email];
  if (!record) return { valid: false, message: "No OTP sent to this email" };
  if (Date.now() > record.expiresAt) return { valid: false, message: "OTP expired" };
  if (record.code !== otp) return { valid: false, message: "Invalid OTP" };

  delete otpStore[email]; // OTP valid, remove it
  return { valid: true };
};