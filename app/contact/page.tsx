import Link from "next/link";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getLinks } from "@/lib/data";

export const metadata = {
  title: "Contact",
  description: "Contact information and professional links.",
};

export default function ContactPage() {
  const links = getLinks();

  return (
    <div>
      <SectionHeading title="Contact" subtitle="Connect via email or research profiles." />
      <Card className="max-w-2xl">
        <ul className="space-y-3 text-zinc-700 dark:text-zinc-300">
          <li>
            Email: <Link className="text-brand-700 dark:text-brand-100" href={`mailto:${links.email}`}>{links.email}</Link>
          </li>
          <li>
            GitHub: <Link className="text-brand-700 dark:text-brand-100" href={links.github} target="_blank">{links.github}</Link>
          </li>
          <li>
            LinkedIn: <Link className="text-brand-700 dark:text-brand-100" href={links.linkedin} target="_blank">{links.linkedin}</Link>
          </li>
          <li>
            Google Scholar: <Link className="text-brand-700 dark:text-brand-100" href={links.scholar} target="_blank">{links.scholar}</Link>
          </li>
        </ul>
      </Card>
    </div>
  );
}
