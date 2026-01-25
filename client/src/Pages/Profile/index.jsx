/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { FaUpload } from "react-icons/fa6";
import { Button } from "@mui/material";
import { FaUser, FaHeart, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

function Profile() {
  const { user, updateUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

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
          <div className="card bg-white shadow-md rounded-md">
            {/* Avatar */}
            <div className="w-full p-3 flex items-center justify-center flex-col gap-2">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative group">
                <img
                  src={user.pfp}
                  alt="pfp"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <FaUpload className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePfpChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <p className="text-[14px] font-[500]">{user.name}</p>
            </div>

            {/* Sidebar menu */}
            <ul className="list-none pb-5">
              {/* My Profile */}
              <li className="w-full">
                <Link to={"/profile"}>
                  <Button
                    startIcon={<FaUser size={16} />}
                    onClick={() => setActiveTab("profile")}
                    className={`!w-full !justify-start !rounded-none !pl-5 ${
                      activeTab === "profile"
                        ? "!border-l-[3px] !border-solid !border-primary !text-black"
                        : "!text-[rgba(0,0,0,0.7)]"
                    }`}
                  >
                    My Profile
                  </Button>
                </Link>
              </li>

              {/* My List */}
              <li className="w-full">
                <Link to={"/wishlist"}>
                  <Button
                    startIcon={<FaHeart size={16} />}
                    onClick={() => setActiveTab("list")}
                    className={`!w-full !justify-start !rounded-none !pl-5 ${
                      activeTab === "list"
                        ? "!border-l-[3px] !border-solid !border-primary !text-black"
                        : "!text-[rgba(0,0,0,0.7)]"
                    }`}
                  >
                    My List
                  </Button>
                </Link>
              </li>

              {/* My Orders */}
              <li className="w-full">
                <Link to={"/cart"}>
                  <Button
                    startIcon={<FaShoppingBag size={16} />}
                    onClick={() => setActiveTab("orders")}
                    className={`!w-full !justify-start !rounded-none !pl-5 ${
                      activeTab === "orders"
                        ? "!border-l-[3px] !border-solid !border-primary !text-black"
                        : "!text-[rgba(0,0,0,0.7)]"
                    }`}
                  >
                    My Orders
                  </Button>{" "}
                </Link>
              </li>

              {/* Logout */}
              <li className="w-full mt-2 border-t pt-2">
                <Button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  startIcon={<FaSignOutAlt size={16} />}
                  className="!w-full !justify-start !text-red-600 !rounded-none hover:!bg-red-50 !pl-5"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
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

              <Button variant="contained" color="primary" onClick={handleSave}>
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
