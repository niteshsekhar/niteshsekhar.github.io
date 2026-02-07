"use client";

import Link from "next/link";

type PublicationFiltersProps = {
  years: number[];
  venues: string[];
  tags: string[];
  selectedYear?: number;
  selectedVenue?: string;
  selectedTag?: string;
};

const buildHref = (year?: number, venue?: string, tag?: string) => {
  const params = new URLSearchParams();
  if (year) params.set("year", String(year));
  if (venue) params.set("venue", venue);
  if (tag) params.set("tag", tag);

  const query = params.toString();
  return query ? `/publications?${query}` : "/publications";
};

export function PublicationFilters({
  years,
  venues,
  tags,
  selectedYear,
  selectedVenue,
  selectedTag,
}: PublicationFiltersProps) {
  return (
    <div className="mb-10 fade-up grid gap-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-3">
      <FilterGroup
        label="Year"
        options={["All", ...years.map(String)]}
        selected={selectedYear ? String(selectedYear) : "All"}
        getHref={(option) => buildHref(option === "All" ? undefined : Number(option), selectedVenue, selectedTag)}
      />
      <FilterGroup
        label="Venue"
        options={["All", ...venues]}
        selected={selectedVenue ?? "All"}
        getHref={(option) => buildHref(selectedYear, option === "All" ? undefined : option, selectedTag)}
      />
      <FilterGroup
        label="Tag"
        options={["All", ...tags]}
        selected={selectedTag ?? "All"}
        getHref={(option) => buildHref(selectedYear, selectedVenue, option === "All" ? undefined : option)}
      />
    </div>
  );
}

type FilterGroupProps = {
  label: string;
  options: string[];
  selected: string;
  getHref: (option: string) => string;
};

function FilterGroup({ label, options, selected, getHref }: FilterGroupProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-200">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={`${label} filters`}>
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <Link
              key={`${label}-${option}`}
              href={getHref(option)}
              aria-label={`Filter publications by ${label}: ${option}`}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                isActive
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200"
              }`}
            >
              {option}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
