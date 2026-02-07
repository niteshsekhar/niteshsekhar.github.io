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
      <PublicationsClient publications={publications} />
    </div>
  );
}
