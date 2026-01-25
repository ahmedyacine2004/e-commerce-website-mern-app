// TODO: Read this AI generated component

import { useRef, useState } from "react";

const OTP_LENGTH = 6;

export default function OtpBox({ onComplete }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // only numbers allowed
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }

    // OTP complete
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "48px",
            height: "48px",
            textAlign: "center",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      ))}
    </div>
  );
}
