import { useInView } from "react-intersection-observer";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useMemo, useEffect } from "react";

function SweepPie({ color = "#2300bd" }) {
  const { ref, inView } = useInView({ triggerOnce: true });

  const radius = 30;
  const center = 40;

  // Random target angle (0 → 2π)
  // eslint-disable-next-line react-hooks/purity
  const targetAngle = useMemo(() => Math.random() * 2 * Math.PI, []);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      animate(progress, 1, { duration: 1, ease: "easeOut" });
    }
  }, [inView, progress]);

  const animatedPath = useTransform(progress, (p) => {
    const endAngle = p * targetAngle;

    const endX = center + radius * Math.cos(-endAngle);
    const endY = center + radius * Math.sin(-endAngle);

    const largeArcFlag = endAngle > Math.PI ? 1 : 0;

    // Tip rounding proportional to slice angle
    const tipOffset = Math.min(radius * 0.3, radius * endAngle / Math.PI);

    // Start tip control point (slightly along slice direction)
    const startX = center + tipOffset * Math.cos(-0.05);
    const startY = center + tipOffset * Math.sin(-0.05);

    // End tip control point (slightly before the slice ends)
    const innerX = center + tipOffset * Math.cos(-endAngle + 0.05);
    const innerY = center + tipOffset * Math.sin(-endAngle + 0.05);

    return `
      M ${center} ${center}
      Q ${startX} ${startY} ${center + radius * Math.cos(0)} ${center + radius * Math.sin(0)}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}
      Q ${innerX} ${innerY} ${center} ${center}
      Z
    `;
  });

  return (
    <div ref={ref} style={{ width: 60, height: 60 }}>
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        {/* Background circle */}
        <circle cx={center} cy={center} r={radius} fill="#eee" />

        {/* Animated slice with rounded tips */}
        <motion.path d={animatedPath} fill={color} />
      </svg>
    </div>
  );
}

export default SweepPie;
