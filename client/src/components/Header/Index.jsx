import React, { useContext } from "react";
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

// ==================== Contexts ====================
import { ThemeContext } from "../../Contexts/ThemeContext";
import DrawerContext from "../../Contexts/DrawerContext";

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
  // ==================== Contexts destructing ====================
  const { orders } = useContext(DrawerContext);

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
