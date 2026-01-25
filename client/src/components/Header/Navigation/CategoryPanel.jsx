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

// ==================== Dynamic Categories Data ====================
const categoriesData = [
  {
    title: "Fashion",
    icon: FaTshirt,
    submenus: [
      {
        title: "Apparel",
        inner: ["T-Shirts", "Shirts", "Jeans", "Dresses"],
      },
      {
        title: "Accessories",
        inner: ["Bags", "Belts", "Hats", "Scarves"],
      },
      {
        title: "Shoes",
        inner: ["Sneakers", "Boots", "Formal Shoes", "Sandals"],
      },
    ],
  },
  {
    title: "Electronics",
    icon: FaLaptop,
    submenus: [
      {
        title: "Laptops",
        inner: ["MacBook", "Dell XPS", "HP Spectre", "Lenovo ThinkPad"],
      },
      {
        title: "Mobiles",
        inner: ["iPhone", "Samsung Galaxy", "Pixel", "OnePlus"],
      },
      {
        title: "Accessories",
        inner: ["Chargers", "Headphones", "Power Banks"],
      },
    ],
  },
  {
    title: "Bags",
    icon: FaShoppingBag,
    submenus: [
      {
        title: "Backpacks",
        inner: ["Travel Backpack", "Laptop Backpack", "School Bag"],
      },
      {
        title: "Handbags",
        inner: ["Clutch", "Shoulder Bag", "Tote Bag"],
      },
    ],
  },
  {
    title: "Footwear",
    icon: FaShoePrints,
    submenus: [
      {
        title: "Men",
        inner: ["Sneakers", "Formal Shoes", "Sandals"],
      },
      {
        title: "Women",
        inner: ["Heels", "Flats", "Boots"],
      },
    ],
  },
  {
    title: "Groceries",
    icon: FaAppleAlt,
    submenus: [
      {
        title: "Fruits",
        inner: ["Apple", "Banana", "Orange", "Berries"],
      },
      {
        title: "Vegetables",
        inner: ["Carrot", "Tomato", "Spinach", "Potato"],
      },
      {
        title: "Beverages",
        inner: ["Juice", "Milk", "Coffee", "Tea"],
      },
    ],
  },
  {
    title: "Beauty",
    icon: FaHeart,
    submenus: [
      {
        title: "Skincare",
        inner: ["Creams", "Serums", "Masks"],
      },
      {
        title: "Makeup",
        inner: ["Lipstick", "Foundation", "Mascara"],
      },
    ],
  },
  {
    title: "Jewellery",
    icon: FaGem,
    submenus: [
      {
        title: "Rings",
        inner: ["Gold Rings", "Silver Rings", "Diamond Rings"],
      },
      {
        title: "Necklaces",
        inner: ["Gold Necklaces", "Silver Necklaces", "Pearl Necklaces"],
      },
    ],
  },
];

function CategoryPanel({ openCategoryPanel, isOpenCatPanel }) {
  // Track open submenu and inner submenu
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [openInnerIndex, setOpenInnerIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    setOpenInnerIndex(null); // close inner when switching submenu
  };

  const toggleInner = (index) => {
    setOpenInnerIndex(openInnerIndex === index ? null : index);
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
          {categoriesData.map((category, catIndex) => (
            <li key={catIndex} className="list-none relative">
              <Link className="w-full" to="/">
                <Button className="w-full !justify-start !px-3 !py-3 !text-black">
                  {category.icon && (
                    <category.icon className="mr-2 text-[18px]" />
                  )}
                  {category.title}
                </Button>
              </Link>

              {/* Toggle Icon */}
              {openSubmenuIndex === catIndex ? (
                <FaRegSquareMinus
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => toggleSubmenu(catIndex)}
                />
              ) : (
                <FaRegPlusSquare
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => toggleSubmenu(catIndex)}
                />
              )}

              {/* Submenus */}
              {openSubmenuIndex === catIndex && (
                <ul className="submenu w-full pl-3">
                  {category.submenus.map((submenu, subIndex) => (
                    <li key={subIndex} className="list-none relative">
                      <Link className="w-full" to="/">
                        <Button className="w-full !justify-start !px-3 !text-black">
                          {submenu.title}
                        </Button>
                      </Link>

                      {/* Inner toggle */}
                      {openInnerIndex === subIndex ? (
                        <FaRegSquareMinus
                          className="absolute top-[10px] right-[15px] cursor-pointer"
                          onClick={() => toggleInner(subIndex)}
                        />
                      ) : (
                        <FaRegPlusSquare
                          className="absolute top-[10px] right-[15px] cursor-pointer"
                          onClick={() => toggleInner(subIndex)}
                        />
                      )}

                      {/* Inner submenu items */}
                      {openInnerIndex === subIndex && (
                        <ul className="inner-submenu w-full pl-3 transition text-[14px] font-[500]">
                          {submenu.inner.map((item, innerIndex) => (
                            <li
                              key={innerIndex}
                              className="list-none relative py-2"
                            >
                              <Link
                                to="/"
                                className="link w-full !justify-start !px-3"
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
          ))}
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
