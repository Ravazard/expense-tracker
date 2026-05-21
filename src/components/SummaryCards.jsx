import styles from "./SummaryCards.module.css";

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function SummaryCards({ total, monthTotal, count }) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}>Total Spent</div>
        <div className={`${styles.value} ${styles.red}`}>{fmt(total)}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>This Month</div>
        <div className={styles.value}>{fmt(monthTotal)}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Transactions</div>
        <div className={styles.value}>{count}</div>
      </div>
    </div>
  );
}
