import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

function HeaderTop() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="top-strip py-2 border-t-1 border-b-2 border-gray-100">
      <div className="container flex items-center justify-between">
        <p className="text-[12px] font-[500]">
          Get up to 50% off new season styles, limited time only
        </p>

        <ul className="flex items-center gap-3">
          <li>
            <Link to="/help-center" className="text-[13px] link">
              Help center
            </Link>
          </li>
          <li>
            <Link to="/order-tracking" className="text-[13px] link">
              Order Tracking
            </Link>
          </li>
          <li>
            <Button
              className={`!rounded-full !w-[35px] !h-[35px] ${
                theme === "light"
                  ? "!bg-white !text-black !border !border-black"
                  : "!bg-black !text-white"
              }`}
              onClick={toggleTheme}
            >
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderTop;
