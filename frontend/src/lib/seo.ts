import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hubassist.io";

export function generateMetadata(title: string, description: string, path = "/"): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    openGraph: { title, description, url, siteName: "HubAssist", type: "website", images: [{ url: `${BASE_URL}/og-image.png` }] },
    twitter: { card: "summary_large_image", title, description, images: [`${BASE_URL}/og-image.png`] },
    alternates: { canonical: url },
  };
}
