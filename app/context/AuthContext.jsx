"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (email, password) => {
    if (email === "admin@teachora.com" && password === "1234") {
      const admin = { role: "admin", email };

      localStorage.setItem("adminUser", JSON.stringify(admin));
      setUser(admin);

      return admin;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}