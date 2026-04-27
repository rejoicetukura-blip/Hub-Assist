import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://hubassist.io";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard/", "/profile/", "/settings/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
