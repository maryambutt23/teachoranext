"use client";

import { usePathname } from "next/navigation";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/admin/login";

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