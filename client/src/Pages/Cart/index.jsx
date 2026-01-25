import { useContext, useState } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import Rating from "@mui/material/Rating";

// ==================== Menu ====================
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// TODO: READ THIS AI GENERATED CODE AGAIN AND LEARN FROM IT
// ==================== STYLED MENU BY MUI (Customized version) ====================
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
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

function Cart() {
  // ==================== MENUS STATE ====================
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    type: null, // "color" | "size"
    orderId: null,
  });

  const open = Boolean(menuState.anchorEl);

  const openMenu = (e, type, orderId) => {
    setMenuState({
      anchorEl: e.currentTarget,
      type,
      orderId,
    });
  };

  const closeMenu = () => {
    setMenuState({
      anchorEl: null,
      type: null,
      orderId: null,
    });
  };

  // ==================== Map color names to Tailwind classes ====================
  const getBgClass = (color) => {
    const map = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      gray: "bg-gray-500",
      "heather gray": "bg-gray-400",
      red: "bg-red-500",
      yellow: "bg-yellow-400",
      blue: "bg-blue-500",
      "navy blue": "bg-blue-900",
      green: "bg-green-500",
      "light gray": "bg-gray-300",
    };
    return map[color.toLowerCase()] || "bg-gray-300";
  };

  // ==================== Contexts ====================
  const context = useContext(DrawerContext);
  const orders = context.orders.list;
  const totalQty = orders.reduce((sum, order) => sum + (order.qty || 0), 0);

  return (
    <section className="section pt-5">
      <Stack spacing={2} className="container pb-5">
        <Breadcrumbs separator={"|"} aria-label="breadcrumb">
          <Link key="1" color="inherit" to="/" className="link">
            Home
          </Link>
          <Typography
            key="3"
            sx={{ color: "text.primary" }}
            className="link cursor-pointer"
          >
            Cart
          </Typography>
        </Breadcrumbs>
      </Stack>
      <div className="w-full bg-white pb-5">
        <div className="container flex gap-4 w-[80%] max-w-[80%]">
          <div className="leftPart w-[70%] py-3">
            <div className="shadow-md rounded-md p-5 bg-[#f1f1f1] mt-2">
              <h2 className="text-[18px] font-[600]">Your Cart</h2>
              <p className="text-[14px] mb-4">
                There are{" "}
                <span className="font-bold text-primary ">{totalQty}</span>{" "}
                products in your Cart
              </p>
              {orders.length === 0 ? (
                <span>No Product in the Cart</span>
              ) : (
                orders.map((order, index) => {
                  return (
                    <div
                      key={index}
                      className="cartItem w-full p-3 flex items-center gap-4 shadow rounded mb-2 relative bg-white"
                    >
                      {/* Discount Badge */}
                      <div className="imageWrapper shadow-md w-[10%] h-[100px] overflow-hidden rounded group">
                        <Link
                          to={`/product-details/${order.id}`}
                          className="block w-full h-full"
                        >
                          <img
                            src={order.img}
                            alt={order.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                          />
                        </Link>
                      </div>
                      <div className="info w-[90%] flex flex-col px-3">
                        <span className="text-[14px]">{order.category}</span>
                        <Link to={`/product-details/${order.id}`}>
                          <span className="text-[16px] link font-[600] cursor-pointer">
                            {order.name}
                          </span>
                        </Link>
                        <Rating size="small" className="mb-1" value={order.rating}/>
                        {/* // TODO: READ THIS AI GENERATED CODE AGAIN AND LEARN
                        FROM IT */}
                        <div className="flex gap-3 mt-1">
                          {/* color */}
                          <div className="color flex items-center">
                            <Button
                              variant="outlined"
                              onClick={(e) => openMenu(e, "color", order.id)}
                              className="!min-w-[60px] !border-black !p-2"
                              endIcon={
                                <TbTriangleInvertedFilled
                                  size={8}
                                  className="text-black"
                                />
                              }
                            >
                              <span
                                className={`w-[28px] h-[18px] rounded ${getBgClass(
                                  order.selectedColor,
                                )}`}
                              />
                            </Button>

                            <StyledMenu
                              anchorEl={menuState.anchorEl}
                              open={
                                open &&
                                menuState.type === "color" &&
                                menuState.orderId === order.id
                              }
                              slotProps={{
                                paper: {
                                  sx: {
                                    width: menuState.anchorEl?.clientWidth,
                                  },
                                },
                              }}
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
                                    className={`w-[50px] h-[30px] rounded ${getBgClass(color)} ${
                                      color === order.selectedColor
                                        ? "ring-2 ring-primary"
                                        : ""
                                    }`}
                                  />
                                </MenuItem>
                              ))}
                            </StyledMenu>
                          </div>
                          {/* size */}
                          <div className="size flex items-center">
                            <Button
                              variant="outlined"
                              onClick={(e) => openMenu(e, "size", order.id)}
                              className="!min-w-[100px] !text-black !border-black font-[600]"
                              endIcon={
                                <TbTriangleInvertedFilled
                                  size={8}
                                  className="text-black"
                                />
                              }
                            >
                              {order.selectedSize}
                            </Button>

                            <StyledMenu
                              anchorEl={menuState.anchorEl}
                              open={
                                open &&
                                menuState.type === "size" &&
                                menuState.orderId === order.id
                              }
                              slotProps={{
                                paper: {
                                  sx: {
                                    width: menuState.anchorEl?.clientWidth,
                                  },
                                },
                              }}
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
                                      size === order.selectedSize
                                        ? "border-primary text-primary"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {size}
                                  </span>
                                </MenuItem>
                              ))}
                            </StyledMenu>
                          </div>
                          {/* qty */}
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-[600]">
                              Qty :
                            </span>
                            <div className="flex items-center border border-black rounded overflow-hidden h-[30px]">
                              {/* Minus */}
                              <button
                                onClick={() => context.orders.reduce(order)}
                                className="w-[28px] h-full flex items-center justify-center hover:bg-gray-100"
                              >
                                <FaMinus size={10} />
                              </button>

                              {/* Qty */}
                              <span className="w-[30px] h-full flex items-center justify-center text-[13px] font-[600]">
                                {order.qty}
                              </span>

                              {/* Plus */}
                              <button
                                onClick={() => context.orders.addOnly(order)}
                                className="w-[28px] h-full flex items-center justify-center hover:bg-gray-100"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Price */}
                        <div className="flex items-baseline py-2">
                          <h5 className="text-[14px] font-[400] line-through text-gray-500 mr-2">
                            ${order.oldPrice}
                          </h5>
                          <span className="text-[16px] font-[600] mt-1 text-primary mr-2">
                            ${order.newPrice}
                          </span>
                          <div className="flex items-center justify-center">
                            <span className="discount text-[10px] bg-red-500 text-white font-[600] px-2 py-1 rounded-md">
                              {Math.round(
                                ((order.oldPrice - order.newPrice) /
                                  order.oldPrice) *
                                  100,
                              )}
                              % OFF
                            </span>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            context.orders.delete(order);
                          }}
                          className="absolute right-2 close flex items-center justify-center w-[30px] h-[30px] rounded-full text-white bg-primary"
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="rightPart w-[30%] py-3">
            <div className="shadow-md rounded-md bg-[#f1f1f1] p-5 mt-2 lg:min-h-[430px]">
              <h2 className="text-[18px] font-[600]">Cart Totals</h2>
              <hr className="my-2" />

              {/* Items */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[14px] text-gray-600">Items</span>
                <span className="text-[14px] font-[600]">
                  {orders.reduce((sum, o) => sum + o.qty, 0)}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[14px] text-gray-600">Subtotal</span>
                <span className="text-[14px] font-[600]">
                  ${orders.reduce((sum, o) => sum + o.newPrice * o.qty, 0)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[14px] text-gray-600">Shipping</span>
                <span className="text-[14px] font-[600]">
                  ${orders.reduce((sum, o) => sum + o.shipPerUnit * o.qty, 0)}
                </span>
              </div>

              {/* Savings */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[14px] text-green-600">You Save</span>
                <span className="text-[14px] font-[600] text-green-600">
                  -$
                  {orders.reduce(
                    (sum, o) => sum + (o.oldPrice - o.newPrice) * o.qty,
                    0,
                  )}
                </span>
              </div>

              <hr className="my-4" />

              {/* Tax */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[14px] text-gray-600">Tax (10%)</span>
                <span className="text-[14px] font-[600]">
                  $
                  {(() => {
                    const base = orders.reduce(
                      (sum, o) =>
                        sum + o.newPrice * o.qty + o.shipPerUnit * o.qty,
                      0,
                    );
                    return (base * 0.1).toFixed(2);
                  })()}
                </span>
              </div>

              <hr className="my-3" />

              {/* Total */}
              <div className="flex items-center justify-between py-2 mt-1">
                <span className="text-[15px] font-[600]">Total</span>
                <span className="text-[16px] font-[700] text-primary">
                  $
                  {(() => {
                    const base = orders.reduce(
                      (sum, o) =>
                        sum + o.newPrice * o.qty + o.shipPerUnit * o.qty,
                      0,
                    );
                    return (base + base * 0.1).toFixed(2);
                  })()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-3">
                <Link to="/checkout">
                  <Button
                    endIcon={<BsFillBagCheckFill size={16} />}
                    className="!w-full !py-2 !bg-primary !text-white !font-[600]"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/">
                  <button className="w-full text-[14px] py-2 rounded border border-primary text-primary font-[600]">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
