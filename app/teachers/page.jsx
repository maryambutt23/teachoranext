"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Teachers.module.css";
import TeacherCard from "../components/cards/TeacherCard";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    let updated = [...teachers];

    if (search) {
      updated = updated.filter((t) =>
        t.subject.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priceFilter === "low") {
      updated = updated.filter((t) => t.price < 3000);
    }

    if (priceFilter === "high") {
      updated = updated.filter((t) => t.price >= 3000);
    }

    if (ratingFilter === "4+") {
      updated = updated.filter((t) => t.rating >= 4);
    }

    if (ratingFilter === "4.5+") {
      updated = updated.filter((t) => t.rating >= 4.5);
    }

    setFilteredTeachers(updated);
  }, [search, priceFilter, ratingFilter, teachers]);

  const fetchTeachers = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const subjects = [
      "React JS",
      "UI UX Design",
      "Mathematics",
      "Physics",
      "English",
      "Graphic Design",
      "Programming",
      "Web Development",
    ];

    const formatted = res.data.map((user, index) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      subject: subjects[index % subjects.length],
      price: Math.floor(Math.random() * 5000) + 1000,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
    }));

    setTeachers(formatted);
    setFilteredTeachers(formatted);
  };

  return (
    <div className={styles.teachersPage}>
      <div className={styles.header}>
        <h1>Explore Teachers</h1>
        <p>Find professional teachers for your learning journey.</p>
      </div>

      <div className={styles.filters}>
        <input
          className={styles.input}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.select}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Price</option>
          <option value="low">Under 3000</option>
          <option value="high">Above 3000</option>
        </select>

        <select
          className={styles.select}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="">Rating</option>
          <option value="4+">4+</option>
          <option value="4.5+">4.5+</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}