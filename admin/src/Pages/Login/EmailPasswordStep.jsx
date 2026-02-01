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

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </>
  );
};

export default EmailPasswordStep;
