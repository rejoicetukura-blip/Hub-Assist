import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BlueCollar — Workspace Management',
  description: 'Coworking and workspace management powered by Stellar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
