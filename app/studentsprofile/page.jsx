"use client";

import { useState } from "react";
import { setStudentProfile } from "@/utils/StudentProfile";
import styles from "./StudentsProfile.module.css";

export default function StudentProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = () => {
    setStudentProfile(form);
    alert("Profile saved");
  };

  return (
    <div className={styles.container}>
      <h2>Student Profile</h2>

      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        className={styles.input}
      />

      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className={styles.input}
      />

      <input
        name="phone"
        onChange={handleChange}
        placeholder="Phone"
        className={styles.input}
      />

      <input
        name="address"
        onChange={handleChange}
        placeholder="Address"
        className={styles.input}
      />

      <button onClick={save} className={styles.button}>
        Save
      </button>
    </div>
  );
}