const fs = require('fs');
const https = require('https');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../db/seed-bulk.sql');
const SQL_FILE = path.join(__dirname, '../db/update-native-apps.sql');

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function cleanString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  const appIds = await fetchJson('https://flathub.org/api/v2/appstream');
  if (!appIds) return;

  let sqlContent = fs.readFileSync(SEED_FILE, 'utf8');
  const lines = sqlContent.split('\n');
  
  let updates = '-- Automatically generated updates for Native Linux Apps\n';
  let matchCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('(')) continue;
    
    const parts = line.split(/', '/);
    if (parts.length >= 6) {
      const dbId = parts[0].substring(2); // remove opening `(` and `'`
      const name = parts[1];
      const cleanName = cleanString(name);
      if (cleanName.length < 3) continue;
      
      const currentLinuxAlt = parts[5].replace(/'\),?$/, '');
      if (currentLinuxAlt.includes('flathub:')) {
          const match = currentLinuxAlt.match(/flathub:([^|]+)/);
          if (match) {
              updates += `UPDATE apps SET linux_alternative = 'Native Linux Version|flathub:${match[1]}' WHERE id = '${dbId}';\n`;
              matchCount++;
          }
          continue;
      }
      
      const candidates = appIds.filter(id => {
        const idParts = id.split('.');
        const last = cleanString(idParts[idParts.length - 1]);
        const secondLast = idParts.length > 1 ? cleanString(idParts[idParts.length - 2]) : '';
        return cleanName === last || cleanName === secondLast || cleanName === last + secondLast || cleanName === secondLast + last;
      });

      for (const candidateId of candidates) {
        const meta = await fetchJson(`https://flathub.org/api/v2/appstream/${candidateId}`);
        if (meta && meta.name) {
          const metaNameClean = cleanString(meta.name);
          if (metaNameClean === cleanName || metaNameClean.includes(cleanName) || cleanName.includes(metaNameClean)) {
            updates += `UPDATE apps SET linux_alternative = 'Native Linux Version|flathub:${candidateId}' WHERE id = '${dbId}';\n`;
            matchCount++;
            break;
          }
        }
      }
    }
  }

  fs.writeFileSync(SQL_FILE, updates);
  console.log(`Created ${SQL_FILE} with ${matchCount} updates.`);
}

run().catch(console.error);
