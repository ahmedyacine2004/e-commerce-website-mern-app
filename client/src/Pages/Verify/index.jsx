import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import shield from "../../assets/lottie/shield.json";
import OtpBox from "../../components/OtpBox";
import { notify } from "../../utils/toastUtils";
import { verifyOtp } from "../../utils/clientAuthApi";

function Verify() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract full signup info from state
  const { fullName, email, password } = location.state || {};

  const handleOtpComplete = async (code) => {
    if (!email || !fullName || !password) {
      notify("Signup data missing. Please register again.", "error");
      navigate("/signup");
      return;
    }

    setLoading(true);
    try {
      // Pass email + OTP to backend which will create the user after verification
      const _userData = await verifyOtp(email, code, { fullName, password });

      notify("OTP verified successfully. Account created!", "success");

      // Redirect to login or profile
      navigate("/login");
    } catch (err) {
      notify(err.response?.data?.message || "Invalid OTP code", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Lottie className="w-[50px]" animationData={shield} loop={true} />
            <h3 className="text-center text-[28px] font-[600]">
              Verify Your OTP
            </h3>
          </div>

          <form className="flex items-center justify-center flex-col p-5 gap-4">
            <OtpBox onComplete={handleOtpComplete} />

            {loading && (
              <p className="text-sm text-gray-500">Verifying OTP...</p>
            )}

            <p className="text-xs text-gray-500 text-center mt-3">
              Note: Please verify your email to complete the registration
              process.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Verify;
