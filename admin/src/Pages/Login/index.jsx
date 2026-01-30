import { useState, useContext } from "react";
import AdminContext from "../../Contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import Wavify from "react-wavify";
import Lottie from "lottie-react";
import animationData from "../../assets/lottie/Login.json";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const ALLOWED_EMAIL = import.meta.env.VITE_ALLOWED_EMAIL;

const Login = () => {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const sendOTP = async () => {
    if (loading) return;
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (email !== ALLOWED_EMAIL) {
      setError("This email is not authorized");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setStep(2);
    } catch (err) {
      setError(err.message || "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (loading) return;
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");

      login({ adminData: data.admin, token: data.token });
      navigate("/");
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
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
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <button
                onClick={sendOTP}
                disabled={loading}
                className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <button
                onClick={verifyOTP}
                disabled={loading}
                className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-purple-500 underline"
              >
                Change email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
