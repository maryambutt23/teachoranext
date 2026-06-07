"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Admin.module.css";

export default function Admin() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const admin = JSON.parse(localStorage.getItem("adminUser"));

    if (!admin || admin.role !== "admin") {
      router.replace("/auth/login");
      return;
    }

    loadData();
    setCheckingAuth(false);
  }, [router]);

  const loadData = () => {
    if (typeof window === "undefined") return;

    const complaintsData =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const enrollmentsData =
      JSON.parse(localStorage.getItem("enrollments")) || [];

    setComplaints(Array.isArray(complaintsData) ? complaintsData : []);
    setEnrollments(Array.isArray(enrollmentsData) ? enrollmentsData : []);
  };

  const deleteComplaint = (index) => {
    if (typeof window === "undefined") return;

    const updated = complaints.filter((_, i) => i !== index);

    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
  };

  const deleteEnrollment = (index) => {
    if (typeof window === "undefined") return;

    const updated = enrollments.filter((_, i) => i !== index);

    localStorage.setItem("enrollments", JSON.stringify(updated));
    setEnrollments(updated);
  };

  const logout = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("adminUser");
    router.replace("/");
  };

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.header}>
        <h1 className={styles.adminTitle}>Admin Dashboard</h1>

        <button onClick={logout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <h3>Total Complaints</h3>
          <p>{complaints.length}</p>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Student Complaints</h3>
          <p>{complaints.filter((c) => c.role === "student").length}</p>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Teacher Complaints</h3>
          <p>{complaints.filter((c) => c.role === "teacher").length}</p>
        </div>

        <div className={styles.dashboardCard}>
          <h3>Total Enrollments</h3>
          <p>{enrollments.length}</p>
        </div>
      </div>

      <div className={styles.dashboardSection}>
        <h2>Complaints</h2>

        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          complaints.map((c, i) => (
            <div key={i} className={styles.recentItem}>
              <strong>{c.role}</strong>
              <p>{c.text}</p>
              <small>{c.date}</small>

              <button
                onClick={() => deleteComplaint(i)}
                className={styles.deleteBtn}
              >
                Delete Complaint
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.dashboardSection}>
        <h2>Student Enrollments</h2>

        {enrollments.length === 0 ? (
          <p>No enrollments found.</p>
        ) : (
          enrollments.map((e, i) => (
            <div key={i} className={styles.recentItem}>
              <strong>{e.studentName}</strong>
              <p>Email: {e.studentEmail}</p>
              <p>Phone: {e.studentPhone}</p>
              <p>Address: {e.studentAddress}</p>
              <p><b>Teacher:</b> {e.teacherName}</p>
              <p><b>Subject:</b> {e.subject}</p>

              <button
                onClick={() => deleteEnrollment(i)}
                className={styles.deleteBtn}
              >
                Delete Enrollment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}