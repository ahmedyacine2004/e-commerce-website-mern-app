import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { notify } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../utils/clientAuthApi";
import UserContext from "../../Contexts/UserContext";

function ForgotPassword() {
  const [visibility, setVisibility] = useState(false);
  const [inputFields, setInputFields] = useState({ typePassword: "", confirmPassword: "" });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (inputFields.typePassword !== inputFields.confirmPassword) {
      notify("Passwords do not match", "error");
      return;
    }

    try {
      await resetPassword(user.email, inputFields.typePassword);
      notify("Password updated successfully", "success");
      navigate("/login");
    } catch (err) {
      notify(err.response?.data?.message || "Failed to reset password", "error");
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-4">
          <h3 className="text-center text-[28px] font-[600]">Reset Your Password</h3>
          <form className="w-full mt-3" onSubmit={handleResetPassword}>
            <div className="form-group mb-5 relative">
              <TextField
                id="password"
                label="Type Password *"
                variant="outlined"
                type={visibility ? "text" : "password"}
                className="w-full"
                value={inputFields.typePassword}
                onChange={(e) => setInputFields({ ...inputFields, typePassword: e.target.value })}
              />
              <Button
                className="!absolute translate-y-[25%] !right-[5px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-primary"
                onClick={() => setVisibility((prev) => !prev)}
              >
                {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </div>

            <div className="form-group mb-5 relative">
              <TextField
                id="confirmPassword"
                label="Confirm Password *"
                variant="outlined"
                type={visibility ? "text" : "password"}
                className="w-full"
                value={inputFields.confirmPassword}
                onChange={(e) => setInputFields({ ...inputFields, confirmPassword: e.target.value })}
              />
              <Button
                className="!absolute translate-y-[25%] !right-[5px] !min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-primary"
                onClick={() => setVisibility((prev) => !prev)}
              >
                {visibility ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </div>

            <div className="flex items-center w-full my-3">
              <Button type="submit" className="btn-org btn-lg w-full">Restore Password</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
