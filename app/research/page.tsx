import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getResearch } from "@/lib/data";

export const metadata = {
  title: "Research",
  description: "Research narratives in 3D perception, interactive AI systems, and multimodal foundation models.",
};

export default function ResearchPage() {
  const sections = getResearch();

  return (
    <div>
      <SectionHeading title="Research" subtitle="Themes that connect methods, systems, and measurable impact." />
      <div className="space-y-8">
        {sections.map((section) => (
          <Card key={section.slug}>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{section.title}</h3>
            <p className="mt-3 text-zinc-700 dark:text-zinc-300">{section.description}</p>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <SubSection title="Key Ideas" items={section.keyIdeas} />
              <SubSection title="Representative Publications" items={section.representativePublications} />
              <SubSection title="Systems Impact" items={section.systemsImpact} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

type SubSectionProps = {
  title: string;
  items: string[];
};

function SubSection({ title, items }: SubSectionProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">{title}</h4>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
