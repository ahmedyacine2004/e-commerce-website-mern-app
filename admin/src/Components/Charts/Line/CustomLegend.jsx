export const CustomLegend = ({ payload }) => {
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
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
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
