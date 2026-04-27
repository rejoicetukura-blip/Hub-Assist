"use client";

interface ErrorProps { error: Error & { digest?: string }; reset: () => void }

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#C5BEB6] p-4 text-center">
      <div className="rounded-[24px] bg-[#F3EBE2] px-10 py-12 shadow-sm">
        <h1 className="text-xl font-semibold text-[#1A1A1A]">Something went wrong</h1>
        <p className="mt-2 text-sm text-[#6B6B6B]">An unexpected error occurred. Please try again.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 max-w-sm overflow-auto rounded-xl bg-[#EDE2D6] p-3 text-left text-xs text-[#3D3D3D]">
            {error.message}
          </pre>
        )}
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#3D3D3D] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
