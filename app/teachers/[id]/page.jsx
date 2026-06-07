"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TeacherDetails.module.css";

export default function TeacherDetails({ params }) {
  const { id } = params; // ✅ correct in your setup

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      setTeacher({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        website: res.data.website,
        company: res.data.company?.name,
        subject: "React JS",
        price: 3000,
        rating: 4.5,
        bio: "Experienced teacher",
        courses: ["React", "JS", "Next.js"],
      });
    };

    fetch();
  }, [id]);

  if (!teacher) return <h2>Loading...</h2>;

  return (
    <div className={styles.page}>
      <h1>{teacher.name}</h1>
      <p>{teacher.email}</p>
    </div>
  );
}