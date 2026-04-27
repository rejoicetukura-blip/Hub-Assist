import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#C5BEB6] p-4 text-center">
      <div className="rounded-[24px] bg-[#F3EBE2] px-10 py-12 shadow-sm">
        <p className="text-7xl font-semibold text-[#1A1A1A]">404</p>
        <h1 className="mt-3 text-xl font-semibold text-[#1A1A1A]">Page not found</h1>
        <p className="mt-2 text-sm text-[#6B6B6B]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#3D3D3D] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
