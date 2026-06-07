"use client";

import { useEffect, useState } from "react";
import styles from "./Enrollments.module.css";

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  const STORAGE_KEY = "enrollments";

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    setEnrollments(Array.isArray(data) ? data : []);
  }, []);

  const remove = (id) => {
    const updated = enrollments.filter(
      (i) => i.id !== id
    );

    setEnrollments(updated);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  return (
    <div className={styles.enrollPage}>
      <h1>My Learning</h1>

      {enrollments.length === 0 ? (
        <p>No enrollments yet</p>
      ) : (
        <div className={styles.enrollGrid}>
          {enrollments.map((item) => (
            <div
              key={item.id}
              className={styles.enrollCard}
            >
              <span className={styles.type}>
                {item.type}
              </span>

              <h3>
                {item.itemTitle ||
                  item.title ||
                  item.name}
              </h3>

              <p>{item.subject}</p>

              {item.teacherName && (
                <p>👨‍🏫 {item.teacherName}</p>
              )}

              <button
                onClick={() => remove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}