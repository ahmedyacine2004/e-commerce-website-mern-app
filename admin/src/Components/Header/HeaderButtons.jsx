import { useState, useContext } from "react";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";

import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

import AdminContext from "../../Contexts/AdminContext";
import { StyledBadge } from "./StyledBadge";

export function HeaderButtons() {
  const { admin } = useContext(AdminContext);

  // STATE
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [gearAnchor, setGearAnchor] = useState(null);
  const [bellAnchor, setBellAnchor] = useState(null);

  const profileOpen = Boolean(profileAnchor);
  const gearOpen = Boolean(gearAnchor);
  const bellOpen = Boolean(bellAnchor);

  const handleCloseProfile = () => setProfileAnchor(null);
  const handleCloseGear = () => setGearAnchor(null);
  const handleCloseBell = () => setBellAnchor(null);

  return (
    <div className="part-2 flex items-center gap-2">

      {/* GEAR */}
      <div>
        <Button
          className="!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-[rgba(0,0,0,0.7)] !shadow-md flex items-center justify-center"
          onClick={(e) => setGearAnchor(e.currentTarget)}
        >
          <FaGear size={18} />
        </Button>
        <Menu
          anchorEl={gearAnchor}
          open={gearOpen}
          onClose={handleCloseGear}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ elevation: 3, sx: { mt: 1, minWidth: 190 } }}
        >
          <MenuItem component={Link} to="/settings" onClick={handleCloseGear}>
            <ListItemIcon>
              <FaGear size={16} />
            </ListItemIcon>
            Account Settings
          </MenuItem>
          <MenuItem component={Link} to="/activity" onClick={handleCloseGear}>
            <ListItemIcon>
              <MdShowChart size={16} />
            </ListItemIcon>
            Activity Log
          </MenuItem>
        </Menu>
      </div>

      {/* BELL */}
      <div>
        <Button
          className="!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-[rgba(0,0,0,0.7)] !shadow-md flex items-center justify-center"
          onClick={(e) => setBellAnchor(e.currentTarget)}
        >
          <StyledBadge badgeContent={4} color="primary">
            <FaBell size={18} />
          </StyledBadge>
        </Button>
        <Menu
          anchorEl={bellAnchor}
          open={bellOpen}
          onClose={handleCloseBell}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ elevation: 3, sx: { mt: 1, minWidth: 200 } }}
        >
          <MenuItem onClick={handleCloseBell}>Notification 1</MenuItem>
          <MenuItem onClick={handleCloseBell}>Notification 2</MenuItem>
          <MenuItem onClick={handleCloseBell}>Notification 3</MenuItem>
          <MenuItem onClick={handleCloseBell}>Notification 4</MenuItem>
        </Menu>
      </div>

      {/* AVATAR */}
      <div
        onClick={(e) => setProfileAnchor(e.currentTarget)}
        className="h-[40px] w-[40px] rounded-full overflow-hidden shadow-md cursor-pointer"
      >
        <img
          src={admin?.avatar || "/images/pfp-placeholder.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* PROFILE MENU */}
      <Menu
        anchorEl={profileAnchor}
        open={profileOpen}
        onClose={handleCloseProfile}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ elevation: 3, sx: { mt: 1, minWidth: 190 } }}
      >
        <MenuItem component={Link} to="/profile" onClick={handleCloseProfile}>
          <div className="flex items-center justify-between gap-2">
            <div className="h-[30px] w-[30px] rounded-full overflow-hidden shadow-md">
              <img
                src={admin?.avatar || "/images/pfp-placeholder.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <h2 className="text-[14px] font-[600]">{admin?.name || "Admin Name"}</h2>
              <p className="text-[10px] font-[600]">{admin?.email || "admin@example.com"}</p>
            </div>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem component={Link} to="/list" onClick={handleCloseProfile}>
          <ListItemIcon>
            <FaUser size={16} />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem component={Link} to="/list" onClick={handleCloseProfile}>
          <ListItemIcon>
            <FaGear size={16} />
          </ListItemIcon>
          Account Settings
        </MenuItem>

        <MenuItem component={Link} to="/orders" onClick={handleCloseProfile}>
          <ListItemIcon>
            <MdShowChart size={16} />
          </ListItemIcon>
          Activity Log
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleCloseProfile} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <FaSignOutAlt size={16} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
