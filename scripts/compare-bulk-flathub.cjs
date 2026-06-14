const fs = require('fs');
const https = require('https');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../db/seed-bulk.sql');
const ARTIFACT_FILE = path.join('/home/jrodriiguezg/.gemini/antigravity/brain/4a5663a3-79f5-4be3-997f-83e8cca8d50c', 'all_native_linux_apps.md');

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
  console.log('Fetching app IDs from Flathub...');
  const appIds = await fetchJson('https://flathub.org/api/v2/appstream');
  if (!appIds) {
    console.error('Failed to fetch from Flathub API');
    return;
  }
  console.log(`Fetched ${appIds.length} app IDs.`);

  let sqlContent = fs.readFileSync(SEED_FILE, 'utf8');
  const lines = sqlContent.split('\n');
  
  let markdown = '# All Native Linux Apps\n\nThis report compares ALL your 4000+ applications against Flathub to see which ones have a Native Linux Version.\n\n';
  markdown += '| Application Name | Flathub ID |\n';
  markdown += '|---|---|\n';

  let matchCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('(')) continue;
    
    const parts = line.split(/', '/);
    if (parts.length >= 6) {
      const name = parts[1];
      const cleanName = cleanString(name);
      if (cleanName.length < 3) continue;
      
      const currentLinuxAlt = parts[5].replace(/'\),?$/, '');
      if (currentLinuxAlt.includes('flathub:')) {
          const match = currentLinuxAlt.match(/flathub:([^|]+)/);
          if (match) {
              markdown += `| **${name}** | \`${match[1]}\` |\n`;
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
            markdown += `| **${name}** | \`${candidateId}\` |\n`;
            matchCount++;
            break;
          }
        }
      }
    }
  }

  markdown += `\n**Total Native Matches:** ${matchCount}\n`;
  fs.writeFileSync(ARTIFACT_FILE, markdown);
  console.log(`Report created successfully! Matches found: ${matchCount}`);
}

run().catch(console.error);
