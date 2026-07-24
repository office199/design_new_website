import fs from 'fs';
import path from 'path';
const baseDir = path.resolve('/home/user/design_new_website/Eye Diseases & Conditions');
const manifestPath = path.join(baseDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

function slugFromFolder(folder){ return folder.replace(/^\d+-/, ''); }

const urls = [];

// main
urls.push({ loc: 'https://ashulaservision.com/', priority: '1.0', changefreq: 'daily' });
urls.push({ loc: 'https://ashulaservision.com/about', priority: '0.8', changefreq: 'weekly' });
urls.push({ loc: 'https://ashulaservision.com/services', priority: '0.9', changefreq: 'daily' });
urls.push({ loc: 'https://ashulaservision.com/eye-diseases', priority: '0.9', changefreq: 'daily' });
urls.push({ loc: 'https://ashulaservision.com/doctor', priority: '0.8', changefreq: 'monthly' });
urls.push({ loc: 'https://ashulaservision.com/technology', priority: '0.7', changefreq: 'monthly' });
urls.push({ loc: 'https://ashulaservision.com/contact', priority: '0.9', changefreq: 'monthly' });
urls.push({ loc: 'https://ashulaservision.com/blogs', priority: '0.7', changefreq: 'weekly' });

// services (from previous sitemap)
const services = [
  'cataract','lasik','retina','glaucoma','diabetic-retinopathy','retinal-detachment','squint','kids-eye-problem','pediatric','cornea','age-related-macular-degeneration','retinopathy-of-prematurity','ocular-injuries','oculoplastics','eye-tumors','hypertensive-retinopathy','anti-vegf-treatment','advanced-surface-laser-ablation','laser-dcr','pachymetry','laser','topography','perimetry','care-at-home','botox','yag-laser','fundus-fluorescein-angiography','optical-coherence-tomography','selective-laser-trabeculoplasty','orthokeratology','vision-therapy'
];
for (const s of services){
  urls.push({ loc: `https://ashulaservision.com/services/${s}`, priority: '0.75', changefreq: 'weekly' });
}

// eye diseases
for (const entry of manifest){
  const slug = slugFromFolder(entry.folder);
  urls.push({ loc: `https://ashulaservision.com/eye-diseases/${slug}`, priority: '0.8', changefreq: 'monthly' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u=>`  <url><loc>${u.loc}</loc><priority>${u.priority}</priority><changefreq>${u.changefreq}</changefreq></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('/home/user/design_new_website/public/sitemap.xml', xml);
console.log(`Generated sitemap with ${urls.length} urls`);
