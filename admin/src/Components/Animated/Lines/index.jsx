import { useInView } from "react-intersection-observer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMemo } from "react";

function LineChart({ color = "#2300bd" }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  const { path, points } = useMemo(() => {
    const values = Array.from(
      { length: 6 },
      // eslint-disable-next-line react-hooks/purity
      () => Math.floor(Math.random() * 30) + 15,
    );

    const coords = values.map((v, i) => ({
      x: i * 18 + 5,
      y: 60 - v,
    }));

    // build smooth cubic bezier path
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      const midX = (prev.x + curr.x) / 2;

      d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    return { path: d, points: coords };
  }, []);

  return (
    <div ref={ref} style={{ width: 120, height: 60 }}>
      <svg viewBox="0 0 110 60" width="100%" height="100%">
        {/* Line */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4.5"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: 0.15 + i * 0.12,
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default LineChart;
