import { useMemo, useState } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import { aggregateData } from "../../../utils/LineChart";

export const useChartData = (rawData) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = Array.isArray(rawData) ? rawData : rawData?.data || [];

  const [range, setRange] = useState("daily");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const numericKeys = useMemo(() => {
    if (rawData?.keys?.length) return rawData.keys;

    if (!chartData[0]) return [];
    return Object.keys(chartData[0])
      .filter((k) => k !== "date")
      .map((k) => ({ key: k, name: k, yAxis: "right" }));
  }, [chartData, rawData]);

  const filteredData = useMemo(() => {
    const data =
      startDate && endDate
        ? chartData.filter((d) =>
            isWithinInterval(parseISO(d.date), {
              start: startDate,
              end: endDate,
            }),
          )
        : chartData;

    return aggregateData(data, range);
  }, [chartData, startDate, endDate, range]);

  return {
    range,
    setRange,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    numericKeys,
    filteredData,
  };
};
