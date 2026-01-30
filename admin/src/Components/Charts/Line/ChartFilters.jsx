import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const RANGES = [
  { label: "Day", value: "daily" },
  { label: "Week", value: "weekly" },
  { label: "Month", value: "monthly" },
  { label: "Year", value: "yearly" },
];

export const ChartFilters = ({
  range,
  onRangeChange,
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}) => {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Box display="flex" gap={1}>
        {RANGES.map((r) => (
          <Box
            key={r.value}
            onClick={() => onRangeChange(r.value)}
            sx={{
              px: 2,
              py: 0.7,
              fontSize: 12,
              borderRadius: "12px",
              display: 'flex',
              alignItems: 'center',
              cursor: "pointer",
              border: "1px solid",
              borderColor: range === r.value ? "#6366f1" : "#d1d5db",
              backgroundColor: range === r.value ? "#eef2ff" : "#f3f4f6",
            }}
          >
            {r.label}
          </Box>
        ))}
      </Box>

      <DatePicker
        label="From"
        value={startDate}
        onChange={onStartChange}
        slotProps={{ textField: { size: "small" } }}
      />
      <DatePicker
        label="To"
        value={endDate}
        onChange={onEndChange}
        slotProps={{ textField: { size: "small" } }}
      />
    </Box>
  );
};
