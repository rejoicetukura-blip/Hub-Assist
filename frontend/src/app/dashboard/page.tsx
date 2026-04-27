import type { Metadata } from "next";
import { DashboardContent } from "@/app/dashboard/DashboardContent";

export const metadata: Metadata = { title: "Dashboard", description: "Manage your workspace, bookings, and attendance." };

export default function DashboardPage() {
  return <DashboardContent />;
}
