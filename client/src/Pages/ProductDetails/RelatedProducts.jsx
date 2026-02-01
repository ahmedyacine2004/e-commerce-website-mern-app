import ProductsSlider from "../../components/ProductsSlider";

function RelatedProducts({ items = 6 }) {
  return (
    <section className="pt-6">
      <h2 className="text-[22px] font-[600]">Related products</h2>
      <ProductsSlider items={items} />
    </section>
  );
}

export default RelatedProducts;
