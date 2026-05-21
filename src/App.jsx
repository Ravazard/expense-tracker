import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ExpenseProvider } from "./context/ExpenseContext";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <ExpenseProvider>
      <Dashboard user={user} onLogout={() => setUser(null)} />
    </ExpenseProvider>
  );
}
