"use client";

import styles from "./TeacherCard.module.css";
import { useRouter } from "next/navigation";

export default function TeacherCard({ teacher }) {
  const router = useRouter();

  const price = Math.floor(Math.random() * 5000) + 1000;
  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <div
      className={styles.teacherCard}
      onClick={() => router.push(`/teachers/${teacher.id}`)}
    >
      <div className={styles.teacherImage}>
        <img
          src={`https://i.pravatar.cc/300?img=${teacher.id}`}
          alt={teacher.name}
        />
      </div>

      <div className={styles.teacherContent}>
        <span className={styles.subjectBadge}>
          {teacher.subject}
        </span>

        <h3 className={styles.teacherName}>{teacher.name}</h3>

        <p className={styles.teacherEmail}>{teacher.email}</p>

        <div className={styles.teacherMeta}>
          <span>⭐ {rating}</span>
          <span>PKR {price}</span>
        </div>

        <button className={styles.viewBtn}>
          View Profile
        </button>
      </div>
    </div>
  );
}