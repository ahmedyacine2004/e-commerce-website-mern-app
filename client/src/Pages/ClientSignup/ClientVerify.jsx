import { useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils/toastUtils";
import UserContext from "../../Contexts/UserContext";
import Lottie from "lottie-react";
import otpAnimation from "../../assets/lottie/shield.json";

function ClientVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const email = location.state?.email;

  const OTP_LENGTH = 6;
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const newOtp = [...otpValues];
    newOtp[index] = val[0]; // only first digit
    setOtpValues(newOtp);

    // Move focus to next input
    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpValues];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtpValues(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const otp = otpValues.join("");
    if (otp.length !== OTP_LENGTH) {
      notify("Please enter full OTP", "error");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/client/verify-otp",
        { email, otp },
      );

      notify("OTP verified! You are logged in.", "success");

      login(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/"); // go home
    } catch (err) {
      notify(err.response?.data?.message || "OTP verification failed", "error");
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4 flex flex-col items-center">
          {/* Small Lottie animation */}
          <div className="w-[60px] h-[60px] mb-4">
            <Lottie animationData={otpAnimation} loop={true} />
          </div>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Enter the OTP sent to your email
          </h2>

          {/* OTP inputs */}
          <div className="flex gap-2 mb-6">
            {otpValues.map((val, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-primary focus:outline-none"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md w-full max-w-[300px]"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </section>
  );
}

export default ClientVerify;
