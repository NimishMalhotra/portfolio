# Resume Website

A dark, single-page portfolio resume built with plain HTML, CSS and vanilla JavaScript. No build step.

## Files

- `index.html` – all content and inline SVG illustrations
- `style.css` – design tokens, layout, responsive rules, print stylesheet
- `script.js` – score-ring animation, active nav link, "Save as PDF" button
- `profile.jpg` – optional: add your own photo (see below)

## Add your photo

Save a portrait as `profile.jpg` next to `index.html` (4:5 portrait crop works best, around 800 x 1000 px).
It fills the arch-shaped frame in the hero. Without the file, a monogram "NM" is shown instead.

## Add logos

Put official logo files in `assets/logos/`, named `paypay`, `optum`, `codeforces`, `linkedin`, `dtu`, `rdps` (Rukmini Devi Public School) and `cbse`,
as `.svg`, `.png`, `.jpg` or `.webp`. They appear in the Career timeline, the hero links, the Education cards and the Contact rows.
A missing file is skipped without leaving a gap. Download each logo from the organisation's own site or brand page.

## Deploy on GitHub Pages

1. Create a repository (`<username>.github.io` for a root URL, or any name for a project site).
2. Put these files in the repository root and push to `main`.
3. On GitHub: Settings > Pages > Build and deployment > Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`.
4. The site goes live at `https://<username>.github.io/` (or `https://<username>.github.io/<repo>/`) within a minute or two.

## Saving a PDF for application forms

Open the site and click "Save as PDF". The print stylesheet switches to a compact white A4 layout without the navigation, portrait or illustrations.

## Editing

All content lives in `index.html`. Colours and fonts are CSS variables at the top of `style.css` (`--accent` controls the rose accent).
Fonts load from Google Fonts; the page falls back to system fonts if they are unavailable.
