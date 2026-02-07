import { getLinks } from "@/lib/data";

const links = getLinks();

export const siteConfig = {
  name: links.name,
  title: `${links.name} | Applied AI Research Scientist`,
  description:
    "Applied AI research in multimodal foundation models, vision-language pretraining, and representation learning.",
  url: "https://example.com",
};
