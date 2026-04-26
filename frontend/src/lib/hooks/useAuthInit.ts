import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { storage } from "@/lib/storage";

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
    const storedUser = storage.get("user");
    const storedSettings = storage.get("user-settings");

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, [initializeAuth, setUser, setSettings]);

  // Return auth state for convenience
  return useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
  }));
}