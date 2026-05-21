import { useExpenses } from "../context/ExpenseContext";
import SummaryCards from "./SummaryCards";
import AddExpenseForm from "./AddExpenseForm";
import Charts from "./Charts";
import TransactionTable from "./TransactionTable";
import styles from "./Dashboard.module.css";

export default function Dashboard({ user, onLogout }) {
  const { total, monthTotal, expenses } = useExpenses();

  return (
    <div className={styles.wrapper}>
      <header className={styles.topbar}>
        <span className={styles.brand}>Expense Tracker</span>
        <div className={styles.right}>
          <span className={styles.userChip}>{user.email}</span>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <SummaryCards
          total={total}
          monthTotal={monthTotal}
          count={expenses.length}
        />
        <AddExpenseForm />
        <Charts />
        <TransactionTable />
      </main>
    </div>
  );
}
