import { Box } from "@mui/material";
import { useChartData } from "./useChartData";
import { ChartFilters } from "./ChartFilters";
import { ChartView } from "./ChartView";

export const LineChart = ({ data }) => {
  const {
    range,
    setRange,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    numericKeys,
    filteredData,
  } = useChartData(data);

  return (
    <Box className="flex flex-col gap-4">
      <ChartFilters
        range={range}
        onRangeChange={setRange}
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
      />

      <ChartView data={filteredData} keys={numericKeys} />
    </Box>
  );
};
