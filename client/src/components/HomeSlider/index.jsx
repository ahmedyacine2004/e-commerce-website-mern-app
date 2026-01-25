// ==================== HomeSlider Component ====================

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";

// Import required modules
import { Navigation, Autoplay } from "swiper/modules";

function HomeSlider() {
  // ==================== Slider Images Array ====================
  const slides = [
    {
      src: "/images/HomeSlider/1.jpg",
      alt: "slide n01",
      rounded: "!rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/2.jpg",
      alt: "slide n02",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/3.jpg",
      alt: "slide n03",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/4.jpg",
      alt: "slide n04",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/5.jpg",
      alt: "slide n05",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/6.jpg",
      alt: "slide n06",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/7.jpg",
      alt: "slide n07",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/8.jpg",
      alt: "slide n08",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/9.jpg",
      alt: "slide n09",
      rounded: "rounded-[20px]",
    },
    {
      src: "/images/HomeSlider/10.jpg",
      alt: "slide n10",
      rounded: "rounded-[20px]",
    },
  ];

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
