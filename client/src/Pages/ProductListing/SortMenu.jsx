import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMdArrowDropdownCircle } from "react-icons/io";

export default function SortMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [content, setContent] = useState("Sales , Highest to Lowest");
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (e) => {
    setContent(e.target.textContent);
    handleClose();
  };

  return (
    <div className="col-2 flex items-center">
      <span className="text-[14px] font-[500] pr-3 text-primary">Sort by:</span>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-[14px] font-[500] !bg-white !text-primary shadow-sm !min-w-[193px] !justify-between"
        endIcon={<IoMdArrowDropdownCircle />}
      >
        {content}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { "aria-labelledby": "basic-button" },
        }}
      >
        {[
          "Sales , Highest to Lowest",
          "Relevance",
          "Name, A to Z",
          "Name, Z to A",
          "Price, High to Low",
          "Price, Low to High",
        ].map((item, index) => (
          <MenuItem
            key={index}
            className="!text-[14px] !font-[500]"
            onClick={handleItemClick}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
