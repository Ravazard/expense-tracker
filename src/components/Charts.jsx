import { useEffect, useRef } from "react";
import { useExpenses } from "../context/ExpenseContext";
import styles from "./Charts.module.css";

export const CAT_COLORS = {
  Food: "#2d6a4f",
  Transport: "#185fa5",
  Shopping: "#7f77dd",
  Bills: "#b5600a",
  Health: "#d4537e",
  Entertainment: "#639922",
  Other: "#7a7870",
};

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function BarChart({ byCategory }) {
  const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  if (sorted.length === 0) {
    return <p className={styles.empty}>No data yet</p>;
  }

  return (
    <div className={styles.bars}>
      {sorted.map(([cat, val]) => (
        <div key={cat} className={styles.barRow}>
          <span className={styles.barLabel}>{cat}</span>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{
                width: `${Math.round((val / max) * 100)}%`,
                background: CAT_COLORS[cat] || "#888",
              }}
            />
          </div>
          <span className={styles.barVal}>{fmt(val)}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ byCategory }) {
  const canvasRef = useRef(null);
  const total = Object.values(byCategory).reduce((a, v) => a + v, 0) || 1;
  const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 160, 160);
    const cx = 80, cy = 80, r = 65, inner = 38;
    let angle = -Math.PI / 2;

    sorted.forEach(([cat, val]) => {
      const slice = (val / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = CAT_COLORS[cat] || "#888";
      ctx.fill();
      angle += slice;
    });

    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("--card-bg") || "#fff";
    ctx.fill();
  }, [byCategory]);

  if (sorted.length === 0) {
    return <p className={styles.empty}>No data yet</p>;
  }

  return (
    <>
      <div className={styles.donutWrap}>
        <canvas ref={canvasRef} width={160} height={160} className={styles.donutCanvas} />
      </div>
      <div className={styles.legend}>
        {sorted.map(([cat, val]) => (
          <div key={cat} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ background: CAT_COLORS[cat] || "#888" }}
            />
            <span className={styles.legendCat}>{cat}</span>
            <span className={styles.legendPct}>
              {Math.round((val / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Charts() {
  const { byCategory } = useExpenses();

  return (
    <div className={styles.row}>
      <div className={styles.card}>
        <p className={styles.title}>By Category</p>
        <BarChart byCategory={byCategory} />
      </div>
      <div className={styles.card}>
        <p className={styles.title}>Breakdown</p>
        <DonutChart byCategory={byCategory} />
      </div>
    </div>
  );
}
