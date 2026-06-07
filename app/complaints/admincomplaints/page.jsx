"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Complaints.module.css";

export default function AdminComplaints() {
  const STORAGE_KEY = "complaints";
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("adminUser"));

    if (!admin || admin.role !== "admin") {
      router.replace("/auth/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const normalized = stored.map((c) => ({
      ...c,
      status: c.status || "pending",
    }));

    setData(normalized);
    setCheckingAuth(false);
  }, [router]);

  const saveData = (updated) => {
    setData(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteComplaint = (id) => {
    const updated = data.filter((c) => c.id !== id);
    saveData(updated);
  };

  const markResolved = (id) => {
    const updated = data.map((c) =>
      c.id === id ? { ...c, status: "resolved" } : c
    );
    saveData(updated);
  };

  const filteredData = data
    .filter((c) => {
      if (filter === "all") return true;
      if (filter === "pending") return c.status === "pending";
      if (filter === "resolved") return c.status === "resolved";
      if (filter === "student") return c.role === "student";
      if (filter === "teacher") return c.role === "teacher";
      return true;
    })
    .filter((c) =>
      (c.text || "").toLowerCase().includes(search.toLowerCase())
    );

  if (checkingAuth) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.complaintsPage}>
      <h1>Admin Complaints Dashboard</h1>

      <input
        className={styles.input}
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.filterBar}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("resolved")}>Resolved</button>
        <button onClick={() => setFilter("student")}>Students</button>
        <button onClick={() => setFilter("teacher")}>Teachers</button>
      </div>

      <div className={styles.list}>
        {filteredData.length === 0 ? (
          <div className={styles.card}>
            No complaints found.
          </div>
        ) : (
          filteredData.map((c) => (
            <div key={c.id} className={styles.card}>
              
              <div className={styles.tags}>
                <span
                  className={`${styles.role} ${
                    c.role === "teacher"
                      ? styles.roleTeacher
                      : styles.roleStudent
                  }`}
                >
                  {c.role}
                </span>

                <span
                  className={
                    c.status === "resolved"
                      ? styles.resolved
                      : styles.pending
                  }
                >
                  {c.status}
                </span>
              </div>

              <p>{c.text || "No complaint text"}</p>

              <div className={styles.date}>{c.date}</div>

              <div className={styles.actions}>
                <button onClick={() => deleteComplaint(c.id)}>
                  Delete
                </button>

                {c.status !== "resolved" && (
                  <button onClick={() => markResolved(c.id)}>
                    Mark Resolved
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}