// DashboardBoxes/data.js
import GiftIcon from "../../assets/svgs/gift.svg?react";
import MoneyIcon from "../../assets/svgs/money.svg?react";
import RevenueIcon from "../../assets/svgs/revenue.svg?react";
import BoxIcon from "../../assets/svgs/box.svg?react";

import Bars from "../Animated/Bars/inedx";
import LineChart from "../Animated/Lines";
import SweepPie from "../Animated/Pie";
import MetricCells from "../Animated/Cells";

export const boxesData = [
  {
    icon: GiftIcon,
    title: "New Orders",
    value: "1,390",
    chart: <Bars color="#2300bd" />,
    trend: { up: true, color: "text-green-600", text: "12.4% increase since last month" },
  },
  {
    icon: MoneyIcon,
    title: "Sales",
    value: "4.8%",
    chart: <LineChart color="#2300bd" />,
    trend: { up: false, color: "text-red-600", text: "1.2% decrease from last week" },
  },
  {
    icon: RevenueIcon,
    title: "Revenue",
    value: "$24,560",
    chart: <SweepPie color="#2300bd" />,
    trend: { up: true, color: "text-green-600", text: "8.7% growth this month" },
  },
  {
    icon: BoxIcon,
    title: "Total Products",
    value: "$24,560",
    chart: <MetricCells color="#2300bd" />,
    trend: { up: true, color: "text-green-600", text: "8.7% growth this month" },
  },
];
