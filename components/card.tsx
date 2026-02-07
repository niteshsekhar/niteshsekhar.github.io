import { type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-card transition-transform duration-200 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-7 ${className}`.trim()}
    >
      {children}
    </article>
  );
}
