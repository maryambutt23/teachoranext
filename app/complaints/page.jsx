"use client";

import { useState, useEffect } from "react";
import styles from "./Complaints.module.css";

export default function Complaints() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("student");
  const [list, setList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setList(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComplaint = {
      id: Date.now(),
      text,
      role,
      date: new Date().toLocaleString(),
    };

    const updated = [...list, newComplaint];

    setList(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));

    setText("");
  };

  const handleDelete = (id) => {
    const updated = list.filter((c) => c.id !== id);
    setList(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  return (
    <div className={styles.complaintsPage}>

      <h1>Submit Complaint</h1>

      <form onSubmit={handleSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <textarea
          placeholder="Write your complaint..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <h2>Recent Complaints</h2>

      <div className={styles.list}>
        {list.map((c) => (
          <div key={c.id} className={styles.card}>

            <span className={c.role === "teacher"
              ? styles.roleTeacher
              : styles.roleStudent
            }>
              {c.role}
            </span>

            <p>{c.text}</p>

            <small>{c.date}</small>

            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(c.id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}