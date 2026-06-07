"use client";

import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const login = (email, password) => {
    if (email === "admin@teachora.com" && password === "1234") {
      localStorage.setItem(
        "adminUser",
        JSON.stringify({ role: "admin", email })
      );
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}