import { useContext, useState } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import { Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../../Contexts/UserContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import { useList } from "../../Contexts/ListContext";

// ==================== Styled MUI Menu ====================
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    transformOrigin={{ vertical: "top", horizontal: "left" }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    padding: "8px",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",

    "& .MuiMenu-list": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: 0,
    },

    "& .MuiMenuItem-root": {
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,

      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    },
  },
}));

function ProductList() {
  const { orders } = useContext(DrawerContext);
  const { user, logout } = useContext(UserContext);
  const { products, updateColor, updateSize, clearList } = useList();

  // ==================== Menu State ====================
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    type: null,
    productId: null,
  });

  const open = Boolean(menuState.anchorEl);

  const openMenu = (e, type, productId) => {
    setMenuState({
      anchorEl: e.currentTarget,
      type,
      productId,
    });
  };

  const closeMenu = () => {
    setMenuState({
      anchorEl: null,
      type: null,
      productId: null,
    });
  };

  // ==================== Color Map ====================
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

  // ==================== Add All to Cart ====================
  const addAllToCart = () => {
    products.forEach((product) => {
      orders.addAndOpen(
        {
          id: product.id,
          info: product,
          img: { url1: product.img },
        },
        {
          amount: product.qty,
          color: product.selectedColor,
          size: product.selectedSize,
          category: product.category,
        },
      );
    });

    // ⭐ THIS LINE clears the list
    clearList();
  };

  return (
    <section className="p-8 w-full">
      <div className="container flex gap-5">
        {/* Sidebar */}
        <div className="col-1 w-[20%]">
          <ProfileSidebar
            user={user}
            activeTab="list"
            logout={logout}
            isPfpEdit={false}
          />
        </div>

        {/* List */}
        <div className="col-2 w-[80%]">
          {/* Header of the right side */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-[600]">My List</h2>
            <Button
              variant="contained"
              className="!bg-primary !font-[600]"
              onClick={addAllToCart}
            >
              Add All to Cart
            </Button>
          </div>
          {/* List of products */}
          <div className="w-full bg-white border rounded-md overflow-hidden">
            {/* Header of the list */}
            <div className="grid grid-cols-[80px_1fr_90px_80px_100px] px-4 py-2 bg-gray-100 text-[13px] font-[600] text-gray-600">
              <div>Item</div>
              <div>Name</div>
              <div>Price</div>
              <div>Color</div>
              <div>Size</div>
            </div>

            {/* Rows */}
            {products.length === 0 ? (
              <div className="py-10 text-center text-[14px] text-gray-500">
                No products available.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[80px_1fr_90px_80px_100px] items-center px-4 py-3 border-t text-[14px]"
                >
                  {/* Image */}
                  <div className="w-[60px] h-[60px] rounded overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <div className="leading-tight">
                    <p className="font-[600] truncate">{product.name}</p>
                    <p className="text-[12px] text-gray-500">
                      {product.category}
                    </p>
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
                      <span
                        className={`w-[18px] h-[18px] rounded ${getBgClass(
                          product.selectedColor,
                        )}`}
                      />
                    </Button>

                    <StyledMenu
                      anchorEl={menuState.anchorEl}
                      open={
                        open &&
                        menuState.type === "color" &&
                        menuState.productId === product.id
                      }
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
                          <span
                            className={`w-[36px] h-[18px] rounded ${getBgClass(
                              color,
                            )}`}
                          />
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
                      open={
                        open &&
                        menuState.type === "size" &&
                        menuState.productId === product.id
                      }
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
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
