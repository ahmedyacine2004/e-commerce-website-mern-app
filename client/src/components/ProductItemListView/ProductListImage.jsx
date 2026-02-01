import { Link } from "react-router-dom";
import ProductListActions from "./ProductListActions";

function ProductListImage({ product }) {
  return (
    <div className="group imgWrapper !w-[30%] rounded-md overflow-hidden relative">
      <Link to="/">
        <div className="img !w-full overflow-hidden">
          <img
            src={product.img.url1}
            alt={product.alt}
            className="w-full object-cover group-hover:opacity-0"
          />
          <img
            src={product.img.url2}
            alt={product.alt}
            className="w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
          />
        </div>
      </Link>

      {/* Discount */}
      <div className="absolute top-2 left-2">
        <span className="discount text-[10px] bg-red-500 text-white font-[600] px-2 py-1 rounded-md">
          {product.info.discountAmount}$ OFF
        </span>
      </div>

      <ProductListActions product={product} />
    </div>
  );
}

export default ProductListImage;
