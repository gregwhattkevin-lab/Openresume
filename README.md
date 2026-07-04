<p align="center">
  <img src="https://img.shields.io/badge/offline-first-000000?style=for-the-badge" alt="Offline First">
  <img src="https://img.shields.io/badge/no%20API%20required-000000?style=for-the-badge" alt="No API">
  <img src="https://img.shields.io/badge/100%25%20private-000000?style=for-the-badge" alt="100% Private">
  <img src="https://img.shields.io/badge/single%20file%20HTML-000000?style=for-the-badge" alt="Single File">
</p>

<p align="center">
  <h1 align="center">OpenResume</h1>
  <p align="center">
    <b>A fully offline resume builder that runs in your browser.</b><br/>
    No sign-ups. No cloud. No internet needed. Just open the file, edit your resume, and download it as PDF.
  </p>
</p>

---

## Why OpenResume?

Every resume builder online wants your email, stores your data on their servers, or forces you to pay to download. **OpenResume is different**: it's a single HTML file you double-click and everything runs locally in your browser. Your data never leaves your computer.

---

## Features

| Category | Details |
|----------|---------|
| **Templates** | 20 professionally designed layouts (Modern, Classic, Minimalist, Creative, Executive, Corporate, Swiss, Magazine, Bold, Timeline & more) |
| **Editor** | One-section-at-a-time workflow with left sidebar navigation |
| **Reorder** | Drag-free section reordering — put your strongest content first |
| **Custom sections** | Add Internships, References, Links, or create your own custom sections |
| **Design** | Pick your primary color, font (Sans / Serif), font size, spacing, and page size (A4 / Letter / Legal) |
| **Photo** | Upload a profile photo stored as base64 — no external hosting |
| **Export** | Download as PDF directly, or print via the browser dialog |
| **Backup** | Export/import your data as JSON to save and restore your work |
| **Sample data** | Pre-filled with fictional resume content so you can see how it works immediately |

---

## Getting Started

### One-click usage

Download or clone this repo, then double-click:

```
Editor Curriculo Offline.html
```

That's it. No install, no server, no internet.

### Development

```bash
npm install
npm run dev      # Start dev server with hot reload
npm run build    # Build single-file output
```

The build produces a self-contained `dist/index.html` that gets copied to `Editor Curriculo Offline.html`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 + TypeScript |
| Build | Vite + vite-plugin-singlefile |
| Styles | Tailwind CSS 3 |
| Icons | Lucide React |
| PDF | html2pdf.js |
| Linting | Oxlint |

---

## Privacy

- Runs entirely in your browser
- No analytics, no tracking, no cookies
- Your resume data is stored in `localStorage` and never transmitted anywhere
- The single HTML file can be audited — it's all there

---

## License

MIT — do whatever you want with it. Share it, modify it, use it to land your dream job.
