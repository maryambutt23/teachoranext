"use client";

import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <h1>Teachora</h1>

      <div className={styles.navbarRight}>
        <span>Welcome</span>
      </div>
    </div>
  );
}