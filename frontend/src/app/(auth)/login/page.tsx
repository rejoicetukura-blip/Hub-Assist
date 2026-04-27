import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginContent } from "./LoginContent";

export const metadata: Metadata = { title: "Sign In", description: "Sign in to your HubAssist account." };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
