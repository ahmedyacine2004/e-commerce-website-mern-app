import { useContext, useState } from "react";
import DrawerContext from "../../Contexts/DrawerContext";
import UserContext from "../../Contexts/UserContext";
import { Button } from "@mui/material";
import ProfileSidebar from "../../components/ProfileSidebar";
import { useList } from "../../Contexts/ListContext";
import ProductRow from "./ProductRow";

function ProductList() {
  const { orders } = useContext(DrawerContext);
  const { user, logout } = useContext(UserContext);
  const { products, updateColor, updateSize, clearList } = useList();

  const [menuState, setMenuState] = useState({ anchorEl: null, type: null, productId: null });
  const open = Boolean(menuState.anchorEl);

  const openMenu = (e, type, productId) => setMenuState({ anchorEl: e.currentTarget, type, productId });
  const closeMenu = () => setMenuState({ anchorEl: null, type: null, productId: null });

  const addAllToCart = () => {
    products.forEach((product) => {
      orders.addAndOpen(
        { id: product.id, info: product, img: { url1: product.img } },
        { amount: product.qty, color: product.selectedColor, size: product.selectedSize, category: product.category },
      );
    });
    clearList();
  };

  return (
    <section className="p-8 w-full">
      <div className="container flex gap-5">
        <div className="col-1 w-[20%]">
          <ProfileSidebar user={user} activeTab="list" logout={logout} isPfpEdit={false} />
        </div>

        <div className="col-2 w-[80%]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-[600]">My List</h2>
            <Button variant="contained" className="!bg-primary !font-[600]" onClick={addAllToCart}>
              Add All to Cart
            </Button>
          </div>

          <div className="w-full bg-white border rounded-md overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_90px_80px_100px] px-4 py-2 bg-gray-100 text-[13px] font-[600] text-gray-600">
              <div>Item</div>
              <div>Name</div>
              <div>Price</div>
              <div>Color</div>
              <div>Size</div>
            </div>

            {products.length === 0 ? (
              <div className="py-10 text-center text-[14px] text-gray-500">No products available.</div>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  menuState={menuState}
                  openMenu={openMenu}
                  closeMenu={closeMenu}
                  open={open}
                  updateColor={updateColor}
                  updateSize={updateSize}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
