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

function Sidebar() {
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
    <aside className="w-[220px] fixed top-0 left-0 bg-white h-screen border-r border-gray-200 py-4 px-3 overflow-y-auto">
      <div className="mb-6 flex items-center gap-2">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" className="h-[50px]" />
        </Link>
        <h1 className="text-[18px] font-[700] ">Admin Panel</h1>
      </div>

      <ul className="list-none">
        {menuData.map((item) => (
          <li key={item.label} className="mb-1">
            {item.children ? (
              <>
                {/* Parent item */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center justify-between px-3 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded"
                >
                  <div className="flex items-center gap-3">
                    {iconsMap[item.icon]}
                    <span>{item.label}</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={`transition-transform duration-200 ${
                      openMenus[item.label] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Children */}
                {openMenus[item.label] && (
                  <ul className="pl-10 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link to={child.path} className="block">
                          <Button
                            startIcon={<MdFiberManualRecord size={8} />}
                            fullWidth
                            sx={{
                              justifyContent: "flex-start",
                              alignItems: "flex-baseline", // 👈 key line
                              textTransform: "none",
                              fontSize: "12px",
                              paddingY: "4px",
                              paddingX: "8px",
                              color: "#4B5563",
                              borderRadius: "6px",
                              "& .MuiButton-startIcon": {
                                marginTop: "2px", // 👈 fine-tune dot position
                              },
                              "&:hover": {
                                backgroundColor: "#F3F4F6",
                              },
                            }}
                          >
                            <span className="text-start leading-snug">
                              {child.label}
                            </span>
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              /* Parent without children */
              <Link to={item.path}>
                <button className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded">
                  {iconsMap[item.icon]}
                  <span>{item.label}</span>
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
