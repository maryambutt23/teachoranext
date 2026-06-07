"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthProvider";

export default function Protected({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/admin/login");
    }
  }, []);

  if (!isLoggedIn()) return null;

  return children;
}