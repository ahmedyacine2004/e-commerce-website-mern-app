// DashboardBoxes/ChartWrapper.js
const ChartWrapper = ({ children }) => (
  <div
    style={{
      width: 80,
      height: 60,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

export default ChartWrapper;
