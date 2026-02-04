import { useContext, useState } from "react";
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
import AdminContext from "../../Contexts/AdminContext";

// Import useLocation to get the current path
import { useLocation } from "react-router-dom";

function Sidebar({ open, toggleSidebar }) {
  const [openMenus, setOpenMenus] = useState({});
  const { logout } = useContext(AdminContext);
  const location = useLocation();

  // Helper functions to determine active states
  const isActive = (path) => location.pathname === path;
  const isChildActive = (children) =>
    children?.some((child) => location.pathname === child.path);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    if (!open) {
      toggleSidebar();
    }
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
      transition-all duration-300 overflow-auto
      ${open ? "w-64 px-3" : "w-[80px] px-2"} py-3 rounded-r-[16px]`}
    >
      {/* Logo */}
      <div
        className={`mb-6 flex items-center transition-all duration-300 ${
          open ? "justify-start" : "justify-center"
        }`}
      >
        <Link to="/" className="flex items-center transition-all duration-300">
          <img
            src="/images/logo.png"
            alt="logo"
            className={`transition-all duration-300 ${
              open ? "h-[50px] w-[50px]" : "h-[40px] w-[40px]"
            }`}
          />
          {open && (
            <span className="ml-2 whitespace-nowrap font-bold text-[18px] overflow-hidden transition-all duration-300">
              Admin Panel
            </span>
          )}
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
                  className={`w-full flex items-center px-3 py-3 font-medium rounded transition ${isChildActive(item.children) ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"} ${open ? "justify-between" : "justify-center"}`}
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
                            borderRadius: "6px",
                            backgroundColor: isActive(child.path)
                              ? "#EDE9FE"
                              : "transparent",
                            color: isActive(child.path) ? "#6D28D9" : "#4B5563",
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
            ) : /* Parent without children */
            item.label !== "Logout" ? (
              <Link to={item.path}>
                <button
                  className={`w-full flex items-center px-3 py-3 font-medium rounded transition ${isActive(item.path) ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"} ${open ? "justify-start gap-3" : "justify-center"}`}
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
            ) : (
              <> 
                <button
                  className={`w-full flex items-center px-3 py-3 font-medium rounded transition "text-gray-700 hover:bg-gray-100" ${open ? "justify-start gap-3" : "justify-center"}`}
                  onClick={() => {
                    logout();
                  }}
                >
                  {iconsMap[item.icon]}
                  <span
                    className={`transition-all duration-300 overflow-hidden whitespace-nowrap
                    ${open ? "opacity-100 ml-3 w-auto" : "opacity-0 ml-0 w-0"}`}
                  >
                    {item.label}
                  </span>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
