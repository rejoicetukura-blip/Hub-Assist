"use client";

import { useState } from "react";
import { Fingerprint, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import apiClient from "@/lib/apiClient";
import { Button } from "@/components/ui/Button";

interface BiometricLoginViewProps {
  onSuccess?: () => void;
  onFallback?: () => void;
}

export function BiometricLoginView({ onSuccess, onFallback }: BiometricLoginViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const login = useAuthStore((s) => s.login);

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        setIsSupported(false);
        setError("Biometric authentication is not supported on this device or browser.");
        return;
      }

      // Step 1: Get authentication options from server
      const { data: options } = await apiClient.post("/auth/biometric/login-options");

      // Step 2: Use WebAuthn to authenticate
      let credential;
      try {
        // Import dynamically to avoid SSR issues
        const { startAuthentication } = await import('@simplewebauthn/browser');
        credential = await startAuthentication(options);
      } catch (authError: unknown) {
        const e = authError as { name?: string };
        if (e.name === "NotAllowedError") {
          setError("Biometric authentication was cancelled or failed.");
        } else if (e.name === "NotSupportedError") {
          setError("Biometric authentication is not supported on this device.");
          setIsSupported(false);
        } else {
          setError("Biometric authentication failed. Please try again.");
        }
        return;
      }

      // Step 3: Verify the authentication with the server
      const { data: authResult } = await apiClient.post("/auth/biometric/login-verify", {
        credential,
      });

      // Step 4: Update auth state and redirect
      login({
        access_token: authResult.access_token,
        user: authResult.user,
      });

      onSuccess?.();
      
      // Redirect to dashboard
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      console.error("Biometric login error:", err);
      const e = err as { response?: { data?: { message?: string } } };
      setError(
        e.response?.data?.message || 
        "Biometric authentication failed. Please try again or use password login."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <p className="text-sm text-yellow-800">
            Biometric authentication is not available on this device or browser.
          </p>
        </div>
        {onFallback && (
          <Button
            type="button"
            variant="outline"
            onClick={onFallback}
            className="w-full"
          >
            Use password instead
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-mint rounded-full mb-4">
          <Fingerprint className="w-8 h-8 text-text" />
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">Biometric Login</h3>
        <p className="text-sm text-text-secondary mb-4">
          Use your fingerprint, face, or other biometric to sign in securely.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <Button
        type="button"
        onClick={handleBiometricLogin}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Authenticating...
          </>
        ) : (
          <>
            <Fingerprint className="w-4 h-4 mr-2" />
            Sign in with Biometrics
          </>
        )}
      </Button>

      {onFallback && (
        <Button
          type="button"
          variant="ghost"
          onClick={onFallback}
          className="w-full text-text-secondary hover:text-text"
        >
          Use password instead
        </Button>
      )}
    </div>
  );
}
