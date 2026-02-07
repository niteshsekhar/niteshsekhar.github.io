import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getAchievements } from "@/lib/data";

export const metadata = {
  title: "Achievements",
  description: "Research outcomes, shipped systems, and technical expertise.",
};

export default function AchievementsPage() {
  const achievements = getAchievements();

  return (
    <div>
      <SectionHeading title="Achievements" subtitle="Concise highlights across research and applied systems." />
      <div className="space-y-5">
        <Block title="Research (papers)" items={achievements.research} />
        <Block title="Shipped Systems" items={achievements.shippedSystems} />
        <Block title="Technical Expertise" items={achievements.technicalExpertise} />
      </div>
    </div>
  );
}

type BlockProps = {
  title: string;
  items: string[];
};

function Block({ title, items }: BlockProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
