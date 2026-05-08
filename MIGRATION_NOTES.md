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

There is **no separate `/about`, `/projects`, `/contact`, or `/resume`
page** in the old site — everything lives on the home card. The canonical
list in the migration brief (Home, About, Projects, Contact) is therefore
new, and most of the project-collection content has to be filled in by the
site owner. See "Open questions" below.

## Behavior preserved in the new site

- Profile bio + designation copy → `/about` and the home hero.
- Social links → footer + `/about` contact section.
- Resume link → `/resume` page (placeholder + print CSS scaffold; the old
  Google Drive URL is linked from there as the current resume).
- Favicon (`icon.png`) → `public/favicon.png`.
- Profile picture (`mypic.jpg`) → `public/mypic.jpg`, used on `/about`.

## Behavior dropped intentionally

- Google Analytics (`UA-98865326-1`) — per migration brief: no analytics.
- AngularJS, ngRoute, ngAnimate, ngSanitize, jQuery-style transitions.
- Skeleton + normalize + Font Awesome CDN — replaced by Tailwind + inline SVG.
- The `bounceIn` card load animation — replaced by a tasteful
  Motion-driven fade/slide on the home hero.
- Unused `.ttf` font files in `content/fonts/`.

## Open questions / `TODO` for the site owner

These items can't be answered from the old source; they're flagged here and
mirrored as `TODO:` placeholders in the new content where relevant.

1. **Projects content.** The old site has no projects, so the new
   `src/content/projects/` collection ships with a single example entry
   (`example-project.md`) marked with `TODO:` placeholders. Add real
   projects by dropping new `.md` files in `src/content/projects/`.
2. **About bio.** The two-sentence bio from `data.json` is preserved as the
   `/about` lead paragraph. Fuller career history, education, and
   "currently" details are `TODO:` placeholders.
3. **Current employer.** `data.json` says "Sr. Software Engineer at
   Anthology" (set in 2017-era code). Confirm whether this is still
   current; the new site repeats the same line and leaves a `TODO:` if
   you'd like to update it.
4. **Resume.** The Google Drive resume URL still resolves at the link in
   `data.json`, but the `/resume` page is a placeholder ("Resume coming
   soon") with a `@media print` scaffold per the brief.
5. **Twitter / X.** `data.json` lists `twitter.com/rishi_gohil10`.
   Twitter has rebranded to X; the link still works but you may want to
   update the label.
6. **Footer copyright year.** Old site says `© 2017 Rishi Gohil`. New
   site uses the current year dynamically.
7. **`pat.png`.** Not referenced anywhere in the current codebase. Kept in
   `public/legacy/pat.png` in case it's useful but not used by the new site.

## Broken / missing references

- `views/home.html` references `{{name}}` as the `aria-label` of an empty
  `<a class="image-link">` whose `href` points to `http://rishigohil.com/`
  (self-link). Cosmetic, not broken — just dropped in the new site.
- No `404` route handler in the old site beyond rendering `views/404.html`;
  Astro generates a static 404 from `src/pages/404.astro` (not in scope here).
- No sitemap, robots.txt, or feed in the legacy site.

## Stack at a glance

| Concern                | Old (AngularJS)                          | New (Astro)                                 |
| ---------------------- | ---------------------------------------- | ------------------------------------------- |
| Framework              | AngularJS 1.6.4 (EOL)                    | Astro (latest)                              |
| Styling                | Skeleton + custom CSS                    | Tailwind CSS                                |
| Animation              | CSS keyframes, ngAnimate                 | Motion (in a small React island) + View Transitions |
| Routing                | `$routeProvider` (HTML5 mode)            | Astro file-based routing                    |
| Content                | Single `data.json`                       | Markdown content collection (`projects`)    |
| Hosting target         | (unspecified)                            | Cloudflare Pages (static)                   |
| Analytics              | Google Analytics                         | None                                        |
