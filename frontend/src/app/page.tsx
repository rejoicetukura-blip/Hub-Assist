import type { Metadata } from "next";
import { HubassistLandingPage } from "@/components/landing/HubassistLandingPage";
import { generateMetadata as gen } from "@/lib/seo";

export const metadata: Metadata = gen(
  "HubAssist — Workspace Management",
  "Streamline coworking and workspace management with HubAssist, powered by Stellar.",
  "/"
);

export default function Page() {
  return <HubassistLandingPage />;
}
