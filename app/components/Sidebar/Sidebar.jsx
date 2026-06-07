"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  FaHome,
  FaChalkboardTeacher,
  FaBook,
  FaExclamationCircle,
  FaUserShield,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const router = useRouter();
  const pathname = usePathname();

  const closeSidebar = () => setOpen(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
    closeSidebar();
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* OPEN BUTTON */}
      <button className={styles.menuBtn} onClick={() => setOpen(true)}>
        <FaBars />
      </button>

      {/* OVERLAY */}
      {open && <div className={styles.overlay} onClick={closeSidebar} />}

      {/* SIDEBAR */}
      <div className={`${styles.sidebar} ${open ? styles.show : ""}`}>

        {/* HEADER */}
        <div className={styles.sidebarTop}>
          <h2 className={styles.logo}>
            Teach<span>ora</span>
          </h2>

          <button className={styles.closeBtn} onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* LINKS */}
        <div className={styles.sidebarLinks}>

          <Link
            href="/"
            className={isActive("/") ? styles.active : ""}
            onClick={closeSidebar}
          >
            <FaHome />
            Home
          </Link>

          <Link
            href="/teachers"
            className={isActive("/teachers") ? styles.active : ""}
            onClick={closeSidebar}
          >
            <FaChalkboardTeacher />
            Teachers
          </Link>

          <Link
            href="/courses"
            className={isActive("/courses") ? styles.active : ""}
            onClick={closeSidebar}
          >
            <FaBook />
            Courses
          </Link>

          <Link
            href="/complaints"
            className={isActive("/complaints") ? styles.active : ""}
            onClick={closeSidebar}
          >
            <FaExclamationCircle />
            Complaints
          </Link>

          {/* ADMIN DASHBOARD */}
          <Link
            href="/admin/login?from=/admin"
            className={isActive("/admin") ? styles.active : ""}
            onClick={closeSidebar}
          >
            <FaUserShield />
            Admin Dashboard
          </Link>

          {/* ADMIN COMPLAINTS (YOUR REAL ROUTE) */}
          <Link
            href="/admin/login?from=/complaints/admincomplaints"
            className={isActive("/complaints/admincomplaints") ? styles.active : ""}
            onClick={closeSidebar}
          >
            <FaExclamationCircle />
            Admin Complaints
          </Link>

          {/* LOGOUT */}
          {user && (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>
      </div>
    </>
  );
}

export default Sidebar;