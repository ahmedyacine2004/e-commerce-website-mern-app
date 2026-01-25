import { Button } from "@mui/material";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoRocketSharp } from "react-icons/io5";
import CategoryPanel from "./CategoryPanel";
import { useState } from "react";
import menuData from "../../../data/menuData.json"; // your JSON

import "./styles.css";

function Navigation() {
  // ==================== STATE ====================
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  // Toggle category panel drawer (FIX 1.1)
  const toggleCategoryPanel = () => {
    setIsOpenCatPanel((prev) => !prev);
  };

  return (
    <>
      {/* ==================== NAVBAR ==================== */}
      <nav>
        <div className="container flex items-center justify-end gap-5">
          {/* ==================== LEFT PART ==================== */}
          <div className="col-1 w-[20%] !text-black border-l border-gray-800">
            <Button
              className="!text-black gap-2 w-full"
              onClick={toggleCategoryPanel}
            >
              <RiMenu2Line className="text-[18px]" />
              Shop by Categories
              <FaAngleDown className="text-[13px] ml-auto font-bold cursor-pointer" />
            </Button>
          </div>
          {/* TODO: Check the AI work right here */}
          {/* ==================== MIDDLE PART ==================== */}
          <div className="col-2 w-[60%]">
            <ul className="flex items-center gap-1 nav">
              {menuData.map((menuItem) => (
                <li
                  key={menuItem.title}
                  className="list-none text-[14px] relative"
                >
                  <Link to={menuItem.link}>
                    <Button className="!font-[400] !text-[rgba(0,0,0,0.8)] hover:!text-[#2300bd]">
                      {menuItem.title}
                    </Button>
                  </Link>

                  {/* Render submenu if exists */}
                  {menuItem.submenu && (
                    <div className="submenu absolute top-full left-0 min-w-[150px] bg-white shadow-md">
                      <ul>
                        {menuItem.submenu.map((sub) => (
                          <li
                            key={sub.title || sub}
                            className="list-none relative"
                          >
                            <Link to={sub.link || "/"}>
                              <Button className="w-full !text-left !justify-start !rounded-none !text-black">
                                {sub.title || sub}
                              </Button>
                            </Link>

                            {/* Render inner submenu if it's array of strings */}
                            {sub.submenu &&
                              Array.isArray(sub.submenu) &&
                              typeof sub.submenu[0] === "string" && (
                                <div className="submenu absolute top-0 left-full min-w-[150px] bg-white shadow-md">
                                  <ul>
                                    {sub.submenu.map((inner) => (
                                      <li key={inner}>
                                        <Link to="/">
                                          <Button className="w-full !text-left !justify-start !rounded-none !text-black">
                                            {inner}
                                          </Button>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ==================== RIGHT PART ==================== */}
          <div className="col-2 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <IoRocketSharp className="text-[18px]" />
              Free international Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* ==================== CATEGORY PANEL ==================== */}
      <CategoryPanel
        openCategoryPanel={toggleCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
      />
    </>
  );
}

export default Navigation;
