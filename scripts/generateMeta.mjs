import fs from 'fs';
const data = JSON.parse(fs.readFileSync('/home/user/design_new_website/public/eye-diseases/index.json','utf-8'));
const groups = JSON.parse(fs.readFileSync('/home/user/design_new_website/Eye Diseases & Conditions/manifest.json','utf-8')).map(e=>e.title);
// Actually we need groups from previous file
const metaFile = fs.readFileSync('/home/user/design_new_website/src/data/eyeDiseasesData.js','utf-8');
const groupsMatch = metaFile.match(/export const eyeDiseaseGroups = (\[[\s\S]*?\]);\n\nexport const getDiseaseBySlug/);
let groupsCode = '';
if (groupsMatch) {
  groupsCode = `export const eyeDiseaseGroups = ${groupsMatch[1]};\n`;
}

// generate meta
const metaData = `
export const eyeDiseases = ${JSON.stringify(data, null, 2)};

${groupsCode}
export const getDiseaseBySlug = (slug) => eyeDiseases.find(d => d.slug === slug);
export const eyeDiseasesCount = eyeDiseases.length;
`;

fs.writeFileSync('/home/user/design_new_website/src/data/eyeDiseasesMeta.js', metaData);
console.log('Generated meta');
