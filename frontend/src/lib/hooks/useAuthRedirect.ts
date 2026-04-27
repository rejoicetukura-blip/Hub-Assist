import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

interface UseAuthRedirectOptions {
  /** Redirect to this path if not authenticated (default: "/login") */
  loginPath?: string;
  /** Redirect to this path if already authenticated (default: "/dashboard") */
  dashboardPath?: string;
  /** If true, redirect authenticated users away from auth pages */
  redirectIfAuthenticated?: boolean;
  /** If true, redirect unauthenticated users to login */
  requireAuth?: boolean;
}

/**
 * Hook that handles authentication-based redirects
 * Used on auth pages and protected routes
 */
export function useAuthRedirect(options: UseAuthRedirectOptions = {}) {
  const {
    loginPath = "/login",
    dashboardPath = "/dashboard",
    redirectIfAuthenticated = false,
    requireAuth = false,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    // Don't redirect while auth state is loading
    if (isLoading) return;

    // Redirect authenticated users away from auth pages
    if (redirectIfAuthenticated && isAuthenticated) {
      // Don't redirect if already on the dashboard path
      if (!pathname.startsWith(dashboardPath)) {
        router.replace(dashboardPath);
      }
      return;
    }

    // Redirect unauthenticated users to login
    if (requireAuth && !isAuthenticated) {
      // Don't redirect if already on the login path
      if (!pathname.startsWith(loginPath)) {
        // Preserve the intended destination
        const returnUrl = encodeURIComponent(pathname);
        router.replace(`${loginPath}?returnUrl=${returnUrl}`);
      }
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    pathname,
    router,
    loginPath,
    dashboardPath,
    redirectIfAuthenticated,
    requireAuth,
  ]);

  return {
    isAuthenticated,
    isLoading,
    user,
    /** Manually redirect to login */
    redirectToLogin: (returnUrl?: string) => {
      const url = returnUrl 
        ? `${loginPath}?returnUrl=${encodeURIComponent(returnUrl)}`
        : loginPath;
      router.push(url);
    },
    /** Manually redirect to dashboard */
    redirectToDashboard: () => {
      router.push(dashboardPath);
    },
  };
}