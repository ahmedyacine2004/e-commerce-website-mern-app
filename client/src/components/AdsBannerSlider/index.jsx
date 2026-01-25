// React & Router imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Custom styles
import "./style.css";

// Swiper modules
import { Navigation } from "swiper/modules";

// Components
import BannerBox from "../BannerBox";

/**
 * AdsBannerSlider Component
 * ------------------------
 * Displays a horizontal slider of banner ads using Swiper.
 *
 * Props:
 * - items: Number of slides visible per view
 */
function AdsBannerSlider({ items }) {
  return (
    <>
      {/* Wrapper div for full-width slider */}
      <div className="w-full">
        <Swiper
          slidesPerView={items} // Number of slides per view from props
          modules={[Navigation]} // Enable navigation module
          className="mySwiperAds" // Custom class for styling
          spaceBetween={10} // Space between slides
          navigation={true} // Enable navigation arrows
        >
          {/* Individual slides */}
          <SwiperSlide>
            <BannerBox img={"banner1"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"banner2"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"banner3"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"banner4"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"banner5"} link={"/"} />
          </SwiperSlide>
          <SwiperSlide>
            <BannerBox img={"banner6"} link={"/"} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default AdsBannerSlider;
