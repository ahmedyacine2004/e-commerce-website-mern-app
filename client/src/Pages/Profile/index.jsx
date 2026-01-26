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

function Profile() {
  const { user, updateUser, logout } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("profile"); // ✅ track active tab
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
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob || "",
      gender: user.gender || "",
    });
  }, [user]);

  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    updateUser({ pfp: imageUrl });
    notify("Profile Picture saved","success")
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes to context
  const handleSave = () => {
    updateUser(formData);
    notify("Your infos are Saved", "success");
  };

  return (
    <section className="p-8 w-full">
      <div className="container flex gap-5">
        <div className="col-1 w-[20%]">
          <ProfileSidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handlePfpChange={handlePfpChange}
            logout={logout}
          />
        </div>
        <div className="col-2 w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
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

              <Button variant="contained" className="!bg-primary" onClick={handleSave}>
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
