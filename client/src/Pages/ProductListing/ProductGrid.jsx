import ProductItem from "../../components/ProductItem";

export default function ProductGrid({ products }) {
  return (
    <>
      {products.map((product, index) => (
        <div key={index}>
          <ProductItem product={product} />
        </div>
      ))}
    </>
  );
}
