import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Workspaces", description: "Browse and book available workspaces." };

export default function WorkspacesLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
