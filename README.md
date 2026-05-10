# rishigohil.com

Personal site for Rishi Gohil. Site built with Astro and deployed to
Cloudflare.

## Stack

- [Astro](https://astro.build) — static site generator with islands
- [Tailwind CSS](https://tailwindcss.com) v4 — styling
- [React](https://react.dev) — only used for the bounceIn entry animation
  island (`CardEntry.tsx`)
- [Motion](https://motion.dev) — spring physics for the card entry
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
  — smooth page-to-page transitions
- [Inter Variable](https://rsms.me/inter/) via `@fontsource-variable/inter`

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
└── styles/clothes.css       # Tailwind import + dotted bg + bio link styles
public/                       # favicon, profile pic, robots.txt, ai.txt
archive/                      # legacy AngularJS source — gitignored from new builds
```

## Deploy

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
