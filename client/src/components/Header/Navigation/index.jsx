import { Button } from "@mui/material";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoRocketSharp } from "react-icons/io5";
import CategoryPanel from "./CategoryPanel";
import { useState } from "react";
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

          {/* ==================== MIDDLE PART ==================== */}
          <div className="col-2 w-[60%]">
            <ul className="flex items-center gap-1 nav">
              <li className="list-none text-[14px]">
                <Link to="/" className="link transition">
                  <Button className="!font-[400] !text-[rgba(0,0,0,0.8)] hover:!text-[#2300bd]">
                    Home
                  </Button>
                </Link>
              </li>

              <li className="list-none text-[14px] relative">
                <Link to="/product-listing">
                  <Button className="!font-[400] !text-[rgba(0,0,0,0.8)] hover:!text-[#2300bd]">
                    Fashion
                  </Button>
                </Link>

                {/* ==================== SUBMENU ==================== */}
                <div className="submenu absolute top-full left-0 min-w-[150px] bg-white shadow-md">
                  <ul>
                    <li className="list-none relative">
                      <Link to="/">
                        <Button className="w-full !text-left !justify-start !rounded-none !text-black">
                          Men
                        </Button>
                      </Link>

                      {/* ==================== INNER SUBMENU ==================== */}
                      <div className="submenu absolute top-0 left-full min-w-[150px] bg-white shadow-md">
                        <ul>
                          {[
                            "T-shirt",
                            "Jeans",
                            "Footwear",
                            "Watch",
                            "Pants",
                          ].map((item) => (
                            <li key={item}>
                              <Link to="/">
                                <Button className="w-full !text-left !justify-start !rounded-none !text-black">
                                  {item}
                                </Button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>

                    {["Women", "Kids", "Girls", "Boys"].map((item) => (
                      <li key={item}>
                        <Link to="/">
                          <Button className="w-full !text-left !justify-start !rounded-none !text-black">
                            {item}
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {[
                "Electronics",
                "Bags",
                "Footwear",
                "Groceries",
                "Beauty",
                "Wellness",
                "Jewellery",
              ].map((item) => (
                <li key={item} className="list-none text-[14px]">
                  <Link to="/">
                    <Button className="!font-[400] !text-[rgba(0,0,0,0.8)] hover:!text-[#2300bd]">
                      {item}
                    </Button>
                  </Link>
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
