import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { getExperience, getHome, getPublications } from "@/lib/data";

export const metadata = {
  title: "Home",
  description:
    "Applied AI research across multimodal foundation models, vision-language pretraining, and representation learning.",
};

const quickLinks = [
  { href: "/publications", label: "Publications" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

export default function HomePage() {
  const home = getHome();
  const experience = getExperience();
  const publications = getPublications();

  const currentRoleHighlights = experience[0]?.bullets.slice(0, 3) ?? [];

  const newestPublication = publications[0];
  const arCloudPublication = publications.find((publication) =>
    publication.title.toLowerCase().includes("ar cloud"),
  );

  const featuredWork = [
    {
      title: "Scaling Multimodal Foundation Models at Amazon Nova",
      type: "Experience",
      detail:
        experience[0]?.bullets[0] ??
        "Leading multimodal foundation model research with strong emphasis on quality, efficiency, and transfer.",
      href: "/experience",
    },
    {
      title: newestPublication?.title ?? "Robust Learning Under Distribution Shift",
      type: "Publication",
      detail:
        newestPublication?.summary ||
        "Research focused on robust representation learning and reliable generalization under spurious correlations.",
      href: "/publications",
    },
    {
      title: arCloudPublication?.title ?? "Scalable 3D Perception for Shared AR",
      type: "Publication",
      detail:
        arCloudPublication?.summary ||
        "Built scalable 3D perception systems for AR cloud use cases with consistent multi-user object understanding.",
      href: "/publications",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="fade-up">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white px-6 py-8 shadow-card dark:border-zinc-800 dark:bg-zinc-900 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-600/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-zinc-200/70 blur-3xl dark:bg-zinc-700/30"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-100">
                Nitesh Sekhar
              </p>
              <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:text-5xl">
                {home.headline}
              </h1>
              <div className="mt-7 max-w-3xl space-y-4 text-lg text-zinc-700 dark:text-zinc-300">
                {home.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  Multimodal Foundation Models
                </span>
                <span className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  Vision-Language Pretraining
                </span>
                <span className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  Representation Learning
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:mx-0">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-card dark:border-zinc-700 dark:bg-zinc-800">
                <Image
                  src="/profile.jpeg"
                  alt="Portrait of Nitesh Sekhar"
                  width={900}
                  height={1200}
                  priority
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
              <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-300">
                Applied Scientist 3, Amazon AGI (Nova)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="fade-up fade-up-delay-1">
        <SectionHeading title="Now" />
        <Card className="max-w-3xl">
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{home.now.title}</p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">{home.now.period}</p>
        </Card>
      </section>

      <section className="fade-up fade-up-delay-1" aria-label="Featured work">
        <SectionHeading
          title="Featured Work"
          subtitle="Three representative contributions across foundation models, robustness research, and 3D perception systems."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredWork.map((item, index) => (
            <Card key={item.title} className={index === 0 ? "fade-up-delay-1" : index === 1 ? "fade-up-delay-2" : "fade-up-delay-3"}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                {item.type}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">{item.detail}</p>
              <Link
                href={item.href}
                aria-label={`Read more about ${item.title}`}
                className="mt-5 inline-flex rounded-md text-sm font-medium text-brand-700 transition hover:text-brand-600 dark:text-brand-100 dark:hover:text-brand-50"
              >
                Read more
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="fade-up fade-up-delay-2">
        <SectionHeading title="Featured Highlights" subtitle="Selected impact snapshots from current role." />
        <div className="grid gap-5 md:grid-cols-3">
          {currentRoleHighlights.map((highlight, index) => (
            <Card key={highlight} className={index === 0 ? "fade-up-delay-1" : index === 1 ? "fade-up-delay-2" : "fade-up-delay-3"}>
              <p className="text-zinc-700 dark:text-zinc-300">{highlight}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="fade-up fade-up-delay-2">
        <SectionHeading title="Quick Links" />
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={`Go to ${link.label}`}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-brand-600 hover:text-brand-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-100 dark:hover:text-brand-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
