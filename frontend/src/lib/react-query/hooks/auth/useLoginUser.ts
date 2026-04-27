"use client";

import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/apiClient";
import { useAuthStore } from "@/lib/store/authStore";
import { mutationKeys } from "@/lib/react-query/keys/mutationKeys";
import type { User } from "@/types/user";

interface LoginPayload { email: string; password: string }
interface LoginResponse { access_token: string; user?: User }

export function useLoginUser() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationKey: mutationKeys.auth.login,
    mutationFn: (payload: LoginPayload) => post<LoginResponse>("/auth/login", payload),
    onSuccess: (data) => login(data),
  });
}
