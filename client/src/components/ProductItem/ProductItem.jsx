import { useNavigate } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

import "./style.css";

function ProductItem({ product }) {
  const navigate = useNavigate();

  const goToProductDetails = () => {
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div className="productItem rounded-md overflow-hidden border-[1px] bg-[#f1f1f1] shadow-lg border-primary">
      <ProductImage product={product} onNavigate={goToProductDetails} />
      <ProductInfo product={product} />
    </div>
  );
}

export default ProductItem;
