import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbDir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/';
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.sqlite') && f !== 'metadata.sqlite');

if (files.length === 0) {
  console.error('No SQLite database found.');
  process.exit(1);
}

const dbPath = path.join(dbDir, files[0]);
const db = new Database(dbPath);

const apps = db.prepare(`
  SELECT id, name, category, description 
  FROM apps 
  WHERE linux_alternative IS NULL OR linux_alternative = '' 
  LIMIT 150
`).all();

fs.writeFileSync('db_empty_batch.json', JSON.stringify(apps, null, 2));
console.log(`Successfully exported ${apps.length} apps to db_empty_batch.json`);
db.close();
