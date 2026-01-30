import {
  parseISO,
  format,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";

export const aggregateData = (data, type) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const result = {};

  data.forEach((item) => {
    const date = parseISO(item.date);
    let key;

    switch (type) {
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
      if (k !== "date") {
        result[key][k] = (result[key][k] || 0) + item[k];
      }
    });
  });

  return Object.values(result).sort((a, b) =>
    a.date > b.date ? 1 : -1
  );
};
