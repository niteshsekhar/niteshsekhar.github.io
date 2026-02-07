import Link from "next/link";
import { Card } from "@/components/card";
import { type Publication } from "@/lib/schemas";

type PublicationListProps = {
  grouped: Record<string, Publication[]>;
};

export function PublicationList({ grouped }: PublicationListProps) {
  const years = Object.keys(grouped).sort((a, b) => {
    if (a === "Year TBD") return 1;
    if (b === "Year TBD") return -1;
    return Number(b) - Number(a);
  });

  if (years.length === 0) {
    return (
      <Card>
        <p className="text-zinc-600 dark:text-zinc-300">No publications match the current filters.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      {years.map((yearLabel) => (
        <section key={yearLabel} aria-label={`Publications in ${yearLabel}`}>
          <h3 className="mb-5 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
            {yearLabel}
          </h3>
          <div className="space-y-5">
            {grouped[yearLabel].map((publication, index) => (
              <Card key={`${publication.title}-${publication.venue}-${publication.year}`} className={index < 2 ? "fade-up-delay-1" : "fade-up-delay-2"}>
                <h4 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {publication.title}
                </h4>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {publication.authors.length > 0 ? publication.authors.join(", ") : "Authors unavailable"}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  <span className="italic">{publication.venue || "Venue TBD"}</span>
                  {" · "}
                  {publication.year ?? "Year TBD"}
                  {typeof publication.citationCount === "number" ? ` · ${publication.citationCount} citations` : ""}
                </p>
                {publication.summary ? (
                  <p className="mt-4 text-zinc-700 dark:text-zinc-300">{publication.summary}</p>
                ) : null}
                {publication.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {publication.tags.map((tag) => (
                      <span
                        key={`${publication.title}-${tag}`}
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {publication.links?.pdf ? <Action href={publication.links.pdf} label="PDF" title={publication.title} /> : null}
                  {publication.links?.arxiv ? <Action href={publication.links.arxiv} label="ArXiv" title={publication.title} /> : null}
                  {publication.links?.code ? <Action href={publication.links.code} label="Code" title={publication.title} /> : null}
                  {publication.links?.scholar ? <Action href={publication.links.scholar} label="Scholar" title={publication.title} /> : null}
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

type ActionProps = {
  href: string;
  label: string;
  title: string;
};

function Action({ href, label, title }: ActionProps) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={`${label} link for ${title}`}
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 transition hover:border-brand-600 hover:text-brand-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-100 dark:hover:text-brand-100"
    >
      {label}
    </Link>
  );
}
