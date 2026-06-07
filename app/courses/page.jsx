"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Courses.module.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const router = useRouter();
  const STORAGE_KEY = "enrollments";

  const subjectData = {
    "React JS":
      "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    "UI UX Design":
      "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    Mathematics:
      "https://cdn-icons-png.flaticon.com/512/3334/3334886.png",
    Physics:
      "https://cdn-icons-png.flaticon.com/512/2942/2942928.png",
    English:
      "https://cdn-icons-png.flaticon.com/512/167/167707.png",
    "Graphic Design":
      "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    Programming:
      "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
    "Web Development":
      "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const subjects = Object.keys(subjectData);
    let all = [];

    res.data.forEach((t) => {
      const subject = subjects[t.id % subjects.length];

      ["Basics", "Advanced", "Projects"].forEach(
        (level, i) => {
          all.push({
            id: `${t.id}-${i}`,
            title: `${subject} ${level}`,
            subject,
            teacher: t.name,
            teacherId: t.id,
          });
        }
      );
    });

    setCourses(all);
  };

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const submitEnrollment = () => {
    if (
      !student.name ||
      !student.email ||
      !student.phone ||
      !student.address
    ) {
      alert("Please fill all fields");
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    let list = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(list)) list = [];

    list.push({
      type: "course",
      itemTitle: selectedCourse.title,
      subject: selectedCourse.subject,
      teacherName: selectedCourse.teacher,
      teacherId: selectedCourse.teacherId,

      studentName: student.name,
      studentEmail: student.email,
      studentPhone: student.phone,
      studentAddress: student.address,

      time: new Date().toISOString(),
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list)
    );

    alert("Enrolled Successfully!");

    setShowForm(false);

    setStudent({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const filtered = courses.filter((c) =>
    c.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={styles.coursesPage}>
      <h1>Courses</h1>

      <input
        className={styles.searchBox}
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className={styles.coursesGrid}>
        {filtered.map((c) => (
          <div
            key={c.id}
            className={styles.courseCard}
          >
            <h3>{c.title}</h3>
            <p>{c.subject}</p>

            <button
              onClick={() =>
                router.push(
                  `/teachers/${c.teacherId}`
                )
              }
            >
              Teacher
            </button>

            <button
              onClick={() => handleEnroll(c)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showForm && (
        <div className={styles.modal}>
          <div className={styles.form}>
            <h2>Student Enrollment</h2>

            <input
              placeholder="Name"
              value={student.name}
              onChange={(e) =>
                setStudent({
                  ...student,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={student.email}
              onChange={(e) =>
                setStudent({
                  ...student,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone"
              value={student.phone}
              onChange={(e) =>
                setStudent({
                  ...student,
                  phone: e.target.value,
                })
              }
            />

            <input
              placeholder="Address"
              value={student.address}
              onChange={(e) =>
                setStudent({
                  ...student,
                  address: e.target.value,
                })
              }
            />

            <button onClick={submitEnrollment}>
              Submit
            </button>

            <button
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}