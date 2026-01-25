import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [visibility, setVisibility] = useState(false);
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h3 className="text-center text-[28px] font-[600]">
            Register a new account
          </h3>
          <form className="w-full mt-3">
            <div className="form-group mb-5">
              <TextField
                id="fullName"
                label="Full Name *"
                variant="outlined"
                type="text"
                className="w-full"
              />
            </div>

            <div className="form-group mb-5">
              <TextField
                id="email"
                label="Email *"
                variant="outlined"
                type="email"
                className="w-full"
              />
            </div>
            <div className="form-group mb-5 relative">
              <TextField
                id="password"
                label="Password *"
                variant="outlined"
                type={`${visibility ? "text" : "password"}`}
                className="w-full"
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
            <div className="flex items-center w-full my-3">
              <Button className="btn-org btn-lg w-full">Register</Button>
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

export default Signup;
