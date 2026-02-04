import Lottie from "lottie-react";
import spinner from "../../assets/lottie/Loading animation blue.json";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const EmailPasswordStep = ({
  email,
  setEmail,
  password,
  setPassword,
  setError,
  setStep,
  setLoading,
  loading,
  API_BASE,
  ALLOWED_EMAIL,
}) => {
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (email !== ALLOWED_EMAIL) {
      setError("This email is not authorized");
      return;
    }

    if (password !== import.meta.env.VITE_PASSWORD) {
      setError("Invalid password");
      return;
    }

    setLoading(true);
    try {
      // request OTP from backend
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

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);

    setTimeout(() => {
      setLoadingGoogle(false);
    }, 2000);
  };

  return (
    <>
      <div className="form-group relative">
        <TextField
          id="email"
          label="Email *"
          variant="outlined"
          type={`text`}
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-5 relative">
        <TextField
          id="password"
          label="Password *"
          variant="outlined"
          type={`${visibility ? "text" : "password"}`}
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="!absolute translate-y-[30%] !right-[5px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-primary"
          onClick={() => {
            setVisibility((prev) => {
              return !prev;
            });
          }}
        >
          {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
        </Button>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`flex items-center justify-center ${loading ? "bg-white border-[1px] border-purple-500" : "bg-purple-600"} text-white py-2 rounded  transition`}
      >
        {loading ? (
          <Lottie
            animationData={spinner}
            className="w-[50px] !text-purple-500"
            loop
          />
        ) : (
          "Send OTP"
        )}
      </button>
      <div className="flex items-center justify-center gap-[8px]">
        <hr className="w-[60px]" />
        <span className="text-center text-[14px] text-gray-600 ">
          or log in with google
        </span>
        <hr className="w-[60px]" />
      </div>

      <Button
        startIcon={<FcGoogle />}
        onClick={handleGoogleLogin}
        disabled={loadingGoogle}
        variant="outlined"
        className="!border-black !text-black"
        loading={loadingGoogle}
        loadingPosition="end"
      >
        Login With google
      </Button>
    </>
  );
};

export default EmailPasswordStep;
