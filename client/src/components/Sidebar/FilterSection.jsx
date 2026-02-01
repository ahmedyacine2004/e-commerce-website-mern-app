import { Collapse } from "react-collapse";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

function FilterSection({ title, isOpened, toggle, children }) {
  return (
    <div className="box">
      <h3 className="flex items-center justify-between text-[16px] font-[600]">
        {title}
        <Button
          onClick={toggle}
          disableRipple
          className="!w-[30px] !h-[30px] !min-w-[30px] !rounded flex items-center justify-center hover:!bg-primary hover:!text-white"
        >
          {isOpened ? <FaAngleUp /> : <FaAngleDown />}
        </Button>
      </h3>
      <Collapse isOpened={isOpened}>{children}</Collapse>
    </div>
  );
}

export default FilterSection;
