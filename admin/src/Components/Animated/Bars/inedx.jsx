import { useInView } from "react-intersection-observer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useMemo } from "react";

function Bars({ color }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const heights = useMemo(
    // eslint-disable-next-line react-hooks/purity
    () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 35) + 20),
    [],
  );

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 6,
        alignItems: "flex-end",
        height: 60,
      }}
    >
      {heights.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: h, opacity: 1 } : {}}
          transition={{
            delay: i * 0.12,
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{
            width: 7, // thinner
            background: color,
            borderRadius: 999,
          }}
        />
      ))}
    </div>
  );
}

export default Bars;
