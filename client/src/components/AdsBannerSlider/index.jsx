// React & Router imports
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Custom styles
import "./style.css";

// Swiper modules
import { Navigation } from "swiper/modules";

// Components
import BannerBox from "../BannerBox";

// Data
import adsBanners from "../../data/adsBanners.json";

function AdsBannerSlider({ items }) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={items}
        modules={[Navigation]}
        className="mySwiperAds"
        spaceBetween={10}
        navigation={true}
      >
        {adsBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <BannerBox img={banner.img} link={banner.link} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AdsBannerSlider;
