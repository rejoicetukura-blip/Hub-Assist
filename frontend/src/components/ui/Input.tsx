import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold tracking-[0.1em] text-[#6B6B6B]">
            {label.toUpperCase()}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-4 text-[#6B6B6B]">{leftIcon}</span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-full border border-[#D7CFC6] bg-[#EDE2D6] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[#D4916E] focus:ring-[#D4916E]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-4 text-[#6B6B6B]">{rightIcon}</span>
          )}
        </div>
        {error && <p className="text-xs text-[#D4916E]">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#6B6B6B]">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
