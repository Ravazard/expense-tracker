import { useState } from "react";
import styles from "./Login.module.css";

const DEMO_EMAIL = "demo@example.com";
const DEMO_PASS = "1234";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (email === DEMO_EMAIL && password === DEMO_PASS) {
      setError("");
      onLogin({ email });
    } else {
      setError("Invalid credentials. Try demo@example.com / 1234");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <div className={styles.screen}>
      <div className={styles.box}>
        <h1 className={styles.logo}>Expense Tracker</h1>
        <p className={styles.sub}>Track your spending, simply.</p>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.btn} onClick={handleLogin}>
          Login
        </button>

        <p className={styles.hint}>demo: demo@example.com / 1234</p>
      </div>
    </div>
  );
}
