import { useState, useContext } from "react";
import AdminContext from "../../Contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import Wavify from "react-wavify";
import Lottie from "lottie-react";
import animationData from "../../assets/lottie/Login.json";

import EmailPasswordStep from "./EmailPasswordStep";
import OTPStep from "./OTPStep";

const Login = () => {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (adminData, token) => {
    login({ adminData, token });
    navigate("/");
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Wavify
        className="absolute top-0 left-0 w-full h-full"
        fill="url(#gradient)"
        paused={false}
        options={{ height: 50, amplitude: 30, speed: 0.2, points: 4 }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </Wavify>

      <div className="relative z-20 h-screen w-full flex items-center justify-between px-[200px]">
        <div className="w-72 h-72">
          <Lottie animationData={animationData} loop />
        </div>

        <div className="bg-white p-8 rounded shadow-lg w-96 flex flex-col gap-4 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-center text-purple-700">
            Admin Login
          </h2>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {step === 1 && (
            <EmailPasswordStep
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setError={setError}
              setStep={setStep}
              setLoading={setLoading}
              loading={loading}
              API_BASE={import.meta.env.VITE_API_BASE_URL}
              ALLOWED_EMAIL={import.meta.env.VITE_ALLOWED_EMAIL}
            />
          )}

          {step === 2 && (
            <OTPStep
              email={email}
              otp={otp}
              setOTP={setOTP}
              setError={setError}
              loading={loading}
              setLoading={setLoading}
              API_BASE={import.meta.env.VITE_API_BASE_URL}
              handleLoginSuccess={handleLoginSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
