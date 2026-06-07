"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./DashBoardLayout.module.css";

export default function DashboardLayout({ children }) {

  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">

        <h2 className="logo">Teachora</h2>

        <Link className={isActive("/") ? "active" : ""} href="/">
          Home
        </Link>

        <Link className={isActive("/teachers") ? "active" : ""} href="/teachers">
          Teachers
        </Link>

        <Link className={isActive("/admin") ? "active" : ""} href="/admin">
          Admin
        </Link>

        <Link className={isActive("/courses") ? "active" : ""} href="/courses">
          Courses
        </Link>

        <Link className={isActive("/complaints") ? "active" : ""} href="/complaints">
          Complaints
        </Link>

      </div>

      {/* MAIN AREA */}
      <div className="main">

        <div className="topbar">
          Teachora Dashboard
        </div>

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}