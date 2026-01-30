// DashboardBoxes/index.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

import BoxCard from "./BoxCard";
import { boxesData } from "./data";

function DashboardBoxes() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="dashboardBoxes"
    >
      {boxesData.map((box, idx) => (
        <SwiperSlide key={idx}>
          <BoxCard
            icon={box.icon}
            title={box.title}
            value={box.value}
            chart={box.chart}
            trend={box.trend}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DashboardBoxes;
