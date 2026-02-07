# Nitesh Sekhar - Personal Research Website

A professional personal research website built with Next.js (App Router), TypeScript, Tailwind CSS, and JSON-driven content validated with Zod.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (mobile-first)
- Zod for runtime validation of JSON content files

## Routes

- `/` Home
- `/publications`
- `/experience`
- `/research`
- `/achievements`
- `/cv`
- `/contact`

## Data-driven Content

All content is stored in `/data` and parsed via Zod schemas in `/lib/schemas.ts`.

- `/data/publications.json`
- `/data/publications.auto.json` (optional CI-generated metadata)
- `/data/experience.json`
- `/data/achievements.json`
- `/data/links.json`
- `/data/home.json`
- `/data/research.json`

Utilities in `/lib/data.ts` provide:

- JSON validation with Zod
- publication sorting by year
- publication grouping by year
- publication filtering by year, venue, and tag
- merge of manual + CI-generated publications (`publications.json` wins on conflicts)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploy to GitHub Pages (`niteshsekhar`)

This repo is configured for static export and GitHub Pages deployment via Actions.

### 1. Choose repository name

- User site (recommended): `niteshsekhar.github.io`
  - URL: `https://niteshsekhar.github.io/`
- Project site: any repo name, e.g. `research-site`
  - URL: `https://niteshsekhar.github.io/research-site/`

### 2. Push code to GitHub

```bash
git add .
git commit -m "feat: personal research website"
git branch -M main
git remote add origin https://github.com/niteshsekhar/<repo-name>.git
git push -u origin main
```

### 3. Enable Pages in GitHub

- Go to `Settings` -> `Pages`
- Under `Build and deployment`, select `Source: GitHub Actions`

### 4. Deploy

- Push to `main`, or run the `Deploy to GitHub Pages` workflow manually from the Actions tab.
- The workflow file is at `/.github/workflows/deploy-pages.yml`.

## Optional Scholar Automation (CI Only)

This project includes an optional server-side automation to refresh publication metadata from Google Scholar.

- Script: `/scripts/update_scholar_pubs.py`
- Workflow: `/.github/workflows/update_pubs.yml`
- Schedule: weekly (Monday at 14:00 UTC) and manual trigger (`workflow_dispatch`)

Behavior:

- Fetches metadata from Scholar user id `HzNqQNoAAAAJ`
- Updates only `/data/publications.auto.json`
- Never edits `/data/publications.json` (manual source of truth)
- Website merges both files and keeps manual fields when titles overlap

Run locally (optional):

```bash
python scripts/update_scholar_pubs.py
```

Manual fallback mode:

If Scholar fetching fails (rate limits, CAPTCHA, layout changes), the script writes:

- `/data/publications.auto.manual.template.json`

Then:

1. Fill the template with verified metadata.
2. Copy entries into `/data/publications.auto.json`.
3. Commit the updated `publications.auto.json`.

## Screenshots (Placeholders)

Add project screenshots to `/public/screenshots/` and update the markdown below.

- Home: `![Home page](./public/screenshots/home.png)`
- Publications: `![Publications page](./public/screenshots/publications.png)`
- Experience: `![Experience page](./public/screenshots/experience.png)`

## Customization Guide

### Update Personal Identity

Edit `/data/links.json`:

- `name`
- `email`
- `github`
- `linkedin`
- `scholar`

### Update Home Content

Edit `/data/home.json`:

- headline
- bio paragraphs
- current role (`now`)

### Update Publications

- Manual curated entries: `/data/publications.json`
- Optional automated metadata: `/data/publications.auto.json`

Manual data should contain polished summaries/tags. Auto data is best used for metadata refresh.

### Update Experience and Achievements

- `/data/experience.json`
- `/data/achievements.json`
- `/data/research.json`

### Update Theme and Visual Style

- Global tokens and motion: `/app/globals.css`
- Tailwind config: `/tailwind.config.ts`
- Shared components: `/components/*`

### Update CV

Place your CV at:

- `/public/cv.pdf`

The `/cv` page will automatically serve and download this file.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Use default build settings:
- Build command: `next build`
- Output: `.next`
4. Deploy.

Any change pushed to the default branch will trigger a redeploy.
