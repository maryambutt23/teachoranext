"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminLogin.module.css";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (email === "admin@teachora.com" && password === "1234") {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "adminUser",
          JSON.stringify({ email, role: "admin" })
        );
      }

      const from =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("from")
          : null;

      router.replace(from || "/admin");
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
          />

          <input
            type="password"
            placeholder="1234"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.btnPrimary}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}