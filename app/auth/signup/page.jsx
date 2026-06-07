"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("adminUser"));

    if (!admin) {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}