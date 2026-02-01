import ProductListImage from "./ProductListImage";
import ProductListInfo from "./ProductListInfo";

import "./style.css";

function ProductItemListView({ product }) {
  return (
    <div className="ProductItemListView rounded-md overflow-hidden border-[1px] bg-[#f1f1f1] shadow-lg border-primary flex items-center">
      <ProductListImage product={product} />
      <ProductListInfo product={product} />
    </div>
  );
}

export default ProductItemListView;
