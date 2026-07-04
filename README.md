# Resume Editor Offline

A fully offline, single-file resume builder. Create, edit, and download your resume as a PDF without any internet connection or external API.

## Features

- 20 resume templates
- Drag-free section reordering
- Additional sections: internships, references, links, and custom sections
- Design controls: primary color, font family, font size, spacing, page size (A4 / Letter / Legal)
- Photo upload stored as base64
- Direct PDF download and print
- JSON export / import to save and restore your work
- All sample data is fictional

## Usage

Open `Editor Curriculo Offline.html` in any modern browser. Everything runs locally in your browser.

## Development

```bash
npm install
npm run dev
npm run build
```

After building, the single-file output is copied to `Editor Curriculo Offline.html`.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- html2pdf.js for PDF generation
