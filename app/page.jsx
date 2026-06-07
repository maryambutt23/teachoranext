"use client";

import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.home}>
      <div className={styles.heroSection}>
        <h1>Learn From The Best Teachers</h1>

        <p>Modern online teaching platform.</p>

        <div className={styles.heroButtons}>
          <button
            className={styles.btnPrimary}
            onClick={() => router.push("/courses")}
          >
            Explore Courses
          </button>

          <button
            className={styles.btnSecondary}
            onClick={() => router.push("/teachers")}
          >
            Find Teacher
          </button>
        </div>
      </div>
    </div>
  );
}