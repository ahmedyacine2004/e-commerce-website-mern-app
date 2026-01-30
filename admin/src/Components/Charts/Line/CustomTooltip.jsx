export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        padding: "6px 8px",
        fontSize: 12,
        lineHeight: 1.4,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontWeight: 500, marginBottom: 4 }}>
        {label}
      </div>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          style={{ color: item.color }}
        >
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
};
