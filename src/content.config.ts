import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    link: z.url().optional(),
    repo: z.url().optional(),
  }),
});

export const collections = { projects };
