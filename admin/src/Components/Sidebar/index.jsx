import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdFiberManualRecord } from "react-icons/md";
import {
  MdSpaceDashboard,
  MdHome,
  MdPeople,
  MdShoppingCart,
  MdCategory,
  MdReceipt,
  MdLogout,
  MdKeyboardArrowDown,
} from "react-icons/md";
import menuData from "../../data/adminMenu.json";

function Sidebar({ open }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const iconsMap = {
    MdSpaceDashboard: <MdSpaceDashboard size={20} />,
    MdHome: <MdHome size={20} />,
    MdPeople: <MdPeople size={20} />,
    MdShoppingCart: <MdShoppingCart size={20} />,
    MdCategory: <MdCategory size={20} />,
    MdReceipt: <MdReceipt size={20} />,
    MdLogout: <MdLogout size={20} />,
  };

  return (
    <aside
      className={`fixed top-0 left-0  index100 h-screen bg-white border-r shadow-md
      transition-all duration-300
      ${open ? "w-64 px-3" : "w-[80px] px-2"} py-3 rounded-r-[16px]`}
    >
      {/* Logo */}
      <div
        className={`mb-6 flex items-center transition-all duration-300 ${
          open ? "justify-start" : "justify-center"
        }`}
      >
        <Link
          to="/"
          className={`flex items-center transition-all duration-300 ${
            open ? "justify-start" : "justify-center"
          }`}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className={`transition-all duration-300 ${
              open ? "h-[50px] w-[50px]" : "h-[40px] w-[40px]"
            }`}
          />
          <h1
            className={`transition-all duration-300 overflow-hidden whitespace-nowrap text-[18px] font-[700] ml-2
    ${open ? "opacity-100 w-auto" : "opacity-0 absolute"} `}
          >
            Admin Panel
          </h1>
        </Link>
      </div>

      <ul className="list-none">
        {menuData.map((item) => (
          <li key={item.label} className="mb-1">
            {item.children ? (
              <>
                {/* Parent with children */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center px-3 py-3
                  text-gray-700 font-medium hover:bg-gray-100 rounded
                  ${open ? "justify-between" : "justify-center"}`}
                >
                  <div
                    className={`flex items-center transition-all duration-300 ${
                      open ? "gap-3" : "justify-center gap-0"
                    }`}
                  >
                    {iconsMap[item.icon]}
                    <span
                      className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                      ${open ? "opacity-100 ml-3 w-auto" : "opacity-0 ml-0 w-0"}`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {open && (
                    <MdKeyboardArrowDown
                      className={`transition-transform duration-200 ${
                        openMenus[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Children */}
                <ul
                  className={`pl-10 mt-1 flex flex-col gap-1 transition-all duration-300
                  ${open && openMenus[item.label] ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`}
                >
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link to={child.path} className="block">
                        <Button
                          startIcon={<MdFiberManualRecord size={8} />}
                          fullWidth
                          sx={{
                            justifyContent: "flex-start",
                            textTransform: "none",
                            fontSize: "12px",
                            paddingY: "4px",
                            paddingX: "8px",
                            color: "#4B5563",
                            borderRadius: "6px",
                            "&:hover": {
                              backgroundColor: "#F3F4F6",
                            },
                          }}
                        >
                          {child.label}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              /* Parent without children */
              <Link to={item.path}>
                <button
                  className={`w-full flex items-center px-3 py-3
                  text-gray-700 font-medium hover:bg-gray-100 rounded
                  ${open ? "justify-start gap-3" : "justify-center"}`}
                >
                  {iconsMap[item.icon]}
                  <span
                    className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                    ${open ? "opacity-100 ml-3 w-auto" : "opacity-0 ml-0 w-0"}`}
                  >
                    {item.label}
                  </span>
                </button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
