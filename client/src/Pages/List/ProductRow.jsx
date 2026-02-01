import { Button, MenuItem } from "@mui/material";
import StyledMenu from "./StyledMenu";

function ProductRow({ product, menuState, openMenu, closeMenu, open, updateColor, updateSize }) {
  const getBgClass = (color) => {
    const map = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      gray: "bg-gray-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      yellow: "bg-yellow-400",
      purple: "bg-purple-500",
    };
    return map[color?.toLowerCase()] || "bg-gray-300";
  };

  return (
    <div className="grid grid-cols-[80px_1fr_90px_80px_100px] items-center px-4 py-3 border-t text-[14px]">
      {/* Image */}
      <div className="w-[60px] h-[60px] rounded overflow-hidden">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Name */}
      <div className="leading-tight">
        <p className="font-[600] truncate">{product.name}</p>
        <p className="text-[12px] text-gray-500">{product.category}</p>
      </div>

      {/* Price */}
      <div className="font-[500]">${product.newPrice}</div>

      {/* Color */}
      <div>
        <Button
          variant="outlined"
          className="!min-w-[44px] !h-[34px] !p-0"
          onClick={(e) => openMenu(e, "color", product.id)}
        >
          <span className={`w-[18px] h-[18px] rounded ${getBgClass(product.selectedColor)}`} />
        </Button>

        <StyledMenu
          anchorEl={menuState.anchorEl}
          open={open && menuState.type === "color" && menuState.productId === product.id}
          onClose={closeMenu}
          PaperProps={{ sx: { minWidth: 44, padding: 0 } }}
        >
          {product.colors.map((color) => (
            <MenuItem
              key={color}
              className="!min-h-[36px]"
              onClick={() => {
                updateColor(product.id, color);
                closeMenu();
              }}
            >
              <span className={`w-[36px] h-[18px] rounded ${getBgClass(color)}`} />
            </MenuItem>
          ))}
        </StyledMenu>
      </div>

      {/* Size */}
      <div>
        <Button
          variant="outlined"
          className="!min-w-[90px] !h-[34px] !text-[13px]"
          onClick={(e) => openMenu(e, "size", product.id)}
        >
          {product.selectedSize}
        </Button>

        <StyledMenu
          anchorEl={menuState.anchorEl}
          open={open && menuState.type === "size" && menuState.productId === product.id}
          onClose={closeMenu}
          PaperProps={{ sx: { minWidth: 90, padding: 0 } }}
        >
          {product.sizes.map((size) => (
            <MenuItem
              key={size}
              className="!min-h-[36px]"
              onClick={() => {
                updateSize(product.id, size);
                closeMenu();
              }}
            >
              {size}
            </MenuItem>
          ))}
        </StyledMenu>
      </div>
    </div>
  );
}

export default ProductRow;
