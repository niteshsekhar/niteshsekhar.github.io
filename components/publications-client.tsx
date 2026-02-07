"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PublicationFilters } from "@/components/publication-filters";
import { type Publication } from "@/lib/schemas";

type PublicationsClientProps = {
  publications: Publication[];
};

function sortPublicationsByYear(publications: Publication[]) {
  return [...publications].sort((a, b) => {
    if (a.year === null && b.year === null) return a.title.localeCompare(b.title);
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return b.year - a.year || a.title.localeCompare(b.title);
  });
}

function filterPublications(
  publications: Publication[],
  filters: { year?: number; venue?: string; tag?: string },
) {
  return publications.filter((publication) => {
    const matchesYear = !filters.year || publication.year === filters.year;
    const matchesVenue = !filters.venue || publication.venue === filters.venue;
    const matchesTag = !filters.tag || publication.tags.includes(filters.tag);
    return matchesYear && matchesVenue && matchesTag;
  });
}

function groupPublicationsByYear(publications: Publication[]) {
  const sorted = sortPublicationsByYear(publications);
  return sorted.reduce<Record<string, Publication[]>>((acc, publication) => {
    const key = publication.year === null ? "Year TBD" : String(publication.year);
    if (!acc[key]) acc[key] = [];
    acc[key].push(publication);
    return acc;
  }, {});
}

export function PublicationsClient({ publications }: PublicationsClientProps) {
  const searchParams = useSearchParams();
  const yearParam = searchParams.get("year");
  const venueParam = searchParams.get("venue") ?? undefined;
  const tagParam = searchParams.get("tag") ?? undefined;

  const parsedYear = yearParam ? Number(yearParam) : undefined;
  const filters = {
    year: Number.isFinite(parsedYear) ? parsedYear : undefined,
    venue: venueParam,
    tag: tagParam,
  };

  const filtered = sortPublicationsByYear(filterPublications(publications, filters));
  const grouped = groupPublicationsByYear(filtered);

  const years = [
    ...new Set(
      publications
        .map((publication) => publication.year)
        .filter((year): year is number => year !== null),
    ),
  ].sort((a, b) => b - a);

  const venues = [...new Set(publications.map((publication) => publication.venue))]
    .sort((a, b) => a.localeCompare(b))
    .filter((venue) => venue.trim().length > 0);

  const tags = [...new Set(publications.flatMap((publication) => publication.tags))].sort((a, b) =>
    a.localeCompare(b),
  );

  const yearGroups = Object.keys(grouped).sort((a, b) => {
    if (a === "Year TBD") return 1;
    if (b === "Year TBD") return -1;
    return Number(b) - Number(a);
  });

  return (
    <>
      <PublicationFilters
        years={years}
        venues={venues}
        tags={tags}
        selectedYear={filters.year}
        selectedVenue={filters.venue}
        selectedTag={filters.tag}
      />

      {yearGroups.length === 0 ? (
        <article className="fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-card dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
          <p className="text-zinc-600 dark:text-zinc-300">No publications match the current filters.</p>
        </article>
      ) : (
        <div className="space-y-10">
          {yearGroups.map((yearLabel) => (
            <section key={yearLabel} aria-label={`Publications in ${yearLabel}`}>
              <h3 className="mb-5 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                {yearLabel}
              </h3>
              <div className="space-y-5">
                {grouped[yearLabel].map((publication, index) => (
                  <article
                    key={`${publication.title}-${publication.venue}-${publication.year}`}
                    className={`fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7 ${
                      index < 2 ? "fade-up-delay-1" : "fade-up-delay-2"
                    }`}
                  >
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
                      {typeof publication.citationCount === "number"
                        ? ` · ${publication.citationCount} citations`
                        : ""}
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
                      {publication.links?.pdf ? (
                        <Action href={publication.links.pdf} label="PDF" title={publication.title} />
                      ) : null}
                      {publication.links?.arxiv ? (
                        <Action href={publication.links.arxiv} label="ArXiv" title={publication.title} />
                      ) : null}
                      {publication.links?.code ? (
                        <Action href={publication.links.code} label="Code" title={publication.title} />
                      ) : null}
                      {publication.links?.scholar ? (
                        <Action href={publication.links.scholar} label="Scholar" title={publication.title} />
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
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
