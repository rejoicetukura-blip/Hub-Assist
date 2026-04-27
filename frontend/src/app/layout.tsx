import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hubassist.io";

export const metadata: Metadata = {
  title: { default: "HubAssist — Workspace Management", template: "%s | HubAssist" },
  description: "HubAssist is a full-stack coworking and workspace management platform powered by Stellar.",
  openGraph: {
    siteName: "HubAssist",
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png` }],
  },
  twitter: { card: "summary_large_image", images: [`${BASE_URL}/og-image.png`] },
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
