import * as React from "react";
import { cn } from "@/lib/cn";

interface ToggleOption<T extends string> {
  label: string;
  value: T;
}

interface ToggleBarProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ToggleBar<T extends string>({ options, value, onChange, className }: ToggleBarProps<T>) {
  return (
    <div
      role="tablist"
      className={cn("inline-flex rounded-full bg-[#D7CFC6] p-1 gap-1", className)}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={opt.value === value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            opt.value === value
              ? "bg-[#1A1A1A] text-[#F3EBE2]"
              : "text-[#6B6B6B] hover:text-[#1A1A1A]"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
