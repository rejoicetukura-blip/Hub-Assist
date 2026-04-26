import { useCallback } from "react";
import { AxiosError } from "axios";

interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

interface ErrorDetails {
  message: string;
  statusCode?: number;
  type: "api" | "axios" | "network" | "validation" | "unknown";
  originalError?: any;
}

/**
 * Hook that extracts human-readable error messages from various error types
 */
export function useErrorHandler() {
  const handleError = useCallback((error: unknown): ErrorDetails => {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const data = error.response?.data as ApiError | undefined;

      // Network errors
      if (!error.response) {
        return {
          message: "Network error. Please check your connection and try again.",
          type: "network",
          originalError: error,
        };
      }

      // API errors with structured response
      if (data?.message) {
        return {
          message: data.message,
          statusCode: status,
          type: "api",
          originalError: error,
        };
      }

      // HTTP status-based messages
      const statusMessages: Record<number, string> = {
        400: "Invalid request. Please check your input and try again.",
        401: "Authentication required. Please sign in.",
        403: "Access denied. You don't have permission to perform this action.",
        404: "The requested resource was not found.",
        409: "Conflict. The resource already exists or is in use.",
        422: "Validation error. Please check your input.",
        429: "Too many requests. Please wait a moment and try again.",
        500: "Server error. Please try again later.",
        502: "Service temporarily unavailable. Please try again later.",
        503: "Service temporarily unavailable. Please try again later.",
      };

      return {
        message: status ? statusMessages[status] || `Request failed with status ${status}` : "Request failed",
        statusCode: status,
        type: "axios",
        originalError: error,
      };
    }

    // Handle API errors (structured error objects)
    if (error && typeof error === "object" && "message" in error) {
      const apiError = error as ApiError;
      return {
        message: apiError.message,
        statusCode: apiError.statusCode,
        type: "api",
        originalError: error,
      };
    }

    // Handle validation errors (from zod or similar)
    if (error && typeof error === "object" && "issues" in error) {
      const validationError = error as { issues: Array<{ message: string; path: string[] }> };
      const firstIssue = validationError.issues[0];
      return {
        message: firstIssue?.message || "Validation error",
        type: "validation",
        originalError: error,
      };
    }

    // Handle Error instances
    if (error instanceof Error) {
      return {
        message: error.message || "An unexpected error occurred",
        type: "unknown",
        originalError: error,
      };
    }

    // Handle string errors
    if (typeof error === "string") {
      return {
        message: error,
        type: "unknown",
        originalError: error,
      };
    }

    // Fallback for unknown error types
    return {
      message: "An unexpected error occurred. Please try again.",
      type: "unknown",
      originalError: error,
    };
  }, []);

  const getErrorMessage = useCallback((error: unknown): string => {
    return handleError(error).message;
  }, [handleError]);

  const isNetworkError = useCallback((error: unknown): boolean => {
    return handleError(error).type === "network";
  }, [handleError]);

  const isAuthError = useCallback((error: unknown): boolean => {
    const details = handleError(error);
    return details.statusCode === 401 || details.statusCode === 403;
  }, [handleError]);

  const isValidationError = useCallback((error: unknown): boolean => {
    const details = handleError(error);
    return details.type === "validation" || details.statusCode === 422;
  }, [handleError]);

  return {
    handleError,
    getErrorMessage,
    isNetworkError,
    isAuthError,
    isValidationError,
  };
}