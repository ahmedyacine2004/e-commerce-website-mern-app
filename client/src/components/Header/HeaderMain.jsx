import { Link } from "react-router-dom";
import Search from "../Search";
import HeaderActions from "./HeaderActions";

function HeaderMain() {
  return (
    <div className="header py-4 border-b-2 border-gray-300">
      <div className="container flex items-center justify-between">
        <div className="w-[25%]">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="w-[222px]" />
          </Link>
        </div>

        <div className="w-[45%]">
          <Search />
        </div>

        <div className="w-[40%]">
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
