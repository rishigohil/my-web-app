# Migration Notes: AngularJS → Astro

This document captures everything found in the legacy AngularJS source so the
content can be carried over to the new Astro site without loss. The legacy
code itself is not being ported — only the content listed here.

## Source files reviewed

- `index.html` — shell page
- `views/home.html` — home / profile card
- `views/social.html` — social-links directive template
- `views/404.html` — not-found view
- `js/app/app.js` — AngularJS module, routing, controllers, directive
- `js/app/data.json` — content (name, bio, social links, resume URL)
- `content/css/clothes.css` — custom CSS (the only project-specific CSS;
  `skeleton.min.css` and `normalize.min.css` are vendor)
- `content/images/*` — image assets
- `content/fonts/*` — webfonts (Open Sans, Roboto Light/Thin)
- `README.md`, `.eslintrc.json`, `.jshintrc`, `.gitignore` — configs

## Human-facing copy (verbatim from `js/app/data.json` and views)

### Identity
- **Name:** Rishi Gohil
- **Designation / role:** Senior Software Engineer
- **Current designation (HTML):**
  > I am a Sr. Software Engineer at [Anthology](https://www.anthologyinc.com)
- **Bio:**
  > I am an ardent Technologist, Melomaniac, and Gourmet. I spend most of my
  > time writing code and listening to house music.
- **Resume URL (Google Drive):**
  https://drive.google.com/file/d/0BwReR2Ov8DKMdzByZE1ZQS1TcVk/view?usp=sharing&resourcekey=0-bdPC317bEVdkUSFnsyI8VQ

### Meta tags (from `index.html`)
- Title: `I'm Rishi Gohil`
- Description: `Personal website of Rishi Gohil.`
- Keywords: `software engineer, software developer, california, florida, south florida, boston, programmer, bigdata, development`
- Author: `Rishi Gohil`
- Robots: `index, nofollow`

### 404 view
- `(╯°□°)╯︵ ┻━┻`
- "Whoops! You are at the Wrong Address: <path>"
- "Lets get you home." — back button + home button

### Footer
- `© 2017 Rishi Gohil`

## Social / contact links (from `data.json`)

| Platform   | URL                                                | Title                          |
| ---------- | -------------------------------------------------- | ------------------------------ |
| Facebook   | https://www.facebook.com/rishig10                  | Connect with me on Facebook    |
| Twitter    | https://twitter.com/rishi_gohil10                  | Connect with me on Twitter     |
| LinkedIn   | https://www.linkedin.com/in/rishigohil             | Connect with me on LinkedIn    |
| GitHub     | https://github.com/rishigohil                      | Connect with me on GitHub      |
| SoundCloud | https://soundcloud.com/rishi_gohil                 | Connect with me on SoundCloud  |
| Email      | mailto:rishi.gohil@live.com                        | Click here to Email me         |

## Image / asset inventory

| File                          | Use in old site                | Action                                              |
| ----------------------------- | ------------------------------ | --------------------------------------------------- |
| `content/images/icon.png`     | favicon                        | move to `public/favicon.png`                        |
| `content/images/mypic.jpg`    | profile picture (`.dp-container` background-image in `clothes.css`) | move to `public/mypic.jpg` |
| `content/images/pat.png`      | not referenced anywhere I could find — likely an old background pattern (a similar pattern is now inlined as a base64 SVG in `clothes.css`) | preserve in `public/` for now, flag as unused |
| `content/fonts/OpenSans-Regular.ttf` | not referenced in any CSS `@font-face` rule — appears unused | drop (replaced by Inter Variable via `@fontsource-variable/inter`) |
| `content/fonts/Roboto-Light.ttf`     | not referenced in any CSS — appears unused | drop |
| `content/fonts/Roboto-Thin.ttf`      | not referenced in any CSS — appears unused | drop |

> Note on fonts: the old site links `skeleton.min.css` from CDN-style vendor
> CSS but never declares `@font-face` rules for the bundled `.ttf` files, so
> they were dead weight. The new site uses Inter Variable.

## Visual / branding cues from `clothes.css`

These are starting points, not constraints — the new site uses a more modern
Vercel/Linear-style palette while keeping the same general feel.

- **Body background:** `#ffffff` with a subtle dotted SVG pattern
  (`#d8d8d8` at 30% opacity).
- **Text color (bio):** `#333333`.
- **Card:** white background, `border-radius: 8px`,
  shadow `0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)`,
  transitions to a deeper shadow + `translate(0, -4px)` on hover —
  this hover-lift is preserved on project cards in the new site.
- **Accent on bio links:** an animated underline using `::before`/`::after`
  pseudo-elements with `cubic-bezier(0.22, 0.61, 0.36, 1)` easing. The new
  site keeps a similar underline-on-hover treatment in Tailwind.
- **Profile picture:** circular, 120 × 120, soft outer ring shadow that
  expands on hover.
- **Social-icon hover colors:** Facebook `#3d5b99`, Twitter `#00aced`,
  LinkedIn `#0073a4`, GitHub `#808080`, SoundCloud `#FF7512`, Email `#0072c6`.
  Not preserved literally — the new site uses neutral icon hovers.
- **Animations:** `bounceIn` on the card load and a `fadein` keyframe.
  Replaced by Motion + View Transitions in the new site.
- **Footer:** small (`10px`), grey `#b1b1b1`, absolutely positioned bottom-left.

## Pages found in the old site

The legacy app has only **two** routes via `$routeProvider`:
- `/` → `views/home.html` (the profile card)
- `*` (otherwise) → `views/404.html`

The new Astro site mirrors this exactly: a single `/` profile card and
a `404.astro` for unknown paths. No `/about`, `/projects`, or `/resume`
routes — all of that content lives on the home card, just like before.

## Behavior preserved in the new site

- Profile picture, name, designation, current-designation line (with the
  Anthology link), and the two-sentence bio — all rendered verbatim on `/`.
- All six social links (Facebook, Twitter, LinkedIn, GitHub, SoundCloud,
  Email) with the original brand-color hover treatment from `clothes.css`
  (FB `#3d5b99`, Twitter `#00aced`, LinkedIn `#0073a4`, GitHub `#808080`,
  SoundCloud `#FF7512`, Email `#0072c6`).
- Resume button linking to the original Google Drive PDF.
- White card on dotted SVG background — the dotted SVG is the same
  inline base64 from `clothes.css`.
- Card hover lift (`translate(0, -4px)` + deeper shadow) and the circular
  profile-picture ring shadow that grows on hover.
- Animated underline on bio links (`.bio a::before` / `::after` from
  `clothes.css`).
- The `bounceIn` entry animation — replayed via Motion's spring physics
  inside a small React island (`CardEntry.tsx`), preserving the playful
  pop while demonstrating the Astro islands pattern.
- 404 page with the table-flip ASCII (`(╯°□°)╯︵ ┻━┻`) and back/home
  buttons.
- Page title `I'm Rishi Gohil`, the original `<meta name="keywords">`,
  and `index, nofollow` for general crawlers.
- Favicon (`icon.png`) → `public/favicon.png`; profile picture
  (`mypic.jpg`) → `public/mypic.jpg`.

## Behavior dropped intentionally

- Google Analytics (`UA-98865326-1`, the legacy Universal Analytics
  property) — UA was sunset in July 2023. Replaced with GA4 (`G-FRQPMBZETY`)
  wired through `astro:page-load` so view-transition navigations are
  tracked correctly without double-counting the initial pageview.
- AngularJS, ngRoute, ngAnimate, ngSanitize, jQuery-style transitions.
- Skeleton + normalize + Font Awesome CDN — replaced by Tailwind + inline
  SVG icons.
- Unused `.ttf` font files in `content/fonts/` — Inter Variable used
  instead.
- `pat.png` — not referenced by the legacy site; the dotted bg is the
  inline SVG. Removed from `public/`.

## Notes

- **Footer copyright year.** Old site said `© 2017 Rishi Gohil` literally.
  New site uses the current year (`new Date().getFullYear()`).
- **Twitter / X.** `data.json` listed `twitter.com/rishi_gohil10`. Twitter
  has rebranded to X; the link still works and is preserved verbatim.
- **Current employer.** `data.json` says "Sr. Software Engineer at
  Anthology" (from 2017). Preserved verbatim — confirm and update if
  needed.

## Broken / missing references

- `views/home.html` references `{{name}}` as the `aria-label` of an empty
  `<a class="image-link">` whose `href` points to `http://rishigohil.com/`
  (self-link). Cosmetic, not broken — just dropped in the new site.
- No `404` route handler in the old site beyond rendering `views/404.html`;
  Astro generates a static 404 from `src/pages/404.astro` (not in scope here).
- No sitemap, robots.txt, or feed in the legacy site.

## Anti-AI-scraper policy

The new site asks AI crawlers and dataset scrapers not to ingest the
content. This is enforced in three places:

- `public/robots.txt` lists every well-known LLM training / retrieval
  bot UA (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web,
  anthropic-ai, Google-Extended, CCBot, PerplexityBot, Bytespider,
  Amazonbot, Applebot-Extended, Meta-ExternalAgent, Diffbot, etc.) with
  `Disallow: /`. The default `User-agent: *` rule preserves the legacy
  `index, nofollow` behavior.
- `public/.well-known/ai.txt` declares a human-readable policy + a
  contact email for permission requests.
- `BaseLayout.astro` adds `<meta name="robots" content="index, nofollow,
  noai, noimageai">` and bot-specific meta tags so crawlers that ignore
  robots.txt still see the directive.

These rely on bot operators voluntarily honoring them; they're not a
technical block.

## Stack at a glance

| Concern                | Old (AngularJS)                          | New (Astro)                                 |
| ---------------------- | ---------------------------------------- | ------------------------------------------- |
| Framework              | AngularJS 1.6.4 (EOL)                    | Astro (latest)                              |
| Styling                | Skeleton + custom CSS                    | Tailwind CSS                                |
| Animation              | CSS keyframes, ngAnimate                 | Motion (in a small React island) + View Transitions |
| Routing                | `$routeProvider` (HTML5 mode)            | Astro file-based routing                    |
| Content                | Single `data.json`                       | Inlined into `ProfileCard.astro`            |
| Hosting target         | (unspecified)                            | Cloudflare Pages (static)                   |
| Analytics              | Google Analytics                         | None                                        |
