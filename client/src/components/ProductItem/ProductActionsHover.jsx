import { useContext } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { RiShareCircleLine } from "react-icons/ri";

import ModalContext from "../../Contexts/ModalContext";

const ActionButton = ({ title, children, onClick }) => (
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

function ProductActionsHover({ product }) {
  const { handleClickOpenProductDetailsModal } = useContext(ModalContext);

  return (
    <div className="actions absolute top-[-70%] right-2 group-hover:top-2 flex flex-col gap-2 transition-all">
      <ActionButton title="Add to Wishlist">
        <FaRegHeart />
      </ActionButton>

      <ActionButton title="Compare">
        <IoGitCompareOutline />
      </ActionButton>

      <ActionButton
        title="Zoom"
        onClick={() => {
          handleClickOpenProductDetailsModal(product);
        }}
      >
        <MdOutlineZoomOutMap />
      </ActionButton>

      <ActionButton title="Share">
        <RiShareCircleLine />
      </ActionButton>
    </div>
  );
}

export default ProductActionsHover;
