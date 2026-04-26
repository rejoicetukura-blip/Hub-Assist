"use client";

import { useAuthStore } from "@/lib/store/authStore";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-[#1A1A1A]">
        Welcome back{user?.name ? `, ${user.name}` : ""}
      </h1>
      <p className="text-sm text-[#6B6B6B]">Here&apos;s what&apos;s happening in your workspace today.</p>
    </div>
  );
}
