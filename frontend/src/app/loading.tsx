export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#C5BEB6]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D7CFC6] border-t-[#1A1A1A]" />
        <p className="text-sm text-[#6B6B6B]">Loading…</p>
      </div>
    </div>
  );
}
