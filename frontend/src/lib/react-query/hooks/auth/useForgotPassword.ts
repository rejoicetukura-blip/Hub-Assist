"use client";

import { useMutation } from "@tanstack/react-query";
import { post } from "@/lib/apiClient";
import { mutationKeys } from "@/lib/react-query/keys/mutationKeys";

export function useForgotPassword() {
  return useMutation({
    mutationKey: mutationKeys.auth.forgotPassword,
    mutationFn: (email: string) => post<{ message: string }>("/auth/forgot-password", { email }),
  });
}
