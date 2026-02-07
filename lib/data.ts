import achievementsData from "@/data/achievements.json";
import experienceData from "@/data/experience.json";
import homeData from "@/data/home.json";
import linksData from "@/data/links.json";
import publicationsData from "@/data/publications.json";
import publicationsAutoData from "@/data/publications.auto.json";
import researchData from "@/data/research.json";
import {
  achievementsSchema,
  experienceSchema,
  homeSchema,
  linksSchema,
  publicationsSchema,
  researchSchema,
  type Publication,
} from "@/lib/schemas";

export type PublicationFilters = {
  year?: number;
  venue?: string;
  tag?: string;
};

export const getLinks = () => linksSchema.parse(linksData);

export const getExperience = () => {
  const parsed = experienceSchema.parse(experienceData);
  return [...parsed].sort((a, b) => {
    const aValue = a.startYear * 100 + a.startMonth;
    const bValue = b.startYear * 100 + b.startMonth;
    return bValue - aValue;
  });
};

export const sortPublicationsByYear = (publications: Publication[]) => {
  return [...publications].sort((a, b) => {
    if (a.year === null && b.year === null) return a.title.localeCompare(b.title);
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return b.year - a.year || a.title.localeCompare(b.title);
  });
};

export const groupPublicationsByYear = (publications: Publication[]) => {
  const sorted = sortPublicationsByYear(publications);
  return sorted.reduce<Record<string, Publication[]>>((acc, publication) => {
    const key = publication.year === null ? "Year TBD" : String(publication.year);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(publication);
    return acc;
  }, {});
};

export const filterPublications = (
  publications: Publication[],
  filters: PublicationFilters,
) => {
  return publications.filter((publication) => {
    const matchesYear = !filters.year || publication.year === filters.year;
    const matchesVenue = !filters.venue || publication.venue === filters.venue;
    const matchesTag = !filters.tag || publication.tags.includes(filters.tag);

    return matchesYear && matchesVenue && matchesTag;
  });
};

const normalizeTitle = (title: string) => title.trim().toLowerCase().replace(/\s+/g, " ");

const mergePublications = (manual: Publication[], auto: Publication[]) => {
  const autoByTitle = new Map(auto.map((item) => [normalizeTitle(item.title), item]));
  const usedTitles = new Set<string>();

  const mergedManual = manual.map((manualItem) => {
    const key = normalizeTitle(manualItem.title);
    const autoItem = autoByTitle.get(key);
    usedTitles.add(key);

    if (!autoItem) {
      return manualItem;
    }

    return {
      ...autoItem,
      ...manualItem,
      links: {
        ...autoItem.links,
        ...manualItem.links,
      },
    };
  });

  const autoOnly = auto.filter((autoItem) => !usedTitles.has(normalizeTitle(autoItem.title)));
  return [...mergedManual, ...autoOnly];
};

export const getPublications = () => {
  const manual = publicationsSchema.parse(publicationsData);
  const auto = publicationsSchema.parse(publicationsAutoData);
  return sortPublicationsByYear(mergePublications(manual, auto));
};

export const getAchievements = () => achievementsSchema.parse(achievementsData);

export const getHome = () => homeSchema.parse(homeData);

export const getResearch = () => researchSchema.parse(researchData);
