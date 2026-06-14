const fs = require('fs');
const https = require('https');
const path = require('path');
const file = path.join(__dirname, '../db/seed-500.sql');
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = ''; res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e){ resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

async function fix() {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Native Linux Version|flathub:')) {
      // It's a broken line. Extract the flathub ID.
      const match = lines[i].match(/flathub:([^']+)'\)(,|;)$/);
      if (match) {
        const id = match[1];
        const meta = await fetchJson(`https://flathub.org/api/v2/appstream/${id}`);
        let url = '';
        if (meta && meta.urls && meta.urls.homepage) {
          url = meta.urls.homepage;
        } else {
          // guess or leave blank
          url = `https://flathub.org/apps/${id}`;
        }
        lines[i] = lines[i].replace(/'Native Linux Version\|flathub:[^']+'\)(,|;)$/, `\'${url}\')$1`);
        console.log(`Fixed ${id} -> ${url}`);
      }
    }
  }
  fs.writeFileSync(file, lines.join('\n'));
}
fix();
