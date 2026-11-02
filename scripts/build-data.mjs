import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const source = new URL('../dist/content.json', import.meta.url);
const archive = JSON.parse(readFileSync(source, 'utf8'));
const ids = new Set();
for (const event of archive.events) {
  if (ids.has(event.id)) throw new Error(`Duplicate event: ${event.id}`);
  ids.add(event.id);
  if (!event.people.length) throw new Error(`Empty event: ${event.id}`);
  for (const id of event.people) {
    if (!archive.people[id]) throw new Error(`Missing profile: ${id}`);
  }
  for (const visual of event.visuals || []) {
    if (!visual.title || !visual.alt || !visual.caption || !visual.credit) throw new Error(`Incomplete visual: ${event.id}`);
    if (!existsSync(new URL(`../dist/assets/${visual.file}`, import.meta.url))) throw new Error(`Missing visual asset: ${visual.file}`);
    if (visual.url && !visual.url.startsWith('https://')) throw new Error(`Invalid visual source: ${event.id}`);
  }
  if (event.groups) {
    const grouped = event.groups.flatMap(g => g.people);
    if (grouped.length !== new Set(grouped).size || grouped.length !== event.people.length || grouped.some(id => !event.people.includes(id))) {
      throw new Error(`Profile groups disagree with event list: ${event.id}`);
    }
  }
}
for (const [id, person] of Object.entries(archive.people)) {
  if (id !== person.id || !person.chapters.length || !person.intro || !person.legacy) throw new Error(`Incomplete profile: ${id}`);
  if (archive.events.filter(e => e.people.includes(id)).length !== 1) throw new Error(`Profile needs one parent event: ${id}`);
  const parent = archive.events.find(e => e.people.includes(id));
  if (person.visualIndex !== undefined && (!Number.isInteger(person.visualIndex) || !parent.visuals?.[person.visualIndex])) throw new Error(`Invalid contextual image: ${id}`);
  if (person.image && !existsSync(new URL(`../dist/assets/${person.image}`, import.meta.url))) throw new Error(`Missing portrait: ${id}`);
  const urls = [...(person.sources || []), ...person.chapters, person.burial || {}].map(s => s.url).filter(Boolean);
  if (urls.some(url => !url.startsWith('https://'))) throw new Error(`Invalid source URL: ${id}`);
}
writeFileSync(new URL('../dist/data.js', import.meta.url), `// Generated from content.json by node scripts/build-data.mjs\nwindow.ARCHIVE=${JSON.stringify(archive)};\n`);
console.log(`Validated ${archive.events.length} chapters and ${Object.keys(archive.people).length} profiles; regenerated dist/data.js.`);
