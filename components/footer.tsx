import Link from "next/link";
import { getLinks } from "@/lib/data";

export function Footer() {
  const links = getLinks();

  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="section-shell flex flex-col items-start justify-between gap-4 py-10 text-sm text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-center">
        <p>{`© ${new Date().getFullYear()} ${links.name}`}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={`mailto:${links.email}`} className="rounded-sm hover:text-brand-700 dark:hover:text-brand-100" aria-label="Email Nitesh Sekhar">
            Email
          </Link>
          <Link href={links.github} target="_blank" className="rounded-sm hover:text-brand-700 dark:hover:text-brand-100" aria-label="Open GitHub profile">
            GitHub
          </Link>
          <Link href={links.linkedin} target="_blank" className="rounded-sm hover:text-brand-700 dark:hover:text-brand-100" aria-label="Open LinkedIn profile">
            LinkedIn
          </Link>
          <Link href={links.scholar} target="_blank" className="rounded-sm hover:text-brand-700 dark:hover:text-brand-100" aria-label="Open Google Scholar profile">
            Scholar
          </Link>
        </div>
      </div>
    </footer>
  );
}
