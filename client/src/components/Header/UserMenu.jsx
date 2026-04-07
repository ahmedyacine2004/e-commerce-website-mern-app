import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Divider,
  Avatar,
  IconButton,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import { FaUser, FaShoppingBag, FaHeart, FaSignOutAlt } from "react-icons/fa";
import UserContext from "../../Contexts/UserContext";
import socket from "../../utils/socket";

function UserMenu() {
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      if (socket.connected && user.id) {
        socket.emit("client-logout", { clientId: user.id });
        socket.disconnect();
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      setAnchorEl(null);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar
            src={user.pfp}
            sx={{ width: 35, height: 35, border: "1px solid #2300bd" }}
          />
        </IconButton>
        <Box px={1}>
          <Typography fontSize={12} fontWeight={600}>
            {user.fullName || "User"}
          </Typography>
          <Typography fontSize={11} color="text.secondary">
            {user.email || "user@email.com"}
          </Typography>
        </Box>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 200 } }}
      >
        <MenuItem component={Link} to="/profile" className="!w-full">
          <ListItemIcon>
            <FaUser />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem component={Link} to="/list" className="!w-full">
          <ListItemIcon>
            <FaHeart />
          </ListItemIcon>
          Wishlist
        </MenuItem>

        <MenuItem component={Link} to="/orders" className="!w-full">
          <ListItemIcon>
            <FaShoppingBag />
          </ListItemIcon>
          My Orders
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <FaSignOutAlt />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
