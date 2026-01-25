// TODO: Read this AI generated component

import { useState } from "react";
import Lottie from "lottie-react";
import shield from "../../assets/lottie/shield.json";
import OtpBox from "../../components/OtpBox";
import { notify } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";

function Verify() {
  const [_, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleOtpComplete = async (code) => {
    setOtp(code);
    setLoading(true);

    try {
      // fake verification (replace with API call)
      if (code === "123456") {
        notify("OTP verified successfully", "success");
        history("/forgot-password");
      } else {
        notify("Invalid OTP code", "error");
      }
    } catch {
      notify("Something went wrong", "error");
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
              Note: Please make sure to verify your email to complete the
              verification process.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Verify;
