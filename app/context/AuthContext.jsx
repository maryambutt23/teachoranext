"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("adminUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email, password) => {
    if (email === "admin@teachora.com" && password === "1234") {
      const userData = { email, role: "admin" };
      setUser(userData);

      if (typeof window !== "undefined") {
        localStorage.setItem("adminUser", JSON.stringify(userData));
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("adminUser");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}