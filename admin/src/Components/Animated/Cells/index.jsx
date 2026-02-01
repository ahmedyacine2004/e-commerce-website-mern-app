// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function MetricCells({ color = "#4ade80" }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 12px)", // 3 cells per row
        gridTemplateRows: "repeat(2, 12px)", // 2 rows
        gap: 6,
        width: "max-content",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            delay: i * 0.08,
            duration: 0.35,
            ease: "easeOut",
          }}
          style={{
            width: 12,
            height: 12,
            background: color,
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  );
}

export default MetricCells;
