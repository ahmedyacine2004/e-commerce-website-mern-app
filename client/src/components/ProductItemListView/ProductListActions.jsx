import { useContext } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { RiShareCircleLine } from "react-icons/ri";

import ModalContext from "../../Contexts/ModalContext";

const ActionBtn = ({ title, children, onClick }) => (
  <Tooltip
    title={title}
    placement="left"
    arrow
    slotProps={{
      popper: {
        modifiers: [{ name: "offset", options: { offset: [0, -14] } }],
      },
    }}
  >
    <Button
      onClick={onClick}
      className="!min-w-8 !min-h-8 !p-1 !bg-white !text-primary !rounded-full !shadow-md hover:!bg-primary hover:!text-white transition-all"
    >
      {children}
    </Button>
  </Tooltip>
);

function ProductListActions({ product }) {
  const { handleClickOpenProductDetailsModal } =
    useContext(ModalContext);

  return (
    <div className="actions absolute top-[-70%] right-2 group-hover:top-2 flex flex-col gap-2 transition-all">
      <ActionBtn title="Add to Wishlist">
        <FaRegHeart />
      </ActionBtn>

      <ActionBtn title="Compare">
        <IoGitCompareOutline />
      </ActionBtn>

      <ActionBtn
        title="Zoom"
        onClick={() => handleClickOpenProductDetailsModal(product)}
      >
        <MdOutlineZoomOutMap />
      </ActionBtn>

      <ActionBtn title="Share">
        <RiShareCircleLine />
      </ActionBtn>
    </div>
  );
}

export default ProductListActions;
