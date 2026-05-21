import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { CAT_COLORS } from "./Charts";
import styles from "./TransactionTable.module.css";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

const CAT_BG = {
  Food: "#e1f5ee", Transport: "#e6f1fb", Shopping: "#eeedfe",
  Bills: "#faeeda", Health: "#fbeaf0", Entertainment: "#eaf3de", Other: "#f1efe8",
};
const CAT_TX = {
  Food: "#085041", Transport: "#0c447c", Shopping: "#3c3489",
  Bills: "#633806", Health: "#72243e", Entertainment: "#27500a", Other: "#444441",
};

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function TransactionTable() {
  const { expenses, deleteExpense } = useExpenses();
  const [filterCat, setFilterCat] = useState("");

  const filtered = filterCat
    ? expenses.filter((e) => e.cat === filterCat)
    : expenses;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>Transactions</p>
        <select
          className={styles.filter}
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {expenses.length === 0
            ? "No transactions yet. Add one above!"
            : `No transactions in "${filterCat}".`}
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th className={styles.right}>Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td className={styles.descCell}>{e.desc}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{
                        background: CAT_BG[e.cat] || "#eee",
                        color: CAT_TX[e.cat] || "#555",
                      }}
                    >
                      {e.cat}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{e.date}</td>
                  <td className={`${styles.amountCell} ${styles.right}`}>
                    {fmt(e.amount)}
                  </td>
                  <td>
                    <button
                      className={styles.delBtn}
                      onClick={() => deleteExpense(e.id)}
                      title="Delete"
                      aria-label="Delete expense"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
