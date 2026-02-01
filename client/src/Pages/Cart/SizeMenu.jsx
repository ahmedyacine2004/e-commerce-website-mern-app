import { Button, MenuItem } from "@mui/material";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import StyledMenu from "./StyledMenu";

function SizeMenu({ order, menuState, openMenu, closeMenu, context }) {
  const open = Boolean(menuState.anchorEl);

  return (
    <div className="size flex items-center">
      <Button
        variant="outlined"
        onClick={(e) => openMenu(e, "size", order.id)}
        className="!min-w-[100px] !text-black !border-black font-[600]"
        endIcon={<TbTriangleInvertedFilled size={8} className="text-black" />}
      >
        {order.selectedSize}
      </Button>

      <StyledMenu
        anchorEl={menuState.anchorEl}
        open={open && menuState.type === "size" && menuState.orderId === order.id}
        slotProps={{ paper: { sx: { width: menuState.anchorEl?.clientWidth } } }}
        onClose={closeMenu}
      >
        {order.sizes.map((size, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              context.orders.updateSize(order.id, size);
              closeMenu();
            }}
          >
            <span
              className={`w-full text-center py-2 border rounded font-[600] ${
                size === order.selectedSize ? "border-primary text-primary" : "border-gray-300"
              }`}
            >
              {size}
            </span>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

export default SizeMenu;
