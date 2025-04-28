// fetchAllClasses.js
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'https://www.dnd5eapi.co/api';

async function fetchAllClasses() {
  const allClassesRes = await fetch(`${API_BASE}/classes`);
  const allClassesData = await allClassesRes.json();
  const classIndexes = allClassesData.results.map(cls => cls.index);

  const classes = [];
  for (let i = 0; i < classIndexes.length; i++) {
    const index = classIndexes[i];
    process.stdout.write(`Fetching [${i + 1}/${classIndexes.length}]: ${index}... `);
    const res = await fetch(`${API_BASE}/classes/${index}`);
    if (!res.ok) {
      console.warn(`Failed to fetch ${index}`);
      continue;
    }
    const cls = await res.json();
    classes.push(cls);
    console.log('done');
    await new Promise(r => setTimeout(r, 50));
  }

  const outPath = path.join(__dirname, 'allClasses.json');
  fs.writeFileSync(outPath, JSON.stringify(classes, null, 2), 'utf-8');
  console.log(`Fetched ${classes.length} classes. Saved to src/allClasses.json`);
}

fetchAllClasses();