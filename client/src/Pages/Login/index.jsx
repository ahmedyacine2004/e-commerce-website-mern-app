import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { notify } from "../../utils/toastUtils";

function Login() {
  const [visibility, setVisibility] = useState(false);
  const [inputFields, setInputFields] = useState({ email: "", password: "" });

  const handleClearInputs = () => {
    setInputFields({ email: "", password: "" });
  };

  const history = useNavigate();

  const forgetPassword = () => {
    if (inputFields.email === "") {
      handleClearInputs();
      history("/verify");
      notify("OTP sent!","success");
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h3 className="text-center text-[28px] font-[600]">
            Sign in to your account
          </h3>
          <form className="w-full mt-3">
            <div className="form-group mb-5">
              <TextField
                id="email"
                label="Email *"
                variant="outlined"
                type="email"
                className="w-full"
                value={inputFields.email}
                onChange={(e) => {
                  setInputFields({ ...inputFields, email: e.target.value });
                }}
              />
            </div>
            <div className="form-group mb-5 relative">
              <TextField
                id="password"
                label="Password *"
                variant="outlined"
                type={`${visibility ? "text" : "password"}`}
                className="w-full"
                value={inputFields.password}
                onChange={(e) => {
                  setInputFields({ ...inputFields, password: e.target.value });
                }}
              />
              <Button
                className="!absolute translate-y-[25%] !right-[5px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-primary"
                onClick={() => {
                  setVisibility((prev) => {
                    return !prev;
                  });
                }}
              >
                {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </div>
            <a
              onClick={() => {
                forgetPassword();
              }}
              className="link cursor-pointer text-[14px] font-[500]"
            >
              Forget Password ?
            </a>
            <div className="flex items-center w-full my-3">
              <Button className="btn-org btn-lg w-full">Login</Button>
            </div>
            <p className="text-[14px] ">
              Not registered &nbsp;
              <Link className="link cursor-pointer font-[500]" to={"/register"}>
                Sign Up ?
              </Link>
            </p>
            <p className="text-[16px] font-[500] text-center py-2">
              Or continue with social media
            </p>
            <Button
              type="submit"
              startIcon={<FcGoogle size={20} />}
              className="btn-lg w-full !text-black !bg-[#f1f1f1]"
            >
              Log in with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
