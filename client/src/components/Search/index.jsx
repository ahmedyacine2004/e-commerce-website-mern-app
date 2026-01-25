// ==================== Search Component ====================

import "./style.css";
import { Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";

function Search() {
  return (
    <>
      {/* ==================== Search Box Container ==================== */}
      <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
        {/* ==================== Input Field ==================== */}
        <input
          type="text"
          placeholder="search for products ..."
          className="w-full h-[35px] text-[15px] focus:outline-none bg-inherit p-2"
        />

        {/* ==================== Search Button ==================== */}
        <Button className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black">
          <IoSearch className="text-[#353535] text-[22px]" />
        </Button>
      </div>
    </>
  );
}

export default Search;
