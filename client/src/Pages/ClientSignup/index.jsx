import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
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
      // Call signup API which now only sends OTP
      await signupClient(inputFields);

      notify("OTP sent to your email. Please verify.", "success");

      // Pass all signup data to verify page via route state
      navigate("/verify", { state: { ...inputFields } });
    } catch (err) {
      notify(err.response?.data?.message || "Signup failed", "error");
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h3 className="text-center text-[28px] font-[600]">
            Register a new account
          </h3>
          <form className="w-full mt-3" onSubmit={handleSignup}>
            <div className="form-group mb-5">
              <TextField
                id="fullName"
                label="Full Name *"
                variant="outlined"
                type="text"
                className="w-full"
                value={inputFields.fullName}
                onChange={(e) =>
                  setInputFields({ ...inputFields, fullName: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-5">
              <TextField
                id="email"
                label="Email *"
                variant="outlined"
                type="email"
                className="w-full"
                value={inputFields.email}
                onChange={(e) =>
                  setInputFields({ ...inputFields, email: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-5 relative">
              <TextField
                id="password"
                label="Password *"
                variant="outlined"
                type={visibility ? "text" : "password"}
                className="w-full"
                value={inputFields.password}
                onChange={(e) =>
                  setInputFields({ ...inputFields, password: e.target.value })
                }
              />
              <Button
                className="!absolute translate-y-[25%] !right-[5px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-primary"
                onClick={() => setVisibility((prev) => !prev)}
              >
                {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </div>

            <div className="flex items-center w-full my-3">
              <Button type="submit" className="btn-org btn-lg w-full">
                Register
              </Button>
            </div>

            <p className="text-[14px] ">
              Already have account &nbsp;
              <Link className="link cursor-pointer font-[500]" to={"/login"}>
                Log in ?
              </Link>
            </p>

            <p className="text-[16px] font-[500] text-center py-2">
              Or continue with social media
            </p>
            <Button
              type="button"
              startIcon={<FcGoogle size={20} />}
              className="btn-lg w-full !text-black !bg-[#f1f1f1]"
            >
              Sign up with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ClientSignup;
