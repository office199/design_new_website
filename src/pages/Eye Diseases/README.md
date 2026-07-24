# Eye Diseases Folder

This folder contains wrappers for all Eye Diseases & Conditions pages.

Actual pages:
- ../eye-diseases/EyeDiseasesPage.jsx -> route /eye-diseases (listing 151)
- ../eye-diseases/EyeDiseaseDetailPage.jsx -> route /eye-diseases/:slug (detail)

Data sources:
- src/data/eyeDiseasesData.js (full 151 with markdown)
- src/data/eyeDiseasesMeta.js (light meta for header/footer)
- public/eye-diseases/ (images + content.md copied from original)
- Eye Diseases/ (root folder with 151 subfolders each containing content.md, images, seo.json) - per user request

All pages have SEO: title, description, keywords, OG, JSON-LD, breadcrumbs, FAQ.
Header megamenu in src/components/layout/Header.jsx includes Eye Diseases & Conditions mega with 11 groups, search, 151 links.
Footer also updated.
Sitemap includes all 151 eye-disease URLs.
