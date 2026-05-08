# rishigohil.com

Personal site for Rishi Gohil. Static site built with Astro and deployed to
Cloudflare Pages.

## Stack

- [Astro](https://astro.build) — static site generator with islands
- [Tailwind CSS](https://tailwindcss.com) v4 — styling
- [React](https://react.dev) — only used for animation islands
- [Motion](https://motion.dev) — scroll/spring animation
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
  — smooth page-to-page transitions
- [Markdown content collections](https://docs.astro.build/en/guides/content-collections/)
  — typed `projects` collection with a Zod schema
- [Inter Variable](https://rsms.me/inter/) via `@fontsource-variable/inter`

The legacy AngularJS source is preserved (un-built) under `archive/` for
reference. See `MIGRATION_NOTES.md` for the inventory of what was carried
over.

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static build → dist/
npm run preview      # preview the production build locally
npx astro check      # TypeScript + Astro diagnostics
```

Requires Node 22+.

## Project structure

```
src/
├── components/        # Astro + React components
├── layouts/
│   └── BaseLayout.astro
├── pages/             # file-based routing
│   ├── index.astro
│   ├── about.astro
│   ├── resume.astro
│   ├── 404.astro
│   └── projects/
│       ├── index.astro
│       ├── [...slug].astro
│       └── tags/[tag].astro
├── content/
│   └── projects/      # one .md per project
├── content.config.ts  # typed collection schema
└── styles/global.css
public/                # static assets (favicon, profile pic, etc.)
archive/               # legacy AngularJS source — gitignored from new builds
```

## Adding a new project

Drop a markdown file into `src/content/projects/`. The filename (without
extension) becomes the URL slug. Frontmatter is type-checked against
`src/content.config.ts`:

```md
---
title: "My new project"
description: "One-liner about the project."
tech: ["TypeScript", "Astro", "Cloudflare"]
date: 2026-05-01
featured: true            # show on the home page
image: "/some-image.jpg"  # optional, served from public/
link: "https://example.com"
repo: "https://github.com/rishigohil/example"
---

Project body in markdown.
```

Save the file, and on the next build:

- It appears on `/projects` with its tech tags filterable.
- It gets its own page at `/projects/<slug>/`.
- If `featured: true`, it also appears on `/`.

## Theme toggle

The site defaults to dark mode and persists the user's choice in
`localStorage` under `"theme"`. The toggle lives in the nav bar.

## Deploying to Cloudflare Pages

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Astro           |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | `20` (or `22`)  |

No SSR adapter is configured. The site is fully static — `npm run build`
produces a `dist/` directory that Cloudflare Pages can serve as-is.

## Quality bar

- `npm run build` succeeds with zero errors and zero warnings
- `npx astro check` passes with no TypeScript errors
- All routes load locally on `npm run dev`
