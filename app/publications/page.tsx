import { Suspense } from "react";
import { PublicationsClient } from "@/components/publications-client";
import { SectionHeading } from "@/components/section-heading";
import { getPublications } from "@/lib/data";

export const metadata = {
  title: "Publications",
  description: "Publications grouped by year with filters for year, venue, and tags.",
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <div>
      <SectionHeading title="Publications" subtitle="Peer-reviewed papers and research outputs." />
      <Suspense
        fallback={
          <article className="fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-card dark:border-zinc-800 dark:bg-zinc-900 sm:p-7">
            <p className="text-zinc-600 dark:text-zinc-300">Loading publications...</p>
          </article>
        }
      >
        <PublicationsClient publications={publications} />
      </Suspense>
    </div>
  );
}
