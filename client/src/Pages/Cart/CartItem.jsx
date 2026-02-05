import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import ColorMenu from "./ColorMenu";
import SizeMenu from "./SizeMenu";

function CartItem({ order, context, menuState, openMenu, closeMenu }) {
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

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 shadow rounded mb-2 relative bg-white">
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
        <Rating size="small" className="mb-1" value={order.rating} />

        <div className="flex gap-3 mt-1">
          <ColorMenu
            order={order}
            menuState={menuState}
            openMenu={openMenu}
            closeMenu={closeMenu}
            getBgClass={getBgClass}
            context={context}
          />
          <SizeMenu
            order={order}
            menuState={menuState}
            openMenu={openMenu}
            closeMenu={closeMenu}
            context={context}
          />
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-[600]">Qty :</span>
            <div className="flex items-center border border-black rounded overflow-hidden h-[30px]">
              <button
                onClick={() => context.orders.reduce(order)}
                className="w-[28px] h-full flex items-center justify-center hover:bg-gray-100"
              >
                <FaMinus size={10} />
              </button>
              <span className="w-[30px] h-full flex items-center justify-center text-[13px] font-[600]">
                {order.qty}
              </span>
              <button
                onClick={() => context.orders.addOnly(order)}
                className="w-[28px] h-full flex items-center justify-center hover:bg-gray-100"
              >
                <FaPlus size={10} />
              </button>
            </div>
          </div>
        </div>

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
                ((order.oldPrice - order.newPrice) / order.oldPrice) * 100,
              )}
              % OFF
            </span>
          </div>
        </div>

        <div
          onClick={() => context.orders.delete(order)}
          className="absolute right-2 close flex items-center justify-center w-[30px] h-[30px] rounded-full text-white bg-primary"
        >
          <IoClose size={20} />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
