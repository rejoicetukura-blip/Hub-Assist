import { create } from "zustand/react";

export type UserRole = "admin" | "member" | "staff";

interface User {
  name: string;
  role: UserRole;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  clear: () => set({ token: null, user: null }),
}));
