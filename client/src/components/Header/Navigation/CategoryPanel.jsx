// TODO: This is AI generated you need to understand it

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { IoClose } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRegSquareMinus } from "react-icons/fa6";
import {
  FaTshirt,
  FaLaptop,
  FaShoppingBag,
  FaShoePrints,
  FaAppleAlt,
  FaHeart,
  FaGem,
} from "react-icons/fa";

const iconMap = {
  FaTshirt,
  FaLaptop,
  FaShoppingBag,
  FaShoePrints,
  FaAppleAlt,
  FaHeart,
  FaGem,
};

// ==================== Dynamic Categories Data ====================
import categoriesData from "../../../data/categoriesData.json";

function CategoryPanel({ openCategoryPanel, isOpenCatPanel }) {
  // Track open submenu per category
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  // Track open inner submenu per category
  const [openInnerIndex, setOpenInnerIndex] = useState({});

  const toggleSubmenu = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    // Reset inner submenu when switching submenu
    setOpenInnerIndex((prev) => ({ ...prev, [index]: null }));
  };

  const toggleInner = (catIndex, subIndex) => {
    setOpenInnerIndex((prev) => ({
      ...prev,
      [catIndex]: prev[catIndex] === subIndex ? null : subIndex,
    }));
  };

  // ==================== Drawer Content ====================
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      {/* Header */}
      <h3 className="p-3 text-[18px] font-[500] flex items-center justify-between">
        Shopping by Categories
        <IoClose
          className="cursor-pointer text-[20px]"
          onClick={openCategoryPanel}
        />
      </h3>

      <Divider />

      {/* Category List */}
      <div className="scroll">
        <ul className="menu w-full">
          {categoriesData.map((category, catIndex) => {
            const Icon = iconMap[category.icon];
            return (
              <li key={catIndex} className="list-none relative">
                <Link className="w-full" to="/">
                  <Button className="w-full !justify-start !px-3 !py-3 !text-black flex items-center">
                    {Icon && <Icon className="mr-2 text-[18px]" />}
                    {category.title}
                  </Button>
                </Link>

                {/* Toggle Icon */}
                {openSubmenuIndex === catIndex ? (
                  <FaRegSquareMinus
                    className="absolute top-[15px] right-[15px] cursor-pointer"
                    onClick={() => toggleSubmenu(catIndex)}
                  />
                ) : (
                  <FaRegPlusSquare
                    className="absolute top-[15px] right-[15px] cursor-pointer"
                    onClick={() => toggleSubmenu(catIndex)}
                  />
                )}

                {/* Submenus */}
                {openSubmenuIndex === catIndex && (
                  <ul className="submenuDrawer w-full pl-3">
                    {category.submenus.map((submenu, subIndex) => (
                      <li key={subIndex} className="list-none relative">
                        <div className="relative w-full">
                          {/* Submenu Button */}
                          <Button
                            className="w-full !justify-start !px-3 !text-black"
                            onClick={() => toggleInner(catIndex, subIndex)}
                          >
                            {submenu.title}
                          </Button>

                          {/* Toggle Icon */}
                          {openInnerIndex[catIndex] === subIndex ? (
                            <FaRegSquareMinus
                              className="absolute top-[10px] right-[15px] cursor-pointer"
                              onClick={() => toggleInner(catIndex, subIndex)}
                            />
                          ) : (
                            <FaRegPlusSquare
                              className="absolute top-[10px] right-[15px] cursor-pointer"
                              onClick={() => toggleInner(catIndex, subIndex)}
                            />
                          )}
                        </div>

                        {/* Inner submenu items */}
                        {openInnerIndex[catIndex] === subIndex && (
                          <ul className="inner-submenu w-full pl-5 mt-1 text-[14px] font-[500]">
                            {submenu.inner.map((item, innerIndex) => (
                              <li key={innerIndex} className="py-1">
                                <Link
                                  to="/"
                                  className="w-full !justify-start block px-2 py-1 hover:bg-gray-100 rounded"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Box>
  );

  return (
    <div className="container">
      <Drawer open={isOpenCatPanel} onClose={openCategoryPanel}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default CategoryPanel;
