function StatusBadge({ status }) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize";

  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    determined: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`${base} ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
