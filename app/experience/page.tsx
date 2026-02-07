import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getExperience } from "@/lib/data";

export const metadata = {
  title: "Experience",
  description: "Professional experience across Amazon AGI, Alexa AI, Physical Stores, and Magic Leap.",
};

export default function ExperiencePage() {
  const experience = getExperience();

  return (
    <div>
      <SectionHeading title="Experience" subtitle="Applied AI and computer vision roles across research and product systems." />
      <div className="space-y-5 border-l border-zinc-300 pl-4 dark:border-zinc-700">
        {experience.map((role) => (
          <div key={`${role.company}-${role.role}-${role.period}`} className="relative">
            <span className="absolute -left-[21px] top-6 h-3 w-3 rounded-full bg-brand-600" aria-hidden="true" />
            <Card>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {role.company} - {role.role}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{role.location}</p>
                </div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{role.period}</p>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
