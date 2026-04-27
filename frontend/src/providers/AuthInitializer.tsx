"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function AuthInitializer() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  useEffect(() => { initializeAuth(); }, [initializeAuth]);
  return null;
}
