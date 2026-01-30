import { Button } from "@mui/material";
import { RiMenu2Line, RiMenu3Line } from "react-icons/ri";
import { HeaderButtons } from "./HeaderButtons";
import "./style.css";

export function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white index50 ${
        sidebarOpen ? "pl-[270px]" : "pl-[100px]"
      } pr-7 flex items-center justify-between py-4 shadow-md`}
    >
      {/* LEFT */}
      <div className="part-1 flex items-center gap-2">
        <Button
          onClick={onToggleSidebar}
          className="!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-[rgba(0,0,0,0.7)] !shadow-md flex items-center justify-center"
        >
          {sidebarOpen ? <RiMenu3Line size={18} /> : <RiMenu2Line size={18} />}
        </Button>
      </div>

      {/* RIGHT */}
      <HeaderButtons />
    </header>
  );
}
