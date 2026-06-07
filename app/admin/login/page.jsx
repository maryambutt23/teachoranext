"use client";

import { useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AdminLogin.module.css";

export default function Page() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const success = login(email, password);

    if (success) {
      // ✅ IMPORTANT FIX: go back to requested page
      const redirectTo = searchParams.get("from") || "/admin";
      router.replace(redirectTo);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="admin@teachora.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="1234"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.btnPrimary}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}