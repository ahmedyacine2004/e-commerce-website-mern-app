/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { notify } from "../../utils/toastUtils";
import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProfileSidebar from "../../components/ProfileSidebar";
import axios from "axios";

function Profile() {
  const { user, updateUser, logout } = useContext(UserContext);

  // Local state for the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  // Sync form with context on mount / user change
  useEffect(() => {
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob || "",
      gender: user.gender || "",
    });
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // <-- use 'name' here
    setFormData((prev) => ({
      ...prev,
      [name]: value, // <-- update the correct field
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      // Send updated profile to backend
      const res = await axios.put(
        "http://localhost:5000/api/client/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Update context with returned user
      updateUser(res.data.client);

      notify("Your profile has been updated successfully", "success");
    } catch (err) {
      console.error("Profile update error:", err);
      notify(
        err.response?.data?.message || "Failed to update profile",
        "error",
      );
    }
  };

  return (
    <section className="p-8 w-full">
      <div className="container flex gap-5">
        <div className="col-1 w-[20%]">
          <ProfileSidebar
            user={user}
            updateUser={updateUser} // ✅ add this
            logout={logout}
            isPfpEdit={true}
            activeTab="profile"
          />
        </div>
        <div className="col-2 w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                className="!bg-primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
