import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('/home/user/design_new_website/Eye Diseases & Conditions');
const manifestPath = path.join(baseDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

function extractTitle(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : 'Eye Condition';
}

function extractSection(md, heading) {
  // try to find heading like "Overview", "Symptoms", etc in extracted text
  return null;
}

function slugFromFolder(folder) {
  // folder like 001-eye-diseases -> eye-diseases
  return folder.replace(/^\d+-/, '');
}

function generateSEO(title) {
  const baseTitle = title.trim();
  return {
    seoTitle: `${baseTitle} - Causes, Symptoms, Diagnosis & Treatment | Ashu Laser Vision Mumbai`,
    seoDescription: `Learn about ${baseTitle}: causes, symptoms, diagnosis, treatment, prevention & FAQs. Expert eye care by Dr. Shahnawaz Kazi at Ashu Laser Vision, Andheri Mumbai - Super Specialty Eye Hospital since 2004. Book consultation.`,
    keywords: `${baseTitle}, ${baseTitle} treatment Mumbai, ${baseTitle} causes symptoms, ${baseTitle} diagnosis, eye diseases Andheri, Ashu Laser Vision, best eye hospital Mumbai`,
    faqExpected: []
  };
}

function cleanMarkdown(md) {
  // Remove source line, keep structure but we'll keep full md for rendering
  return md;
}

const data = manifest.map(entry => {
  const folderPath = path.join(baseDir, entry.folder);
  const contentPath = path.join(folderPath, 'content.md');
  let md = '';
  try {
    md = fs.readFileSync(contentPath, 'utf-8');
  } catch (e) {
    md = `# ${entry.title}\n\nContent coming soon.`;
  }
  const title = extractTitle(md) || entry.title;
  const slug = slugFromFolder(entry.folder);
  const seo = generateSEO(title);
  
  // Extract short description: first meaningful paragraph after Overview
  let shortDesc = '';
  const extractedMatch = md.match(/<!-- Page \d+ -->\s*\n+([^\n]+(?:\n[^\n]+){0,3})/);
  if (extractedMatch) {
    shortDesc = extractedMatch[1].slice(0, 300);
  }
  // Fallback: take lines after title
  if (!shortDesc) {
    const lines = md.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('Source') && !l.startsWith('<!--'));
    shortDesc = lines[0]?.slice(0, 250) || `${title} overview and treatment information.`;
  }

  // Count images from entry
  const images = entry.images || [];

  return {
    index: entry.index,
    folder: entry.folder,
    slug,
    title,
    originalTitle: entry.title,
    pages: entry.pages,
    images,
    shortDesc: shortDesc.replace(/[#*_`]/g, '').trim().slice(0, 280),
    seoTitle: seo.seoTitle,
    seoDescription: seo.seoDescription,
    keywords: seo.keywords,
    // raw markdown content for detail rendering
    contentMd: md
  };
});

// Save to src/data/eyeDiseasesData.js
const outPath = '/home/user/design_new_website/src/data/eyeDiseasesData.js';
const jsContent = `// Auto-generated from Eye Diseases & Conditions - ${data.length} entries
// Do not edit manually - run scripts/generateEyeData.mjs to regenerate
export const eyeDiseases = ${JSON.stringify(data, null, 2)};

export const eyeDiseaseGroups = [
  {
    id: 'basics',
    label: 'Eye Basics & Anatomy',
    description: 'Fundamentals of eye structure and vision',
    slugs: ['eye-diseases','vision-problems','blindness','eye-vision','eyeball','cornea','retina','lenses','eye-muscles','eye-sockets','eyelids','eye-health','common-eye-disorders']
  },
  {
    id: 'common',
    label: 'Common Eye Disorders',
    description: 'Most frequently diagnosed conditions',
    slugs: ['cataracts','refractive-errors','myopia-nearsightedness','hyperopia-farsightedness','astigmatism','presbyopia','glaucoma','age-related-macular-degeneration-amd','diabetic-retinopathy','cataracts-and-intraocular-lens-implantation']
  },
  {
    id: 'symptoms',
    label: 'Symptoms & Vision Problems',
    description: 'Signs that need eye checkup',
    slugs: ['vision-loss','eye-pain','eye-redness','retina-2','eye-strain','excessive-tearing-epiphora','yellowing-of-the-sclera-white-of-the-eye','double-vision','color-blindness','floaters','headaches','photophobia-complete-guide']
  },
  {
    id: 'retina',
    label: 'Retina & Vitreous',
    description: 'Retinal diseases and treatments',
    slugs: ['retinal-detachment','retinal-tear','macular-edema','macular-hole','macular-hole-2','macular-pucker','epiretinal-membrane','central-retinal-vein-occlusion-crvo','vitreous-detachment','retinopathy-of-prematurity-rop','retinitis-pigmentosa','retinitis-pigmentosa-rp-comprehensive-overview','hypertensive-retinopathy','diabetic-retinopathy']
  },
  {
    id: 'cornea-lens',
    label: 'Cornea, Lens & Cataract',
    description: 'Front of eye and lens conditions',
    slugs: ['keratoconus','congenital-cataracts','cataract-surgery','cataract-lenses','intraocular-lens-iol','corneal-tattoo','penetrating-keratoplasty-pkp-overview','dmek-overview','dalk-overview','desak-overview','corneal-transplant-surgery-keratoplasty','keratitis','dry-eyes','dry-eye-syndrome']
  },
  {
    id: 'infections',
    label: 'Infections & Inflammations',
    description: 'Eye infections requiring prompt care',
    slugs: ['eye-infections','conjunctivitis','pink-eye-conjunctivitis','blepharitis','uveitis','ocular-injuries','eye-injuries','eye-trauma','stye-hordeolum','chalazion-eye','eyelid-allergies']
  },
  {
    id: 'pediatric',
    label: 'Pediatric & Squint',
    description: 'Children eye problems and alignment',
    slugs: ['pediatric-eye-problems','kids-eye-problems','strabismus-eye-misalignment','amblyopia-lazy-eye','squint-surgical-and-non-surgical','squint-evaluation','non-surgical-squint','esotropia','prism-test','orthoptics','orthoptek','botulinum-toxin-botox-for-strabismus','exercise-for-eye-health','vision-therapy']
  },
  {
    id: 'eyelid-oculoplasty',
    label: 'Eyelids & Oculoplasty',
    description: 'Eyelid disorders and cosmetic repair',
    slugs: ['ptosis-drooping-eyelid','blepharoplasty','eyelid-repair','eyelid-repair-2','blepharospasm','tear-duct-blockages-dacryocystitis','botox','laser-dcr-dacryocystorhinostomy','punctal-plugs','oculoplastic-surgery']
  },
  {
    id: 'systemic',
    label: 'Systemic & Rare Diseases',
    description: 'Diseases affecting eyes from body',
    slugs: ['diabetes','type-2-diabetes','type-1-diabetes','hypertension','thyroid-disorders','thyroid-eye-diseases-ted','thyroid-eye-disease-graves-eye-disease-complete-guide','eye-cancers','eye-tumors','retinoblastoma','rare-eye-diseases','low-vision','preventable-blindness']
  },
  {
    id: 'diagnostics',
    label: 'Diagnostics & Tests',
    description: 'Advanced eye examination methods',
    slugs: ['eye-care-specialist-overview','slit-lamp-examination','visual-acuity-test','pupil-dilation','fundus-fluorescein-angiography-ffa','retinal-imaging','optical-coherence-tomography-oct','visual-field-test-glaucoma','perimetry','keratometry','pachymetry','topography-corneal-topography','usg-b-scan','gonioscopy','oct-onh-optical-coherence-tomography-of-the-optic-nerve','vision-tests','comprehensive-ophthalmologist','neuro-ophthalmologist','ophthalmologist','optometrist']
  },
  {
    id: 'treatments',
    label: 'Treatments & Surgeries',
    description: 'Surgical and laser procedures',
    slugs: ['eye-glasses-contact-lenses','maintain-eye-health','laser-eye-surgery-lasik-trans-prk-asa','refractive-eye-surgery','lasik-laser-assisted-in-situ-keratomileusis','trans-prk-trans-epithelial-photorefractive-keratectomy-comprehensive-guide','asa-advanced-surface-laser-ablation-comprehensive-guide','smile-lasik-eye-surgery-small-incision-lenticule-extraction','lubricating-eye-drops-comprehensive-overview','anti-vegf-treatment','retinal-lasers','yag-laser-treatment','selective-laser-trabeculoplasty-slt','laser-slt-selective-laser-trabeculoplasty','laser-cyclocryopexy','scleral-buckle','macular-buckle','vitrectomy','ocular-injuries','regular-eye-exams']
  }
];

export const getDiseaseBySlug = (slug) => eyeDiseases.find(d => d.slug === slug);

export const getRelatedDiseases = (currentSlug, limit = 6) => {
  // Find group containing current
  const group = eyeDiseaseGroups.find(g => g.slugs.includes(currentSlug));
  if (group) {
    const relatedSlugs = group.slugs.filter(s => s !== currentSlug).slice(0, limit);
    return relatedSlugs.map(s => getDiseaseBySlug(s)).filter(Boolean);
  }
  // fallback: nearby indexes
  const current = getDiseaseBySlug(currentSlug);
  if (!current) return [];
  const idx = eyeDiseases.findIndex(d => d.slug === currentSlug);
  return [...eyeDiseases.slice(Math.max(0, idx - 3), idx), ...eyeDiseases.slice(idx + 1, idx + 4)].slice(0, limit);
};

export const eyeDiseasesCount = eyeDiseases.length;
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, jsContent, 'utf-8');
console.log(`Generated ${data.length} eye diseases to ${outPath}`);

// Also generate a simple json for public use maybe
const publicJsonPath = '/home/user/design_new_website/public/eye-diseases/index.json';
fs.writeFileSync(publicJsonPath, JSON.stringify(data.map(d => ({ slug: d.slug, title: d.title, shortDesc: d.shortDesc, folder: d.folder, index: d.index, pages: d.pages, images: d.images })), null, 2));
console.log(`Generated public index json`);
