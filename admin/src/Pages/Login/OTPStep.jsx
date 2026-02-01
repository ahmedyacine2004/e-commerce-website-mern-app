import React, { useRef } from "react";

const OTPStep = ({
  email,
  otp,
  setOTP,
  setError,
  loading,
  setLoading,
  API_BASE,
  handleLoginSuccess,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only numbers
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setError("");

    if (otp.some((o) => o === "")) {
      setError("Please complete the OTP");
      return;
    }

    const otpString = otp.join("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      handleLoginSuccess(data.admin, data.token);
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current box
        const newOTP = [...otp];
        newOTP[index] = "";
        setOTP(newOTP);
      } else if (index > 0) {
        // Move back if current is empty
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <>
      <div className="flex justify-between gap-2">
        {otp.map((o, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            maxLength={1}
            value={o}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="border w-10 h-10 text-center text-lg rounded"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-600 text-white py-2 rounded mt-4 hover:bg-purple-700 transition"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </>
  );
};

export default OTPStep;
