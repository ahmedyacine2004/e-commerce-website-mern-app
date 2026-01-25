// React imports
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Custom styles
import "./style.css";

// Swiper modules
import { Navigation } from "swiper/modules";

// Components
import BannerBoxV2 from "../BannerBoxV2";

/**
 * AdsBannerSliderV2 Component
 * ---------------------------
 * Displays a horizontal slider of product banners using Swiper.
 *
 * Props:
 * - items: Number of slides visible per view
 */
function AdsBannerSliderV2({ items }) {
  return (
    <>
      {/* Full-width wrapper */}
      <div className="w-full">
        <Swiper
          slidesPerView={items} // Number of slides per view from props
          modules={[Navigation]} // Enable navigation module
          className="mySwiperAdsV2" // Custom class for styling
          spaceBetween={10} // Space between slides
          navigation={true} // Enable navigation arrows
        >
          {/* Individual Slides */}
          <SwiperSlide>
            <BannerBoxV2
              url={"/images/BannerBoxV2/01.jpg"}
              productName={"Logitech VR Webcam"}
              productPrice={"120$"}
              direction="left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
              url={"/images/BannerBoxV2/02.jpg"}
              productName={"Luxury Desk Chair "}
              productPrice={"190$"}
              direction="left"
            />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBoxV2
              url={"/images/BannerBoxV2/03.avif"}
              productName={"Samsung S23 ULTRA"}
              productPrice={"550$"}
              direction="left"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default AdsBannerSliderV2;
