import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface BreadCrumbItem {
  label: string;
  href?: string;
}

interface BreadCrumbProps {
  items: BreadCrumbItem[];
  className?: string;
}

export function BreadCrumb({ items, className }: BreadCrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#6B6B6B]" />}
            {isLast || !item.href ? (
              <span className={cn(isLast ? "text-[#1A1A1A] font-medium" : "text-[#6B6B6B]")}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
