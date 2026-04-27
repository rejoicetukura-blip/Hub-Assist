import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/lib/store/authStore";
import { storage } from "@/lib/storage";
import type { User, UserSettings } from "@/types/user";

/**
 * Hook that initializes auth state from storage on app mount
 * Should be called in a top-level component like authInitializer.tsx
 */
export function useAuthInit() {
  const { initializeAuth, setUser, setSettings } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from persisted storage
    initializeAuth();

    // Load additional user data from storage if available
    const storedUser = storage.get<User>("user");
    const storedSettings = storage.get<UserSettings>("user-settings");

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, [initializeAuth, setUser, setSettings]);

  // Return auth state for convenience
  return useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
    }))
  );
}