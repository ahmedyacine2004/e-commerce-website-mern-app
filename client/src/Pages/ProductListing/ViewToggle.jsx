import Button from "@mui/material/Button";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";

export default function ViewToggle({ itemView, setItemView, totalProducts }) {
  return (
    <div className="col-1 flex items-center gap-2">
      <Button
        onClick={() => setItemView("grid")}
        className={`!w-[35px] !h-[35[px] !min-w-[35px] !rounded !text-primary ${
          itemView === "grid" && "active"
        }`}
      >
        <IoGrid className="text-[25px]" />
      </Button>
      <Button
        onClick={() => setItemView("list")}
        className={`!w-[35px] !h-[35[px] !min-w-[35px] !rounded !text-primary ${
          itemView === "list" && "active"
        }`}
      >
        <FaThList className="text-[25px]" />
      </Button>
      <span className="text-[14px] font-[500] pl-3 text-primary">
        There are {totalProducts} Products
      </span>
    </div>
  );
}
