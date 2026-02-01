import { Button, MenuItem } from "@mui/material";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import StyledMenu from "./StyledMenu";

function ColorMenu({ order, menuState, openMenu, closeMenu, getBgClass, context }) {
  const open = Boolean(menuState.anchorEl);

  return (
    <div className="color flex items-center">
      <Button
        variant="outlined"
        onClick={(e) => openMenu(e, "color", order.id)}
        className="!min-w-[60px] !border-black !p-2"
        endIcon={<TbTriangleInvertedFilled size={8} className="text-black" />}
      >
        <span className={`w-[28px] h-[18px] rounded ${getBgClass(order.selectedColor)}`} />
      </Button>

      <StyledMenu
        anchorEl={menuState.anchorEl}
        open={open && menuState.type === "color" && menuState.orderId === order.id}
        slotProps={{ paper: { sx: { width: menuState.anchorEl?.clientWidth } } }}
        onClose={closeMenu}
      >
        {order.colors.map((color, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              context.orders.updateColor(order.id, color);
              closeMenu();
            }}
          >
            <span
              className={`w-[50px] h-[30px] rounded ${getBgClass(color)} ${color === order.selectedColor ? "ring-2 ring-primary" : ""}`}
            />
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

export default ColorMenu;
