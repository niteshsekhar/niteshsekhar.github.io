import Link from "next/link";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "CV",
  description: "Curriculum vitae download page.",
};

export default function CvPage() {
  return (
    <div>
      <SectionHeading title="CV" subtitle="Download the latest curriculum vitae." />
      <Card className="max-w-2xl">
        <p className="text-zinc-700 dark:text-zinc-300">
          The CV file is expected at <code>/public/cv.pdf</code>. Add your latest file there and this page will serve it.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/cv.pdf"
            target="_blank"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-brand-600 hover:text-brand-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-100 dark:hover:text-brand-100"
          >
            Open CV
          </Link>
          <Link
            href="/cv.pdf"
            download
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            Download CV
          </Link>
        </div>
      </Card>
    </div>
  );
}
