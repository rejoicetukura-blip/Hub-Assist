"use client";

import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/apiClient";
import { useAuthStore } from "@/lib/store/authStore";
import { mutationKeys } from "@/lib/react-query/keys/mutationKeys";
import type { User } from "@/types/user";

interface RegisterPayload { firstname: string; lastname: string; email: string; password: string }
interface RegisterResponse { access_token?: string; user?: User; message?: string }

export function useRegisterUser() {
  const register = useAuthStore((s) => s.register);
  return useMutation({
    mutationKey: mutationKeys.auth.register,
    mutationFn: (payload: RegisterPayload) => post<RegisterResponse>("/auth/register", payload),
    onSuccess: (data) => { if (data.access_token) register({ access_token: data.access_token, user: data.user }); },
  });
}
