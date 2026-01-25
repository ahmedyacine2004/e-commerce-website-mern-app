// ==================== ProductsSlider Component ====================

import { Swiper, SwiperSlide } from "swiper/react";
import products from "../../data/products.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";

// Import ProductItem component
import ProductItem from "../ProductItem";

function ProductsSlider({ items }) {
  return (
    <div className="productsSlider !overflow-hidden">
      {/* ==================== Swiper Container ==================== */}
      <Swiper
        slidesPerView={items} // Number of items visible per view
        modules={[Navigation]} // Swiper modules used
        className="mySwiperCat my-5" // Swiper container classes
        spaceBetween={10} // Gap between slides
        navigation={true} // Enable navigation arrows
      >
        {/* ==================== Loop over products ==================== */}
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductsSlider;
