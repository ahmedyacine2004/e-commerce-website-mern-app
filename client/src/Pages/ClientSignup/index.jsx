import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastUtils";
import { signupClient } from "../../utils/clientAuthApi";

function ClientSignup() {
  const [visibility, setVisibility] = useState(false);
  const [inputFields, setInputFields] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupClient(inputFields);
      notify("Signup saved. Complete your profile next.", "success");
      navigate("/profile-setup", { state: { email: inputFields.email } });
    } catch (err) {
      notify(err.response?.data?.message || "Signup failed", "error");
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h3 className="text-center text-[28px] font-[600]">
            Create your account
          </h3>

          <form onSubmit={handleSignup} className="mt-4">
            <TextField
              label="Full Name"
              className="w-full !mb-3"
              value={inputFields.fullName}
              onChange={(e) =>
                setInputFields({ ...inputFields, fullName: e.target.value })
              }
            />

            <TextField
              label="Email"
              type="email"
              className="w-full !mb-3"
              value={inputFields.email}
              onChange={(e) =>
                setInputFields({ ...inputFields, email: e.target.value })
              }
            />

            <div className="relative !mb-3">
              <TextField
                label="Password"
                type={visibility ? "text" : "password"}
                className="w-full"
                value={inputFields.password}
                onChange={(e) =>
                  setInputFields({ ...inputFields, password: e.target.value })
                }
              />
              <Button
                onClick={() => setVisibility((v) => !v)}
                className="!text-black !w-[35px] !min-w-[35px] !h-[35px] !rounded-full !absolute !right-2 !top-[20%]"
              >
                {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </div>

            <Button type="submit" className="btn-org btn-lg w-full">
              Continue
            </Button>

            <p className="text-[14px] mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login" className="link font-[500]">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ClientSignup;
