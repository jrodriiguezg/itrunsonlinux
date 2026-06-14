const fs = require('fs');
const https = require('https');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../db/seed-500.sql');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        } else {
          resolve(null); // or reject
        }
      });
    }).on('error', reject);
  });
}

function cleanString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log('Fetching Flathub app IDs...');
  const appIds = await fetchJson('https://flathub.org/api/v2/appstream');
  if (!appIds || !Array.isArray(appIds)) {
    console.error('Failed to fetch app IDs');
    return;
  }
  console.log(`Fetched ${appIds.length} app IDs from Flathub.`);

  let sqlContent = fs.readFileSync(SEED_FILE, 'utf8');
  
  // Regex to match INSERT rows: ('id', 'Name', 'Desc', 'Category', 'Icon', 'LinuxAlternative')
  // Values are single-quoted. We must be careful with escaped quotes.
  // We'll process line by line to keep it simple, since the file is line-based.
  const lines = sqlContent.split('\n');
  
  const regex = /^\((['"])(.*?)\1, (['"])(.*?)\3, (['"])(.*?)\5, (['"])(.*?)\7, (['"])(.*?)\9, (['"])(.*?)\11\)/;
  
  let matchCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('(')) continue;
    
    // We will do a manual parse for rows because regex with escaped quotes is brittle.
    // However, the rows are well structured.
    // Let's find the values.
    const parts = line.split(/', '/);
    if (parts.length >= 6) {
      // The name is the second item: parts[1]
      const name = parts[1];
      const cleanName = cleanString(name);
      if (cleanName.length < 3) continue; // Skip very short names
      
      const currentLinuxAlt = parts[5].replace(/'\),?$/, '');
      
      // If it already contains Native Linux Version, skip fetching to save time, unless we want to add github links to existing ones?
      // The user wants to mark many missing apps. We can skip if it's already Native Linux Version (Flatpak).
      if (currentLinuxAlt.includes('flathub:')) continue;
      
      // Find candidate Flathub IDs
      const candidates = appIds.filter(id => {
        const idParts = id.split('.');
        const last = cleanString(idParts[idParts.length - 1]);
        const secondLast = idParts.length > 1 ? cleanString(idParts[idParts.length - 2]) : '';
        return cleanName === last || cleanName === secondLast || cleanName === last + secondLast || cleanName === secondLast + last;
      });

      for (const candidateId of candidates) {
        console.log(`Checking candidate ${candidateId} for app ${name}...`);
        const meta = await fetchJson(`https://flathub.org/api/v2/appstream/${candidateId}`);
        if (meta && meta.name) {
          const metaNameClean = cleanString(meta.name);
          // If the Flathub name matches the DB name
          if (metaNameClean === cleanName || metaNameClean.includes(cleanName) || cleanName.includes(metaNameClean)) {
            console.log(`✅ MATCH! ${name} -> ${candidateId}`);
            
            let githubUrl = '';
            if (meta.urls && meta.urls.vcs_browser && meta.urls.vcs_browser.includes('github.com')) {
              githubUrl = meta.urls.vcs_browser;
            } else if (meta.urls && meta.urls.homepage && meta.urls.homepage.includes('github.com')) {
              githubUrl = meta.urls.homepage;
            }

            const newAlt = `Native Linux Version${githubUrl ? '|github:' + githubUrl : ''}|flathub:${candidateId}`;
            
            // Reconstruct line
            // We need to replace the last part.
            // The last part is `... , 'oldAlt'),` or `... , 'oldAlt');`
            lines[i] = line.replace(/, '([^']*)'\)(,|;)$/, `, '${newAlt}')$2`);
            matchCount++;
            break; // Stop checking candidates for this app
          }
        }
        // Small delay to avoid hammering the API
        await new Promise(r => setTimeout(r, 100));
      }
    }
  }

  fs.writeFileSync(SEED_FILE, lines.join('\n'));
  console.log(`\n🎉 Sync complete! Updated ${matchCount} apps.`);
}

run().catch(console.error);
