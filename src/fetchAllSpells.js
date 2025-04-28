// fetchAllSpells.js
const fs = require('fs');
const path = require('path');
// Use dynamic import for node-fetch v3+
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'https://www.dnd5eapi.co/api';

async function fetchAllSpells() {
  const allSpellsRes = await fetch(`${API_BASE}/spells`);
  const allSpellsData = await allSpellsRes.json();
  const spellIndexes = allSpellsData.results.map(spell => spell.index);

  const spells = [];
  for (let i = 0; i < spellIndexes.length; i++) {
    const index = spellIndexes[i];
    process.stdout.write(`Fetching [${i + 1}/${spellIndexes.length}]: ${index}... `);
    const res = await fetch(`${API_BASE}/spells/${index}`);
    if (!res.ok) {
      console.warn(`Failed to fetch ${index}`);
      continue;
    }
    const spell = await res.json();
    spells.push(spell);
    console.log('done');
    // Optional: throttle requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 50));
  }

  const outPath = path.join(__dirname, 'allSpells.json');
  fs.writeFileSync(outPath, JSON.stringify(spells, null, 2), 'utf-8');
  console.log(`Fetched ${spells.length} spells. Saved to src/allSpells.json`);
}

fetchAllSpells();