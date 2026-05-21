import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext(null);

const SAMPLE_EXPENSES = [
  { id: 1, desc: "Grocery run", amount: 1200, cat: "Food", date: "2026-05-20" },
  { id: 2, desc: "Metro pass", amount: 350, cat: "Transport", date: "2026-05-19" },
  { id: 3, desc: "Netflix", amount: 499, cat: "Entertainment", date: "2026-05-18" },
  { id: 4, desc: "Electricity bill", amount: 2100, cat: "Bills", date: "2026-05-15" },
  { id: 5, desc: "T-shirt", amount: 799, cat: "Shopping", date: "2026-05-12" },
];

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES);
  const [nextId, setNextId] = useState(6);

  function addExpense({ desc, amount, cat }) {
    const today = new Date().toISOString().slice(0, 10);
    setExpenses((prev) => [
      { id: nextId, desc, amount: Math.round(amount), cat, date: today },
      ...prev,
    ]);
    setNextId((n) => n + 1);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthTotal = expenses
    .filter((e) => e.date.startsWith(currentMonth))
    .reduce((a, e) => a + e.amount, 0);

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.cat] = (acc[e.cat] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, total, monthTotal, byCategory }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
