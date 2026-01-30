// DashboardBoxes/BoxCard.js
import Divider from "@mui/material/Divider";
import ChartWrapper from "./ChartWrapper";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

// eslint-disable-next-line no-unused-vars
const BoxCard = ({ icon: Icon, title, value, chart, trend }) => (
  <div className="box p-4 border bg-white border-[rgba(0,0,0,0.1)] rounded-md flex flex-col justify-between hover:bg-[rgba(0,0,0,0.05)] transition-all">
    <div className="flex items-center">
      <div className="flex-1 flex items-center gap-4">
        <Icon width={30} height={30} color="#2300bd" />
        <div>
          <h3 className="text-sm text-gray-500 whitespace-nowrap truncate">{title}</h3>
          <b className="text-xl">{value}</b>
        </div>
      </div>
      <ChartWrapper>
        {chart}
      </ChartWrapper>
    </div>

    <Divider sx={{ my: 1 }} />

    <div className="h-[20px] flex items-center">
      <p className={`text-sm whitespace-nowrap truncate ${trend.color}`}>
        {trend.up ? <FaArrowTrendUp className="inline mr-2" /> : <FaArrowTrendDown className="inline mr-2" />}
        {trend.text}
      </p>
    </div>
  </div>
);

export default BoxCard;
