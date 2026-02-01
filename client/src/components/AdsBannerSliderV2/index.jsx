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

// Data
import adsBannersV2 from "../../data/adsBannersV2.json";

function AdsBannerSliderV2({ items }) {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={items}
        modules={[Navigation]}
        className="mySwiperAdsV2"
        spaceBetween={10}
        navigation={true}
      >
        {adsBannersV2.map((banner) => (
          <SwiperSlide key={banner.id}>
            <BannerBoxV2
              url={banner.url}
              productName={banner.productName}
              productPrice={banner.productPrice}
              direction={banner.direction}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AdsBannerSliderV2;
