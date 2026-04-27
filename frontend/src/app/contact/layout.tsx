import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — HubAssist",
  description: "Get in touch with HubAssist. Send us a message and we'll get back to you as soon as possible.",
  keywords: ["contact", "support", "help", "workspace management", "coworking"],
  openGraph: {
    title: "Contact Us — HubAssist",
    description: "Get in touch with HubAssist. Send us a message and we'll get back to you as soon as possible.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}