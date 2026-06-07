"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AdminLogin.module.css";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!auth?.login) {
      alert("Auth system not ready");
      return;
    }

    const success = auth.login(email, password);

    if (success) {
      const redirectTo = searchParams.get("from") || "/admin";
      router.replace(redirectTo);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!mounted) return null;

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