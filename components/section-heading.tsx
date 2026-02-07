type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8 fade-up">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-zinc-600 dark:text-zinc-300">{subtitle}</p> : null}
    </div>
  );
}
