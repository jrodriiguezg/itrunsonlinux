import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbDir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/';
if (!fs.existsSync(dbDir)) {
  console.error('Wrangler state directory not found.');
  process.exit(1);
}

const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.sqlite') && f !== 'metadata.sqlite');

if (files.length === 0) {
  console.error('No SQLite database found.');
  process.exit(1);
}

const dbPath = path.join(dbDir, files[0]);
const db = new Database(dbPath);

const apps = db.prepare('SELECT id FROM apps').all();

const siteUrl = 'https://itrunsonlinux.jrodriiguezg.link';
const currentDate = new Date().toISOString();

const staticPages = [
  '',
  '/faq',
  '/tutorials'
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static pages
staticPages.forEach(page => {
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}${page}</loc>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
  xml += `  </url>\n`;
});

// Dynamic apps
apps.forEach(app => {
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}/app/${app.id}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.6</priority>\n`;
  xml += `  </url>\n`;
});

xml += '</urlset>';

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Static sitemap generated successfully at public/sitemap.xml with ${apps.length} apps!`);
db.close();
