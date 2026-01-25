import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { IoClose } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRegSquareMinus } from "react-icons/fa6";

/**
 * CategoryCollapse Component
 * --------------------------
 * Displays a collapsible category menu with nested submenus.
 * Supports expanding/collapsing main and inner submenus.
 */
function CategoryCollapse() {
  // State to track which submenu is open
  const [submenuIndex, setSubmenuIndex] = useState(null);

  // State to track which inner submenu is open
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  // Toggle main submenu
  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  // Toggle inner submenu
  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  return (
    <div className="scroll">
      <ul className="menu w-full">
        {/* ===========================
            Main Menu Item 0
        ============================ */}
        <li className="list-none relative">
          <Link className="w-full" to={"/"}>
            <Button className="w-full !justify-start !px-3 !text-black ">
              Fashion
            </Button>
          </Link>

          {/* Toggle Icon for Submenu */}
          {submenuIndex === 0 ? (
            <FaRegSquareMinus
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openSubmenu(0)}
            />
          ) : (
            <FaRegPlusSquare
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openSubmenu(0)}
            />
          )}

          {/* Submenu 0 */}
          {submenuIndex === 0 && (
            <ul className="submenu w-full pl-3 ">
              <li className="list-none relative">
                <Link className="w-full" to={"/"}>
                  <Button className="w-full !justify-start !px-3 !text-black ">
                    Apparel
                  </Button>
                </Link>

                {/* Toggle Icon for Inner Submenu */}
                {innerSubmenuIndex === 0 ? (
                  <FaRegSquareMinus
                    className="absolute top-[10px] right-[15px] cursor-pointer"
                    onClick={() => openInnerSubmenu(0)}
                  />
                ) : (
                  <FaRegPlusSquare
                    className="absolute top-[10px] right-[15px] cursor-pointer"
                    onClick={() => openInnerSubmenu(0)}
                  />
                )}

                {/* Inner Submenu 0 */}
                {innerSubmenuIndex === 0 && (
                  <ul className="inner-submenu w-full pl-3 transition text-[14px] font-[500]">
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Smart tablet
                      </Link>
                    </li>
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Crepe T-shirt
                      </Link>
                    </li>
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Leather Watch
                      </Link>
                    </li>
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Rolling Diamond
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* ===========================
            Main Menu Item 1 (Duplicate of 0)
        ============================ */}
        <li className="list-none relative">
          <Link className="w-full" to={"/"}>
            <Button className="w-full !justify-start !px-3 !text-black ">
              Fashion
            </Button>
          </Link>

          {/* Toggle Icon for Submenu */}
          {submenuIndex === 1 ? (
            <FaRegSquareMinus
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openSubmenu(1)}
            />
          ) : (
            <FaRegPlusSquare
              className="absolute top-[10px] right-[15px] cursor-pointer"
              onClick={() => openSubmenu(1)}
            />
          )}

          {/* Submenu 1 */}
          {submenuIndex === 1 && (
            <ul className="submenu w-full pl-3 ">
              <li className="list-none relative">
                <Link className="w-full" to={"/"}>
                  <Button className="w-full !justify-start !px-3 !text-black ">
                    Apparel
                  </Button>
                </Link>

                {/* Toggle Icon for Inner Submenu */}
                {innerSubmenuIndex === 1 ? (
                  <FaRegSquareMinus
                    className="absolute top-[10px] right-[15px] cursor-pointer"
                    onClick={() => openInnerSubmenu(1)}
                  />
                ) : (
                  <FaRegPlusSquare
                    className="absolute top-[10px] right-[15px] cursor-pointer"
                    onClick={() => openInnerSubmenu(1)}
                  />
                )}

                {/* Inner Submenu 1 */}
                {innerSubmenuIndex === 1 && (
                  <ul className="inner-submenu w-full pl-3 transition text-[14px] font-[500]">
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Smart tablet
                      </Link>
                    </li>
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Crepe T-shirt
                      </Link>
                    </li>
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Leather Watch
                      </Link>
                    </li>
                    <li className="list-none relative py-2">
                      <Link to="/" className="link w-full !justify-start !px-3">
                        Rolling Diamond
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default CategoryCollapse;
