# rishigohil.com

Personal site for Rishi Gohil. Static site built with Astro and deployed to
Cloudflare Pages — a 1:1 port of the legacy AngularJS profile card to a
modern static stack.

## Stack

- [Astro](https://astro.build) — static site generator with islands
- [Tailwind CSS](https://tailwindcss.com) v4 — styling
- [React](https://react.dev) — only used for the bounceIn entry animation
  island (`CardEntry.tsx`)
- [Motion](https://motion.dev) — spring physics for the card entry
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
  — smooth page-to-page transitions
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
├── components/
│   ├── CardEntry.tsx        # React island, Motion spring on mount
│   ├── ProfileCard.astro    # the profile card (avatar, bio, socials, resume)
│   └── SocialLinks.astro    # social-icon row with old hover-color treatment
├── layouts/
│   └── BaseLayout.astro     # html shell, view transitions, anti-AI meta
├── pages/
│   ├── index.astro          # the profile card
│   └── 404.astro            # table-flip not-found page
└── styles/global.css        # Tailwind import + dotted bg + bio link styles
public/                       # favicon, profile pic, robots.txt, ai.txt
archive/                      # legacy AngularJS source — gitignored from new builds
```

## Deploying to Cloudflare Pages

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Astro           |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | `20` (or `22`)  |

No SSR adapter is configured. The site is fully static — `npm run build`
produces a `dist/` directory that Cloudflare Pages can serve as-is.

## Anti-AI-scraper policy

- `public/robots.txt` lists known LLM training/retrieval bots with
  `Disallow: /` while preserving `index, nofollow` defaults for general
  crawlers.
- `public/.well-known/ai.txt` is a human-readable policy. Permission
  requests are directed to the WHOIS contact for the domain.
- `BaseLayout.astro` includes `noai, noimageai` meta tags for crawlers
  that ignore `robots.txt`.

## Quality bar

- `npm run build` succeeds with zero errors and zero warnings
- `npx astro check` passes with no TypeScript errors
