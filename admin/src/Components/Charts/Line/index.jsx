import { useState, useMemo } from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  parseISO,
  format,
  startOfWeek,
  startOfMonth,
  startOfYear,
  isWithinInterval,
} from "date-fns";

/* -------------------- Custom Tooltip -------------------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        padding: "6px 8px",
        fontSize: 12,
        lineHeight: 1.4,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{label}</div>
      {payload.map((item) => (
        <div key={item.dataKey} style={{ color: item.color }}>
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
};

/* -------------------- Custom Legend -------------------- */
const CustomLegend = ({ payload }) => {
  if (!payload?.length) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        fontSize: 11,
        marginBottom: 8,
      }}
    >
      {payload.map((entry) => (
        <div
          key={entry.value}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              borderRadius: 2,
            }}
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/* -------------------- Helper: Aggregate Data -------------------- */
const aggregateData = (data, type) => {
  if (!data || data.length === 0) return [];

  const result = {};

  data.forEach((item) => {
    const date = parseISO(item.date);
    let key;

    switch (type) {
      case "daily":
        key = format(date, "yyyy-MM-dd");
        break;
      case "weekly":
        key = format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
        break;
      case "monthly":
        key = format(startOfMonth(date), "yyyy-MM");
        break;
      case "yearly":
        key = format(startOfYear(date), "yyyy");
        break;
      default:
        key = format(date, "yyyy-MM-dd");
    }

    if (!result[key]) result[key] = { date: key };

    Object.keys(item).forEach((k) => {
      if (k === "date") return;
      result[key][k] = (result[key][k] || 0) + item[k];
    });
  });

  // Sort by date
  return Object.values(result).sort((a, b) => (a.date > b.date ? 1 : -1));
};

/* -------------------- Main Component -------------------- */
export const LineChartComponent = ({ data }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = Array.isArray(data) ? data : data?.data || [];
  const [activeRange, setActiveRange] = useState("daily");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const numericKeys =
    data?.keys?.length > 0
      ? data.keys
      : chartData[0]
        ? Object.keys(chartData[0])
            .filter((k) => k !== "date")
            .map((k) => ({ key: k, name: k, yAxis: "right", type: "line" }))
        : [];

  /* -------- Apply Quick Range -------- */
  const maxDateInData = useMemo(() => {
    if (!chartData.length) return null;
    return chartData
      .map((d) => parseISO(d.date))
      .reduce((a, b) => (a > b ? a : b));
  }, [chartData]);

  const applyRange = (type) => {
    if (!maxDateInData) return;

    setActiveRange(type);

    let start,
      end = maxDateInData;

    switch (type) {
      case "daily":
        start = chartData[0] ? parseISO(chartData[0].date) : maxDateInData;
        break;
      case "weekly":
        start = startOfWeek(
          chartData[0] ? parseISO(chartData[0].date) : maxDateInData,
          { weekStartsOn: 1 },
        );
        break;
      case "monthly":
        start = startOfMonth(
          chartData[0] ? parseISO(chartData[0].date) : maxDateInData,
        );
        break;
      case "yearly":
        start = startOfYear(
          chartData[0] ? parseISO(chartData[0].date) : maxDateInData,
        );
        break;
      default:
        start = chartData[0] ? parseISO(chartData[0].date) : maxDateInData;
    }

    setStartDate(start);
    setEndDate(end);
  };

  /* -------- Filter data by date -------- */
  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return aggregateData(chartData, activeRange);
    const filtered = chartData.filter((item) =>
      isWithinInterval(parseISO(item.date), { start: startDate, end: endDate }),
    );
    return aggregateData(filtered, activeRange);
  }, [chartData, startDate, endDate, activeRange]);

  return (
    <Box className="w-full h-full flex flex-col gap-4">
      {/* ---------------- Filters ---------------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {[
            { label: "Day", value: "daily" },
            { label: "Week", value: "weekly" },
            { label: "Month", value: "monthly" },
            { label: "Year", value: "yearly" },
          ].map((item) => {
            const active = activeRange === item.value;
            return (
              <Box
                key={item.value}
                onClick={() => applyRange(item.value)}
                sx={{
                  px: 2,
                  py: 0.7,
                  fontSize: 12,
                  fontWeight: 500,
                  borderRadius: "999px",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: active ? "#6366f1" : "#d1d5db",
                  backgroundColor: active ? "#eef2ff" : "#f3f4f6",
                  color: active ? "#4338ca" : "#374151",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#e0e7ff",
                  },
                }}
              >
                {item.label}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <DatePicker
            label="From"
            value={startDate}
            onChange={(v) => {
              setStartDate(v);
              setActiveRange(null);
            }}
            slotProps={{ textField: { size: "small", sx: { width: 130 } } }}
          />
          <DatePicker
            label="To"
            value={endDate}
            onChange={(v) => {
              setEndDate(v);
              setActiveRange(null);
            }}
            slotProps={{ textField: { size: "small", sx: { width: 130 } } }}
          />
        </Box>
      </Box>

      {/* ---------------- Chart ---------------- */}
      {filteredData.length === 0 || numericKeys.length === 0 ? (
        <Box className="w-full h-64 flex items-center justify-center border border-dashed rounded-lg">
          <Typography color="text.secondary">No data available</Typography>
        </Box>
      ) : (
        <Box className="w-full flex-1 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />

              {numericKeys.map((k) => (
                <Area
                  key={k.key}
                  yAxisId={k.yAxis || "left"}
                  type="monotone"
                  dataKey={k.key}
                  name={k.name}
                  stroke={k.color}
                  fill={k.color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};
