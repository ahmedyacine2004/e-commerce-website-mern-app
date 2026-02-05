import ProductActionsHover from "./ProductActionsHover";

function ProductImage({ product, onNavigate }) {
  return (
    <div className="group imgWrapper w-full rounded-md overflow-hidden relative">
      {/* Images */}
      <div className="img h-[220px] overflow-hidden" onClick={onNavigate}>
        <img
          src={product.media[0]}
          alt={product.additionalInfo.alt}
          className="w-full object-cover group-hover:opacity-0"
        />
        <img
          src={product.media[1]}
          alt={product.additionalInfo.alt}
          className="w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
        />
      </div>

      {/* Discount */}
      <div className="absolute top-2 left-2">
        <span className="discount text-[10px] bg-red-500 text-white font-[600] px-2 py-1 rounded-md">
          {product.additionalInfo.discountAmount}$ OFF
        </span>
      </div>

      {/* Hover Actions */}
      <ProductActionsHover product={product} />
    </div>
  );
}

export default ProductImage;
