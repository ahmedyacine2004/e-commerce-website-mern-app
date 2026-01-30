import React, { useState } from "react";

const PASSWORD = import.meta.env.VITE_PASSWORD;

const PasswordStep = ({ setError, handleLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginWithPassword = () => {
    if (loading) return;
    setError("");
    setLoading(true);

    if (password === PASSWORD) {
      // Dummy admin data, in real case, fetch from server
      handleLoginSuccess({ name: "Admin" }, "dummy-token");
    } else {
      setError("Invalid password");
    }

    setLoading(false);
  };

  return (
    <>
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button
        onClick={loginWithPassword}
        disabled={loading}
        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Logging in..." : "Login with Password"}
      </button>
    </>
  );
};

export default PasswordStep;
