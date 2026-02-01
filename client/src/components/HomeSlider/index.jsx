// ==================== HomeSlider Component ====================

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";

// Import required modules
import { Navigation, Autoplay } from "swiper/modules";
import slides from "../../data/slides.json";

function HomeSlider() {
  // ==================== Slider Images Array ====================

  return (
    <>
      {/* ==================== Slider Container ==================== */}
      <div className="homeSlider py-4">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiperMain"
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {/* ==================== Loop over slides ==================== */}
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`item overflow-hidden ${slide.rounded}`}>
                <img src={slide.src} alt={slide.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default HomeSlider;
