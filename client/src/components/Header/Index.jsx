import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Components & Icons
import Search from "../Search";
import Navigation from "./Navigation";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart, FaMoon, FaSun } from "react-icons/fa";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

// ==================== Contexts ====================
import { ThemeContext } from "../../Contexts/ThemeContext";
import DrawerContext from "../../Contexts/DrawerContext";
import UserContext from "../../Contexts/UserContext";

// TODO: Look at that
import { Menu, MenuItem, Divider, Avatar } from "@mui/material";
import { FaUser, FaShoppingBag, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { ListItemIcon } from "@mui/material";

// ==================== STYLED COMPONENT ====================
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

// ==================== HEADER COMPONENT ====================
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  // ==================== Contexts destructing ====================
  const { orders } = useContext(DrawerContext);
  const { user, logout } = useContext(UserContext);

  return (
    <header className="bg-white">
      {/* ==================== TOP STRIP ==================== */}
      <div className="top-strip py-2 border-t-1 border-b-2 border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Promotional Text */}
            <div className="col-1 w-[50%]">
              <p className="text-[12px] font-[500]">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            {/* Help Links & Theme Toggle */}
            <div className="col-2 flex items-center justify-end">
              <ul className="flex items-baseline gap-3">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="text-[13px] font-[500] link transition"
                  >
                    Help center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracking"
                    className="text-[13px] font-[500] link transition"
                  >
                    Order Tracking
                  </Link>
                </li>
                <li>
                  {/* Theme Toggle Button */}
                  <Button
                    className={`!rounded-full !w-[35px] !min-w-[35px] !h-[35px] ${
                      theme === "light"
                        ? "!bg-white !text-black !border !border-solid !border-black"
                        : "!bg-black !text-white"
                    }`}
                    onClick={toggleTheme}
                  >
                    {theme === "light" ? (
                      <FaSun size={20} />
                    ) : (
                      <FaMoon size={20} />
                    )}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== HEADER MAIN ==================== */}
      <div className="header py-4 border-b-2 border-gray-300">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <div className="col-1 w-[25%]">
            <Link to={"/"}>
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>

          {/* Search */}
          <div className="col-2 w-[45%]">
            <Search />
          </div>

          {/* User Actions: Login/Register, Compare, Wishlist, Cart */}
          <div className="col-3 w-[40%] flex items-center">
            <ul className="flex items-center justify-end gap-3 w-full">
              {/* Login/Register Links */}
              {user.isLogged === false ? (
                <li className="list-none">
                  <Link
                    to={"/login"}
                    className="link transition text-[15px] font-[500] pl-7"
                  >
                    Login
                  </Link>{" "}
                  &nbsp;| &nbsp;
                  <Link
                    to={"/register"}
                    className="link transition text-[15px] font-[500]"
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <li className="list-none">
                  <div className="flex">
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      size="small"
                    >
                      <Avatar
                        src={user.pfp}
                        alt="pfp"
                        sx={{
                          width: 35,
                          height: 35,
                          border: "1px solid #2300bd",
                        }}
                      />
                    </IconButton>
                    {/* User info */}
                    <Box sx={{ px: 1, py: 1.5 }}>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        {user.name || "User"}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "text.secondary",
                          lineHeight: 1.2,
                        }}
                      >
                        {user.email || "user@email.com"}
                      </Typography>
                    </Box>
                  </div>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1,
                        minWidth: 190,
                      },
                    }}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={() => setAnchorEl(null)}
                    >
                      <ListItemIcon>
                        <FaUser size={16} />
                      </ListItemIcon>
                      My Profile
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/list"
                      onClick={() => setAnchorEl(null)}
                    >
                      <ListItemIcon>
                        <FaShoppingBag size={16} />
                      </ListItemIcon>
                      My List
                    </MenuItem>

                    <MenuItem
                      component={Link}
                      to="/wishlist"
                      onClick={() => setAnchorEl(null)}
                    >
                      <ListItemIcon>
                        <FaHeart size={16} />
                      </ListItemIcon>
                      Wishlist
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      onClick={() => {
                        logout();
                        setAnchorEl(null);
                      }}
                      sx={{ color: "error.main" }}
                    >
                      <ListItemIcon sx={{ color: "error.main" }}>
                        <FaSignOutAlt size={16} />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </li>
              )}

              {/* Compare */}
              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoGitCompareOutline />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Wishlist */}
              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist">
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Cart */}
              <li
                onClick={() => {
                  orders.open();
                }}
              >
                <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={orders.list.reduce((sum, order) => {
                        return sum + order.qty;
                      }, 0)}
                      color="secondary"
                    >
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ==================== NAVIGATION ==================== */}
      <div className="header py-2 border-b-2 border-gray-300">
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
