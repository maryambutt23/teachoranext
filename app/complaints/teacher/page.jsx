"use client";

import { useEffect, useState } from "react";
import styles from "../Complaints.module.css";

export default function TeacherComplaints() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints")) || [];

    const filtered = all.filter((c) => c.role === "teacher");

    setData(filtered);
  }, []);

  return (
    <div className={styles.complaintsPage}>
      <h1>Teacher Complaints</h1>

      <div className={styles.list}>
        {data.length === 0 ? (
          <p>No teacher complaints found.</p>
        ) : (
          data.map((c) => (
            <div key={c.id} className={styles.card}>

              <span className={`${styles.role} ${styles.roleTeacher}`}>
                Teacher
              </span>

              <p>{c.text}</p>

              <div className={styles.date}>
                {c.date}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}