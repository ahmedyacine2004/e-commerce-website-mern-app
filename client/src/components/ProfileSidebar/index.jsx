import { useState } from "react";
import { Button } from "@mui/material";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaSignOutAlt,
  FaUpload,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils/toastUtils";

function ProfileSidebar({
  user,
  activeTab,
  setActiveTab,
  logout,
  isPfpEdit = true,
  updateUser,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePfpChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/client/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // convert to full URL
      const newPfpUrl = res.data.client.profilePicture
        ? `http://localhost:5000/${res.data.client.profilePicture.replace("\\", "/")}`
        : "./images/pfp-placeholder.png";

      // update context immediately
      updateUser({ pfp: newPfpUrl });
      notify("Profile picture updated successfully", "success");
    } catch (err) {
      console.error(err);
      notify(
        err.response?.data?.message || "Failed to update profile picture",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-md">
      {/* ==================== Avatar ==================== */}
      <div className="w-full p-3 flex items-center justify-center flex-col gap-2">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative group">
          <img
            src={user.pfp || "/images/pfp-placeholder.png"}
            alt="pfp"
            className="w-full h-full object-cover"
          />
          {isPfpEdit && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <FaUpload className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePfpChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={loading}
              />
            </div>
          )}
        </div>

        <p className="text-[14px] font-[500]">{user.name}</p>
      </div>

      {/* ==================== Menu ==================== */}
      <ul className="list-none pb-5">
        {/* My Profile */}
        <li className="w-full">
          <Link to="/profile">
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

        {/* Wishlist */}
        <li className="w-full">
          <Link to="/list">
            <Button
              startIcon={<FaHeart size={16} />}
              onClick={() => setActiveTab("list")}
              className={`!w-full !justify-start !rounded-none !pl-5 ${
                activeTab === "list"
                  ? "!border-l-[3px] !border-solid !border-primary !text-black"
                  : "!text-[rgba(0,0,0,0.7)]"
              }`}
            >
              Wishlist
            </Button>
          </Link>
        </li>

        {/* Orders */}
        <li className="w-full">
          <Link to="/orders">
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
            </Button>
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
  );
}

export default ProfileSidebar;
