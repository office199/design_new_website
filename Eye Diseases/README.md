# Eye Diseases - 151 Conditions

This folder contains all 151 Eye Diseases & Conditions pages migrated from `Eye Diseases & Conditions` source.

- Source: `Eye Diseases & Conditions/` (151 folders with content.md + images)
- Public assets: `public/eye-diseases/` (copied for web use)
- Data: `src/data/eyeDiseasesData.js` (auto-generated JSON + SEO)
- React pages:
  - `src/pages/eye-diseases/EyeDiseasesPage.jsx` - Listing page at `/eye-diseases`
  - `src/pages/eye-diseases/EyeDiseaseDetailPage.jsx` - Detail page at `/eye-diseases/:slug`

All pages have SEO:
- Title: "{Condition} - Causes, Symptoms, Diagnosis & Treatment | Ashu Laser Vision Mumbai"
- Description: Expert content by Dr. Shahnawaz Kazi FMRF FRCS Gold Medalist
- OpenGraph, Twitter, JSON-LD MedicalCondition, BreadcrumbList, FAQPage
- Canonical URLs: https://ashulaservision.com/eye-diseases/{slug}

Header megamenu:
- Added in `src/components/layout/Header.jsx` - Eye Diseases & Conditions mega menu with 11 categories, search, 151 links, grouped layout
- Mobile collapsible with search
- Desktop hover with scrollable grid

Routes:
- `/eye-diseases` - All 151 listing with filters by group and search
- `/eye-diseases/:slug` - Individual condition detail with images, content renderer, related conditions, FAQs

SEO sitemap entries should be added for all 151 pages.
