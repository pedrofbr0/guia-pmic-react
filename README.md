# PMIC Guide — Uberlândia 2026

A print-ready PDF guide built with **React + TypeScript + Vite**, designed for the **Festival Mais Que Viaduto**. It explains how companies in Uberlândia can support culture by deducting **ISSQN** or **IPTU** through the city's **Programa Municipal de Incentivo à Cultura (PMIC)**.

The entire document is rendered as a sequence of fixed A4 pages in the DOM. This approach guarantees pixel-perfect PDF output — every page has a consistent header, footer, and content area with no browser pagination surprises.

## What the guide covers

| Page | Content |
|------|---------|
| 1 | Cover (festival branding, title, contacts) |
| 2 | Table of Contents (clickable links in the PDF) |
| 3 | What is the PMIC + financial advantage for companies |
| 4 | Eligibility criteria + approved project selection |
| 5 | Required documentation |
| 6 | Declaration of Intent (DI) |
| 7–8 | Step-by-step walkthrough (10 steps) |
| 9 | IPTU-specific rules + common rejection scenarios |
| 10 | Final checklist + legal references |

## Tech stack

- **React 19** — UI rendering (single `App.tsx` component with all pages)
- **TypeScript** — type-safe props and data structures
- **Vite 7** — dev server and build tooling
- **CSS print layout** — `@page`, `break-after: page`, fixed 210×297mm pages
- **Google Fonts** — Anton (display) + Ubuntu (body)
- **Playwright** — headless Chromium PDF export (`scripts/export-pdf.mjs`)

## Project structure

```
├── index.html              # Entry point (Google Fonts, lang="pt-BR")
├── package.json            # Scripts: dev, build, preview, export:pdf
├── tsconfig.json           # TypeScript config (ES2020, react-jsx)
├── .gitignore              # Ignores node_modules/, dist/, *.pdf
├── scripts/
│   └── export-pdf.mjs      # Playwright-based PDF export script
├── src/
│   ├── main.tsx             # React root mount
│   ├── App.tsx              # All pages, components, and data
│   └── guide.css            # Screen + print styles (A4 layout)
├── public/
│   ├── elementos/           # megafone.png, coroa.png, viaduto.png
│   └── logos/               # Festival logo, QV outline logo
└── output/                  # Generated PDF output directory
```

## Getting started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)

### Installation

```bash
git clone <repo-url>
cd guia-pmic-react
npm install
```

For PDF export, also install the Chromium browser binary used by Playwright:

```bash
npx playwright install chromium
```

### Development

Start the dev server with hot reload:

```bash
npm run dev
```

Opens at `http://localhost:5173`. The document renders as a scrollable preview with a toolbar at the top. You can also use **Ctrl+P** in the browser to test print output directly.

### PDF export

With the dev server running in another terminal:

```bash
npm run export:pdf
```

This launches headless Chromium, waits for fonts to load, then generates `output/pmic-guia-uberlandia-2026.pdf`.

**Environment variables** (optional):

| Variable | Default | Description |
|----------|---------|-------------|
| `PMIC_GUIDE_URL` | `http://localhost:5173` | URL of the running dev server |
| `PMIC_GUIDE_OUT` | `./output/pmic-guia-uberlandia-2026.pdf` | Output PDF file path |

Example with custom URL:

```bash
PMIC_GUIDE_URL=http://localhost:4173 npm run export:pdf
```

### Production build

```bash
npm run build
npm run preview   # serves the built files at localhost:4173
```

## Customization

All content, constants, and components live in `src/App.tsx`:

- **`FESTIVAL_EMAIL`** — contact email shown in footers
- **`FESTIVAL_INSTAGRAM`** — Instagram handle shown in footers
- **`PMIC_SITE`** — official PMIC portal URL (linked in cover footer and closing CTA)
- **`FESTIVAL_LOGO`** — path to the festival logo used in page headers
- **`TOC_ENTRIES`** — table of contents data (auto-linked to page anchors)

Brand colors are defined as CSS custom properties in `src/guide.css`:

```css
--festival-arctic: #24a1a6;
--festival-fire:   #e84633;
--festival-cream:  #f3dcb3;
--festival-gold:   #fbb03c;
--festival-black:  #151515;
--festival-deep:   #14575d;
```

## License

This project was created for the Festival Mais Que Viaduto 2026.
