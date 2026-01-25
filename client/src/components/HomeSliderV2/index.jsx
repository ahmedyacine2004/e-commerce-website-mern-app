// ==================== HomeSliderV2 Component ====================

// Import required Swiper modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Button from MUI
import Button from "@mui/material/Button";

// Import custom styles
import "./style.css";

function HomeSliderV2() {
  // ==================== Slides Data Array ====================
  // Keep all content exactly the same as original JSX
  const slides = [
    {
      imgSrc: "/images/HomeSliderV2/01.jpg",
      alt: "slide n01",
      h4: "Big saving Days Sale",
      h2: (
        <>
          Woman Solid Round <br /> Green T-shirt
        </>
      ),
      h3Text: "Starting At Only",
      h3Price: "70.00$",
    },
    {
      imgSrc: "/images/HomeSliderV2/02.jpg",
      alt: "slide n02",
      h4: "Big saving Days Sale",
      h2: (
        <>
          Buy Modern Chair In <br /> Back Color
        </>
      ),
      h3Text: "Starting At Only",
      h3Price: "90.00$",
    },
  ];

  return (
    <div>
      {/* ==================== Swiper Container ==================== */}
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="mySwiperMainV2 h-[440px] !rounded-[8px] !my-5"
      >
        {/* ==================== Loop Over Slides ==================== */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="item relative w-full h-[500px] overflow-hidden">
              {/* Slide Image */}
              <img
                src={slide.imgSrc}
                alt={slide.alt}
                className="w-full !h-full object-cover"
              />

              {/* Overlay */}
              <div className="overlay absolute top-0 !h-full !w-full bg-[rgba(255,255,255,0.4)]"></div>

              {/* Info Section */}
              <div className="info absolute flex flex-col justify-center top-0 w-1/2 h-full z-50 p-8 text-start -right-[100%] opacity-0 transition-all duration-700">
                <h4 className="text-[18px] font-[500] mb-3 -right-[100%] opacity-0 transition-all duration-1000 relative">
                  {slide.h4}
                </h4>
                <h2 className="text-[40px] font-[700] -right-[100%] opacity-0 transition-all duration-1000 relative">
                  {slide.h2}
                </h2>
                <h3 className="flex items-center gap-2 text-[18px] font-[500] mt-3 -right-[100%] opacity-0 transition-all duration-1000 relative">
                  {slide.h3Text}
                  <span className="text-primary text-[30px] font-[700]">
                    {slide.h3Price}
                  </span>
                </h3>

                {/* Button */}
                <div className="button mt-2 w-[120px] -right-[100%] opacity-0 transition-all duration-1000 relative">
                  <Button className="!bg-primary !text-white w-full h-[45px] !uppercase">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeSliderV2;
