import * as React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/cn";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  onDismiss?: () => void;
}

const config: Record<AlertVariant, { icon: React.ElementType; classes: string }> = {
  success: { icon: CheckCircle, classes: "bg-[#EAF3E8] border-[#A8C5A0] text-[#1A1A1A]" },
  error:   { icon: XCircle,     classes: "bg-[#F9EDE8] border-[#D4916E] text-[#1A1A1A]" },
  warning: { icon: AlertTriangle,classes: "bg-[#FDF5E6] border-[#D4B96E] text-[#1A1A1A]" },
  info:    { icon: Info,         classes: "bg-[#EAF0F9] border-[#8AAAD4] text-[#1A1A1A]" },
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", onDismiss, children, ...props }, ref) => {
    const { icon: Icon, classes } = config[variant];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn("flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm", classes, className)}
        {...props}
      >
        <Icon className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1">{children}</div>
        {onDismiss && (
          <button onClick={onDismiss} aria-label="Dismiss" className="shrink-0 opacity-60 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert };
export type { AlertVariant };
