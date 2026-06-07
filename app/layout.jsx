"use client";

import { usePathname } from "next/navigation";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./context/AuthContext";

import "./globals.css";

function LayoutContent({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/signup";

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="app-content">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}