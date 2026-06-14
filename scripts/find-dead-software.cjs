const fs = require('fs');
const http = require('http');
const https = require('https');
const { execSync } = require('child_process');
const path = require('path');

const DB_PATH = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/a997f39c690f8f16b542215a329bb53d627cc72191ccb9b08bc0eb6d83cc7b84.sqlite';
const SQL_FILE = path.join(__dirname, '../db/remove-dead-software.sql');

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    if (!urlStr || !urlStr.startsWith('http')) return resolve(false); // Invalid URL
    
    const parsedUrl = new URL(urlStr);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const req = client.get(urlStr, { timeout: 8000 }, (res) => {
      // Check for 404 Not Found, 5xx server errors, or generic dead statuses
      if (res.statusCode === 404 || res.statusCode >= 500) {
        resolve(false);
      } else {
        resolve(true); // Assume alive
      }
      res.resume(); // consume response body
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false); // Timeout means likely dead
    });

    req.on('error', (err) => {
      // DNS resolution errors (ENOTFOUND) mean the site is dead
      if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
        resolve(false);
      } else {
        // Other SSL/TLS errors might just be bad certs, assume alive to be safe
        resolve(true);
      }
    });
  });
}

async function run() {
  console.log('Querying database for applications...');
  const output = execSync(`sqlite3 ${DB_PATH} "SELECT id, homepage, name FROM apps;"`, { encoding: 'utf8' });
  const rows = output.split('\n').filter(r => r.trim() !== '');
  
  let deadApps = [];
  let sqlUpdates = '-- Dead Software Removal Script\n';
  
  // To avoid hitting open files limits, we process in small batches
  console.log(`Found ${rows.length} applications. Checking homepages...`);
  
  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].split('|');
    if (cols.length < 3) continue;
    
    const id = cols[0];
    const homepage = cols[1];
    const name = cols[2];
    
    if (homepage && homepage.trim() !== '') {
      try {
        const isAlive = await checkUrl(homepage);
        if (!isAlive) {
          console.log(`❌ Dead: ${name} (${homepage})`);
          deadApps.push({ id, name, homepage });
          sqlUpdates += `DELETE FROM reports WHERE app_id = '${id}';\n`;
          sqlUpdates += `DELETE FROM apps WHERE id = '${id}';\n`;
        }
      } catch (e) {
        console.log(`⚠️ Skipped/Error: ${name} (${homepage})`);
      }
    } else {
      // No homepage, assume it's valid to keep to avoid false positives, or flag it?
      // User says "software that no longer exists". Better to be safe and keep it if no URL.
    }
    
    // Status update
    if (i > 0 && i % 50 === 0) {
      console.log(`Progress: ${i}/${rows.length}`);
    }
  }

  if (deadApps.length > 0) {
    fs.writeFileSync(SQL_FILE, sqlUpdates);
    console.log(`\nFound ${deadApps.length} dead apps. SQL cleanup script generated at ${SQL_FILE}`);
  } else {
    console.log('\nNo dead applications found!');
  }
}

run().catch(console.error);
