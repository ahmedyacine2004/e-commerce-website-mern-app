import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { CustomTooltip } from "./CustomTooltip";
import { CustomLegend } from "./CustomLegend";

export const ChartView = ({ data, keys }) => {
  if (!data.length || !keys.length) {
    return (
      <Box className="h-64 flex items-center justify-center border border-dashed rounded-lg">
        <Typography color="text.secondary">No data available</Typography>
      </Box>
    );
  }

  // Axis styling
  const axisTickStyle = {
    fontSize: 10,
    fill: "#6b7280", // muted gray
    fontWeight: 400,
  };

  const axisLineStyle = {
    stroke: "#e5e7eb", // light gray line
    strokeWidth: 1,
  };

  return (
    // Make container fully responsive, remove fixed bottom whitespace
    <Box className="w-full" style={{ height: 256, minHeight: 340 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }} // reduce bottom margin
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={axisTickStyle}
            tickLine={false}
            axisLine={axisLineStyle}
            interval="preserveStartEnd"
            padding={{ left: 10, right: 10 }} // prevent ticks from being cut
          />

          <YAxis
            yAxisId="left"
            tick={axisTickStyle}
            tickLine={false}
            axisLine={axisLineStyle}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tick={axisTickStyle}
            tickLine={false}
            axisLine={axisLineStyle}
            tickFormatter={(v) => `$${v}`}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {keys.map((k) => (
            <Area
              key={k.key}
              dataKey={k.key}
              yAxisId={k.yAxis || "left"}
              type="monotone"
              stroke={k.color}
              fill={k.color}
              fillOpacity={0.2}
              strokeWidth={2}
              dot={{ r: 2 }} // smaller dots, less extra space
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};
