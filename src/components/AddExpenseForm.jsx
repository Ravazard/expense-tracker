import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import styles from "./AddExpenseForm.module.css";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"];

export default function AddExpenseForm() {
  const { addExpense } = useExpenses();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState("Food");
  const [shake, setShake] = useState(false);

  function handleAdd() {
    const parsed = parseFloat(amount);
    if (!desc.trim() || isNaN(parsed) || parsed <= 0) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    addExpense({ desc: desc.trim(), amount: parsed, cat });
    setDesc("");
    setAmount("");
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>Add Expense</p>
      <div className={`${styles.row} ${shake ? styles.shake : ""}`}>
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Grocery run"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <div className={styles.fieldNarrow}>
          <label className={styles.label}>Amount (₹)</label>
          <input
            className={styles.input}
            type="number"
            placeholder="0"
            min="0"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <div className={styles.fieldNarrow}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.input}
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.btnWrap}>
          <label className={styles.label}>&nbsp;</label>
          <button className={styles.btn} onClick={handleAdd}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
