"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function useAuth({
  protectedRoute = false,
  redirectTo = "/login",
} = {}) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (protectedRoute && !storedToken) {
      router.replace(redirectTo);
    }

    setToken(storedToken);
    setLoading(false);
  }, [protectedRoute, redirectTo, router]);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  return { token, isAuthenticated: !!token, login, logout, loading };
}
