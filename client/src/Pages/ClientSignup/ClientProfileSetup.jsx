import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { notify } from "../../utils/toastUtils";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ClientProfileSetup() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!email) {
      notify("Email not found. Go back to signup.", "error");
      return;
    }

    try {
      const formData = new FormData();
      if (profilePicture) formData.append("profilePicture", profilePicture);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("email", email);

      await axios.put(
        "http://localhost:5000/api/client/complete-profile",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      notify(
        "Profile saved! OTP has been sent to your email for verification.",
        "success"
      );

      navigate("/verify", { state: { email } });
    } catch (err) {
      console.error(err);
      notify(
        err.response?.data?.message || "Failed to complete profile",
        "error"
      );
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[450px] m-auto bg-white p-6">
          <h3 className="text-center text-[26px] font-[600] mb-6">
            Complete your profile
          </h3>

          {/* Profile picture */}
          <div className="flex justify-center mb-6">
            <label className="cursor-pointer">
              <div className="w-[120px] h-[120px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border">
                {preview ? (
                  <img
                    src={preview}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Upload</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          <TextField
            label="Phone Number"
            className="w-full !mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            select
            label="Gender"
            className="w-full !mb-6"
            SelectProps={{ native: true }}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </TextField>

          <Button
            onClick={handleSubmit}
            className="btn-org btn-lg w-full"
            variant="contained"
          >
            Continue to Verification
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ClientProfileSetup;
