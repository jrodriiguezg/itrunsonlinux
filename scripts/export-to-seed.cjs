const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '../.wrangler/state/v3/d1/miniflare-D1DatabaseObject/');
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.sqlite') && f !== 'metadata.sqlite');

if (files.length === 0) {
  console.error('No SQLite database found.');
  process.exit(1);
}

const dbPath = path.join(dbDir, files[0]);
const db = new Database(dbPath);

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val.toString();
  return `'${val.toString().replace(/'/g, "''")}'`;
}

// 1. Export all apps to seed-bulk.sql
const apps = db.prepare('SELECT id, name, description, category, icon, linux_alternative, popularity, homepage, alternative_to FROM apps ORDER BY popularity DESC, name ASC').all();
const reports = db.prepare('SELECT id, app_id, github_user, rating, runner, details, date FROM reports').all();

let bulkContent = `-- Extended Seeding of Winget Packages with all updates
DELETE FROM reports;
DELETE FROM apps;

`;

// apps insertion in batches of 100 for safety and readability
for (let i = 0; i < apps.length; i += 100) {
  const batch = apps.slice(i, i + 100);
  bulkContent += 'INSERT INTO apps (id, name, description, category, icon, linux_alternative, popularity, homepage, alternative_to) VALUES\n';
  bulkContent += batch.map(app => `(${escapeSql(app.id)}, ${escapeSql(app.name)}, ${escapeSql(app.description)}, ${escapeSql(app.category)}, ${escapeSql(app.icon)}, ${escapeSql(app.linux_alternative)}, ${escapeSql(app.popularity)}, ${escapeSql(app.homepage)}, ${escapeSql(app.alternative_to)})`).join(',\n') + ';\n\n';
}

if (reports.length > 0) {
  bulkContent += 'INSERT INTO reports (id, app_id, github_user, rating, runner, details, date) VALUES\n';
  bulkContent += reports.map(rep => `(${escapeSql(rep.id)}, ${escapeSql(rep.app_id)}, ${escapeSql(rep.github_user)}, ${escapeSql(rep.rating)}, ${escapeSql(rep.runner)}, ${escapeSql(rep.details)}, ${escapeSql(rep.date)})`).join(',\n') + ';\n\n';
}

fs.writeFileSync(path.join(__dirname, '../db/seed-bulk.sql'), bulkContent);
console.log(`Successfully exported ${apps.length} apps and ${reports.length} reports to db/seed-bulk.sql!`);

// 2. Export 500 apps to seed-500.sql (the top 500 apps)
const top500Apps = apps.slice(0, 500);
let seed500Content = `-- Seeding of exactly top 500 Packages
DELETE FROM reports;
DELETE FROM apps;

`;

for (let i = 0; i < top500Apps.length; i += 100) {
  const batch = top500Apps.slice(i, i + 100);
  seed500Content += 'INSERT INTO apps (id, name, description, category, icon, linux_alternative, popularity, homepage, alternative_to) VALUES\n';
  seed500Content += batch.map(app => `(${escapeSql(app.id)}, ${escapeSql(app.name)}, ${escapeSql(app.description)}, ${escapeSql(app.category)}, ${escapeSql(app.icon)}, ${escapeSql(app.linux_alternative)}, ${escapeSql(app.popularity)}, ${escapeSql(app.homepage)}, ${escapeSql(app.alternative_to)})`).join(',\n') + ';\n\n';
}

if (reports.length > 0) {
  seed500Content += 'INSERT INTO reports (id, app_id, github_user, rating, runner, details, date) VALUES\n';
  seed500Content += reports.map(rep => `(${escapeSql(rep.id)}, ${escapeSql(rep.app_id)}, ${escapeSql(rep.github_user)}, ${escapeSql(rep.rating)}, ${escapeSql(rep.runner)}, ${escapeSql(rep.details)}, ${escapeSql(rep.date)})`).join(',\n') + ';\n\n';
}

fs.writeFileSync(path.join(__dirname, '../db/seed-500.sql'), seed500Content);
console.log(`Successfully exported top ${top500Apps.length} apps to db/seed-500.sql!`);

db.close();
