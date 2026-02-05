function ProductPrice({ product }) {
  return (
    <div className="flex items-baseline mt-2">
      <h5 className="text-[16px] line-through text-gray-500 mr-2">
        ${product.price}
      </h5>

      <span className="text-[22px] font-[600] text-primary mr-2">
        ${product.additionalInfo.oldPrice}
      </span>

      <span className="text-[13px] ml-5">
        Available in Stock:
        <span
          className={`font-bold ml-1 ${
            product.additionalInfo.available ? "text-green-500" : "text-red-500"
          }`}
        >
          ({product.stock})
        </span>
      </span>
    </div>
  );
}

export default ProductPrice;
