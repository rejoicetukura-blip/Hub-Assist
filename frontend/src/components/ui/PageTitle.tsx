import * as React from "react";
import { cn } from "@/lib/cn";
import { BreadCrumb } from "./BreadCrumb";

interface BreadCrumbItem {
  label: string;
  href?: string;
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadCrumbItem[];
  className?: string;
}

export function PageTitle({ title, subtitle, breadcrumb, className }: PageTitleProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {breadcrumb && <BreadCrumb items={breadcrumb} className="mb-1" />}
      <h1 className="text-2xl font-semibold text-[#1A1A1A]">{title}</h1>
      {subtitle && <p className="text-sm text-[#6B6B6B]">{subtitle}</p>}
    </div>
  );
}
