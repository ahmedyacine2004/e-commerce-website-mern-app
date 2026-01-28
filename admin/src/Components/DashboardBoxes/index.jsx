import { Swiper, SwiperSlide } from "swiper/react";
import GiftIcon from "../../assets/svgs/gift.svg?react";
import MoneyIcon from "../../assets/svgs/money.svg?react";
import RevenueIcon from "../../assets/svgs/revenue.svg?react";
import BoxIcon from "../../assets/svgs/box.svg?react";

import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import { Pagination } from "swiper/modules";
import Bars from "../Animated/Bars/inedx";
import LineChart from "../Animated/Lines";
import SweepPie from "../Animated/Pie";
import MetricCells from "../Animated/Cells";
import Divider from "@mui/material/Divider";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

// MOVE THIS OUTSIDE
const ChartWrapper = ({ children }) => (
  <div
    style={{
      width: 80, // fixed container width
      height: 60, // fixed container height
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

function DashboardBoxes() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="dashboardBoxes"
    >
      {/* New Orders */}
      <SwiperSlide>
        <div className="box p-4 border border-[rgba(0,0,0,0.1)] rounded-md flex flex-col justify-between hover:bg-[rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-4">
              <GiftIcon width={30} height={30} color="#2300bd" />
              <div>
                <h3 className="text-sm text-gray-500">New Orders</h3>
                <b className="text-xl">1,390</b>
              </div>
            </div>
            <ChartWrapper>
              <Bars color="#2300bd" />
            </ChartWrapper>
          </div>

          <Divider sx={{ my: 1 }} />

          <div className="h-[20px] flex items-center">
            <p className="text-sm text-green-600 whitespace-nowrap truncate">
              <FaArrowTrendUp className="inline mr-2" />
              12.4% increase since last month
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Sales */}
      <SwiperSlide>
        <div className="box p-4 border border-[rgba(0,0,0,0.1)] rounded-md flex flex-col justify-between hover:bg-[rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-4">
              <MoneyIcon width={30} height={30} color="#2300bd" />
              <div>
                <h3 className="text-sm text-gray-500">Sales</h3>
                <b className="text-xl">4.8%</b>
              </div>
            </div>
            <ChartWrapper>
              <LineChart color="#2300bd" />
            </ChartWrapper>
          </div>

          <Divider sx={{ my: 1 }} />

          <div className="h-[20px] flex items-center">
            <p className="text-sm text-red-600 whitespace-nowrap truncate">
              <FaArrowTrendDown className="inline mr-2" />
              1.2% decrease from last week
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Revenue */}
      <SwiperSlide>
        <div className="box p-4 border border-[rgba(0,0,0,0.1)] rounded-md flex flex-col justify-between hover:bg-[rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-4">
              <RevenueIcon width={30} height={30} color="#2300bd" />
              <div>
                <h3 className="text-sm text-gray-500">Revenue</h3>
                <b className="text-xl">$24,560</b>
              </div>
            </div>
            <ChartWrapper>
              <SweepPie color="#2300bd" />
            </ChartWrapper>
          </div>

          <Divider sx={{ my: 1 }} />

          <div className="h-[20px] flex items-center">
            <p className="text-sm text-green-600 whitespace-nowrap truncate">
              <FaArrowTrendUp className="inline mr-2" />
              8.7% growth this month
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Total Products */}
      <SwiperSlide>
        <div className="box p-4 border border-[rgba(0,0,0,0.1)] rounded-md flex flex-col justify-between hover:bg-[rgba(0,0,0,0.05)] transition-all">
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-4">
              <BoxIcon width={30} height={30} color="#2300bd" />
              <div>
                <h3 className="text-sm text-gray-500 whitespace-nowrap truncate">
                  Total Products
                </h3>{" "}
                <b className="text-xl">$24,560</b>
              </div>
            </div>
            <ChartWrapper>
              <MetricCells color="#2300bd" />
            </ChartWrapper>
          </div>

          <Divider sx={{ my: 1 }} />

          <div className="h-[20px] flex items-center">
            <p className="text-sm text-green-600 whitespace-nowrap truncate">
              <FaArrowTrendUp className="inline mr-2" />
              8.7% growth this month
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default DashboardBoxes;
