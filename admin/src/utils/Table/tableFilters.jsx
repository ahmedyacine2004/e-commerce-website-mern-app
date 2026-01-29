export const normalizeValue = (val) => {
  if (val == null) return null;
  return String(val).trim();
};

export const getUniqueOptions = (data, accessor) => {
  const set = new Set();

  data.forEach((row) => {
    const value = row[accessor];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        const normalized = normalizeValue(v);
        if (normalized) set.add(normalized);
      });
    } else {
      const normalized = normalizeValue(value);
      if (normalized) set.add(normalized);
    }
  });

  return Array.from(set).sort();
};
