import { useState, useContext } from "react";
import AdminContext from "../../Contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import Wavify from "react-wavify";
import Lottie from "lottie-react";
import animationData from "../../assets/lottie/Login.json"; // your Lottie file

const Login = () => {
  const { login } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login({
        adminData: { name: "Admin", email },
        token: "dummy-token-123",
      });
      navigate("/"); // redirect after login
    } else {
      setError("Wrong email or password!");
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* ---------- Wavy Background ---------- */}
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
      <div className="elative z-20 h-screen w-full flex items-center justify-between px-[200px]">
        {/* ---------- Lottie Animation ---------- */}
        <div className="w-72 h-72">
          <Lottie animationData={animationData} loop={true} />
        </div>

        {/* ---------- Form ---------- */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-lg w-96 flex flex-col gap-4 backdrop-blur-md"
          >
            <h2 className="text-2xl font-bold text-center text-purple-700">
              Admin Login
            </h2>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
