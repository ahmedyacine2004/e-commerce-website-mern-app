import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductItem from "../ProductItem";
import useProducts from "../../hooks/useProducts";

function ProductsSlider({ items }) {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productsSlider !overflow-hidden">
      <Swiper
        slidesPerView={items}
        modules={[Navigation]}
        className="mySwiperCat my-5"
        spaceBetween={10}
        navigation
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductsSlider;
