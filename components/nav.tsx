import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getLinks } from "@/lib/data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/publications", label: "Publications" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/achievements", label: "Achievements" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const links = getLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/95 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/95">
      <div className="section-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100" aria-label="Go to home page">
          {links.name}
        </Link>
        <nav className="order-3 w-full overflow-x-auto sm:order-2 sm:w-auto" aria-label="Primary">
          <ul className="flex min-w-max items-center gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={`Navigate to ${item.label}`}
                  className="rounded-md px-2.5 py-1.5 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="order-2 sm:order-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
