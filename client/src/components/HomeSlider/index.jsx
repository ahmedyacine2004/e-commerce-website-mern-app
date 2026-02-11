// ==================== HomeSlider Component ====================

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import required modules
import "./styles.css"; // Custom styles for the slider
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import custom styles
import useMainBanners from "../../hooks/useMainBanners";

function HomeSlider() {
  const { MainBanners, loading, error } = useMainBanners();

  // ==================== Slides Data Array ====================
  const slides = MainBanners.map((banner) => ({
    imgSrc: banner.imgSrc,
    alt: banner.alt,
  }));

  console.log("Main Banners Data:", MainBanners);

  // Show loading state outside Swiper
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[440px]">
        <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg"></div>
      </div>
    );
  }

  // Show error state outside Swiper
  if (error) {
    return (
      <div className="flex justify-center items-center h-[440px] text-red-500">
        Error loading main banners
      </div>
    );
  }

  // Show empty state if no banners
  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center h-[440px] text-gray-500">
        No main banners available
      </div>
    );
  }

  // Only render Swiper when we have data
  return (
    <div className="HomeSlider py-4">
      {/* ==================== Swiper Container ==================== */}
      <Swiper
        loop={true}
        spaceBetween={0}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiperMain h-[440px] !rounded-[8px]"
      >
        {/* ==================== Loop Over Slides ==================== */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="item relative w-full h-full overflow-hidden">
              {/* Slide Image */}
              <img
                src={slide.imgSrc}
                alt={slide.alt || `Main Banner ${index + 1}`}
                className="w-full !h-full object-cover"
              />
              
              {/* Optional overlay - you can remove this if not needed */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeSlider;