// ==================== ProductZoom Component ====================

import { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";


function ProductZoom({ product }) {
  const images = Object.values(product.media);

  // ==================== State ====================
  const [slideIndex, setSlideIndex] = useState(0);

  // ==================== Refs for Swipers ====================
  const zoomSliderSml = useRef(); // Thumbnail slider
  const zoomSliderBig = useRef(); // Main image slider

  // ==================== Navigate to selected slide ====================
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <>
      <div className="flex gap-3">
        {/* ==================== Thumbnail Slider ==================== */}
        <div className="slider w-[20%]">
          <Swiper
            ref={zoomSliderSml}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={5}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumb !h-[500px]"
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`item cursor-pointer rounded-md shadow-md border-[1px] border-gray-500 overflow-hidden group transition-all duration-400 ${
                    index != slideIndex && "opacity-[0.5]"
                  }`}
                  onClick={() => goto(index)}
                >
                  <img
                    src={url}
                    alt={product.media[0]}
                    className="!h-[95px] object-cover w-full transition-all group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide></SwiperSlide>
          </Swiper>
        </div>

        {/* ==================== Main Zoom Slider ==================== */}
        <div className="zoomContainer w-[80%] !h-[500px] overflow-hidden">
          <Swiper
            ref={zoomSliderBig}
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
            modules={[Navigation]}
            className="zoomProductSliderThumb !h-[500px]"
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="item cursor-pointer rounded-md shadow-md border-[1px] border-gray-500 overflow-hidden group">
                  <InnerImageZoom
                    className="rounded-md shadow-md h-[498px] w-full object-cover"
                    zoomType="hover"
                    src={url}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default ProductZoom;
