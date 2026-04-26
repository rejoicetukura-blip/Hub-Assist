import type { NavItem } from "@/types/landing";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export interface NavbarProps {
  readonly brand: string;
  readonly links: readonly NavItem[];
}

export function Navbar({ brand, links }: Readonly<NavbarProps>) {
  return (
    <nav className="flex items-center justify-between gap-6">
      <span className="text-xl font-medium tracking-tight text-text">{brand}</span>

      <div className="hidden items-center gap-7 md:flex">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-text-secondary transition-colors hover:text-text"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a href="/login" className="text-sm font-semibold text-text-secondary transition-colors hover:text-text">
          Sign in
        </a>
        <Button>Book a demo</Button>
      </div>
    </nav>
  );
}
