// ==================== Sidebar Component ====================

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import "./style.css";

function Sidebar() {
  const [isOpened, setIsOpened] = useState({
    category: true,
    availability: true,
    size: true,
  });

  return (
    <>
      <aside className="flex flex-col gap-4 sidebar w-full h-full shadow-md rounded-md p-3 py-5">
        {/* ==================== Shop By Categories ==================== */}
        <div className="box">
          <h3 className="flex items-center justify-between text-[16px] font-[600]">
            Shop By Categories
            <Button
              onClick={() =>
                setIsOpened({ ...isOpened, category: !isOpened.category })
              }
              disableRipple
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded flex items-center justify-center hover:!bg-primary hover:!text-white"
            >
              {isOpened.category ? <FaAngleUp /> : <FaAngleDown />}
            </Button>
          </h3>
          <Collapse isOpened={isOpened.category}>
            <div className="scroll py-1 px-2 relative -left-[5px]">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Fashion"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Electronics"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Bags"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Footwear"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Groceries"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Beauty"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Wellness"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Jewellery"
                className="w-full"
              />
            </div>
          </Collapse>
        </div>

        {/* ==================== Availability ==================== */}
        <div className="box">
          <h3 className="flex items-center justify-between text-[16px] font-[600]">
            Availability
            <Button
              onClick={() =>
                setIsOpened({
                  ...isOpened,
                  availability: !isOpened.availability,
                })
              }
              disableRipple
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded flex items-center justify-center hover:!bg-primary hover:!text-white"
            >
              {isOpened.availability ? <FaAngleUp /> : <FaAngleDown />}
            </Button>
          </h3>
          <Collapse isOpened={isOpened.availability}>
            <div className="scroll py-1 px-2 relative -left-[5px]">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Available (17)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="In-Stock (20)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Not Available (200)"
                className="w-full"
              />
            </div>
          </Collapse>
        </div>

        {/* ==================== Size ==================== */}
        <div className="box">
          <h3 className="flex items-center justify-between text-[16px] font-[600]">
            Size
            <Button
              onClick={() => setIsOpened({ ...isOpened, size: !isOpened.size })}
              disableRipple
              className="!w-[30px] !h-[30px] !min-w-[30px] !rounded flex items-center justify-center hover:!bg-primary hover:!text-white"
            >
              {isOpened.size ? <FaAngleUp /> : <FaAngleDown />}
            </Button>
          </h3>
          <Collapse isOpened={isOpened.size}>
            <div className="scroll py-1 px-2 relative -left-[5px]">
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Small (16)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Medium (16)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Large (86)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="XL (50)"
                className="w-full"
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="XXL (40)"
                className="w-full"
              />
            </div>
          </Collapse>
        </div>

        {/* ==================== Filter By Price ==================== */}
        <div className="box">
          <h3 className="flex items-center justify-between text-[16px] font-[600] mb-3">
            Filter By Price
          </h3>
          <RangeSlider />
          <div className="flex pt-4 pb-2 justify-between">
            <span className="text-[13px]">
              from : <strong>100$</strong>
            </span>
            <span className="text-[13px]">
              to : <strong>5000$</strong>
            </span>
          </div>
        </div>

        {/* ==================== Filter By Rating ==================== */}
        <div className="box">
          <h3 className="flex items-center justify-between text-[16px] font-[600] mb-3">
            Filter By Rating
          </h3>
          <div className="w-full flex flex-col cursor-pointer">
            <Rating name="size-small" defaultValue={5} size="small" readOnly />
            <Rating name="size-small" defaultValue={4} size="small" readOnly />
            <Rating name="size-small" defaultValue={3} size="small" readOnly />
            <Rating name="size-small" defaultValue={2} size="small" readOnly />
            <Rating name="size-small" defaultValue={1} size="small" readOnly />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
