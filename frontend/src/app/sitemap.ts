import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://hubassist.io";
  const now = new Date();
  const pages = ["/", "/login", "/register", "/forgot-password", "/workspaces"];
  return pages.map((path) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 }));
}
