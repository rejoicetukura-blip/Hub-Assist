import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btnBase =
    "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors disabled:opacity-40";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={cn(btnBase, "border border-[#D7CFC6] hover:bg-[#EDE2D6]")}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            btnBase,
            p === page
              ? "bg-[#1A1A1A] text-[#F3EBE2]"
              : "border border-[#D7CFC6] hover:bg-[#EDE2D6]"
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={cn(btnBase, "border border-[#D7CFC6] hover:bg-[#EDE2D6]")}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {onPageSizeChange && pageSize && (
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="ml-2 rounded-full border border-[#D7CFC6] bg-[#EDE2D6] px-3 py-1 text-sm text-[#1A1A1A] focus:outline-none"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>{s} / page</option>
          ))}
        </select>
      )}
    </div>
  );
}
