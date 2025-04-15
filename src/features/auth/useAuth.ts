"use client";

import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  function login(user: unknown) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  function getUser() {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("user") || "null");
  }

  return { login, logout, getUser };
}
