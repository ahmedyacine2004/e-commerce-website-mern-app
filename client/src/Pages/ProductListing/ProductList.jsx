import ProductItemListView from "../../components/ProductItemListView";

export default function ProductList({ products }) {
  return (
    <>
      {products.map((product, index) => (
        <div key={index}>
          <ProductItemListView product={product} />
        </div>
      ))}
    </>
  );
}
