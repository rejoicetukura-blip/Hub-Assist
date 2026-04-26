import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full";

    const variants = {
      primary: "bg-[#1A1A1A] text-[#F3EBE2] hover:bg-[#3D3D3D]",
      secondary: "bg-[#D7CFC6] text-[#1A1A1A] hover:bg-[#C5BEB6]",
      outline: "border border-[#D7CFC6] bg-transparent text-[#1A1A1A] hover:bg-[#EDE2D6]",
      ghost: "bg-transparent text-[#1A1A1A] hover:bg-[#EDE2D6]",
      destructive: "bg-[#D4916E] text-white hover:bg-[#c07a58]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-7 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
