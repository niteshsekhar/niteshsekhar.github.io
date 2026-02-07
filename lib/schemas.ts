import { z } from "zod";

export const linksSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  scholar: z.string().url(),
});

export const experienceItemSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  startYear: z.number().int(),
  startMonth: z.number().int().min(1).max(12),
  endYear: z.number().int().nullable(),
  endMonth: z.number().int().min(1).max(12).nullable(),
  location: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
});

export const experienceSchema = z.array(experienceItemSchema);

export const publicationLinksSchema = z
  .object({
    pdf: z.union([z.string().url(), z.literal("")]),
    arxiv: z.union([z.string().url(), z.literal("")]),
    code: z.union([z.string().url(), z.literal("")]),
    scholar: z.union([z.string().url(), z.literal("")]),
  })
  .strict();

export const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).default([]),
  venue: z.string().default(""),
  year: z.number().int().min(1900).max(2100).nullable(),
  citationCount: z.number().int().nonnegative().nullable().optional(),
  summary: z.string().default(""),
  tags: z.array(z.string().min(1)).default([]),
  links: publicationLinksSchema.default({
    scholar: "",
    pdf: "",
    arxiv: "",
    code: "",
  }),
});

export const publicationsSchema = z.array(publicationSchema);

export const achievementsSchema = z.object({
  research: z.array(z.string().min(1)),
  shippedSystems: z.array(z.string().min(1)),
  technicalExpertise: z.array(z.string().min(1)),
});

export const homeSchema = z.object({
  headline: z.string().min(1),
  bio: z.array(z.string().min(1)).min(1),
  now: z.object({
    title: z.string().min(1),
    period: z.string().min(1),
  }),
});

export const researchSectionSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  keyIdeas: z.array(z.string().min(1)).min(1),
  representativePublications: z.array(z.string().min(1)).min(1),
  systemsImpact: z.array(z.string().min(1)).min(1),
});

export const researchSchema = z.array(researchSectionSchema);

export type Links = z.infer<typeof linksSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Achievements = z.infer<typeof achievementsSchema>;
export type Home = z.infer<typeof homeSchema>;
export type ResearchSection = z.infer<typeof researchSectionSchema>;
