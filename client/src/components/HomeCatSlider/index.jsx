import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// ==================== Swiper Styles ====================
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

// ==================== Swiper Modules ====================
import { Navigation } from "swiper/modules";
import sliderData from "../../data/sliderData.json";

// ==================== HomeCatSlider Component ====================
function HomeCatSlider() {
  return (
    // ==================== Main Slider Container ====================
    <div className="HomeCatSlider py-5">
      <div className="container">
        <Swiper
          slidesPerView={7} // Number of slides visible at a time
          modules={[Navigation]} // Enable navigation module
          className="mySwiperCat" // Custom CSS class
          spaceBetween={10} // Space between slides
          navigation={true} // Show navigation arrows
        >
          {/* ==================== Render Slides from JSON ==================== */}
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link to="/">
                <div className="item px-8 py-6 bg-white rounded-md flex justify-center flex-col shadow-sm text-black">
                  <img
                    src={slide.img}
                    alt={`category ${slide.id}`}
                    className="max-h-[100px] transition-all"
                  />
                  <h3 className="text-[15px] font-[500] mt-3">{slide.title}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeCatSlider;
