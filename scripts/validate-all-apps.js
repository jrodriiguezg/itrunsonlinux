import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Find local D1 database
const dbDir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/';
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.sqlite') && f !== 'metadata.sqlite');

if (files.length === 0) {
  console.error('No SQLite database found. Run "npm run dev" first to create it.');
  process.exit(1);
}

const dbPath = path.join(projectRoot, dbDir, files[0]);
const db = new Database(dbPath);

// Get all apps
const apps = db.prepare('SELECT * FROM apps ORDER BY name').all();
const reports = db.prepare('SELECT * FROM reports').all();

console.log(`📊 Total apps: ${apps.length}`);
console.log(`📊 Total reports: ${reports.length}\n`);

// Known valid Flathub IDs (sample - we'll check against actual Flathub data)
const validFlathubPrefixes = [
  'org.', 'com.', 'io.', 'net.', 'fr.', 'de.', 'uk.', 'info.',
  'app.', 'me.', 'name.', 'xyz.', 'dev.'
];

// Issues found
const issues = {
  missingAlternative: [],
  missingDescription: [],
  emptyDescription: [],
  missingHomepage: [],
  invalidFlathubId: [],
  duplicateIds: [],
  shortDescription: [],
  missingCategory: [],
  genericDescription: [],
  suspiciousNames: [],
};

// Track IDs for duplicates
const idCount = {};

for (const app of apps) {
  // Check for duplicate IDs
  idCount[app.id] = (idCount[app.id] || 0) + 1;

  // Check missing alternative (for non-native apps)
  if (!app.linux_alternative || app.linux_alternative.trim() === '') {
    issues.missingAlternative.push({
      id: app.id,
      name: app.name,
      category: app.category
    });
  }

  // Check missing/empty description
  if (!app.description || app.description.trim() === '') {
    issues.emptyDescription.push({ id: app.id, name: app.name });
  } else if (app.description.length < 20) {
    issues.shortDescription.push({
      id: app.id,
      name: app.name,
      desc: app.description
    });
  }

  // Check generic/placeholder descriptions
  const genericPatterns = [
    /^(software|app|application|tool|program)$/i,
    /^(todo|all|misc|other|various)/i,
    /placeholder/i,
    /lorem ipsum/i,
    /test app/i,
  ];
  if (genericPatterns.some(p => p.test(app.description))) {
    issues.genericDescription.push({
      id: app.id,
      name: app.name,
      desc: app.description
    });
  }

  // Check missing homepage
  if (!app.homepage || app.homepage.trim() === '') {
    issues.missingHomepage.push({ id: app.id, name: app.name });
  }

  // Check missing category
  if (!app.category || app.category.trim() === '') {
    issues.missingCategory.push({ id: app.id, name: app.name });
  }

  // Check Flathub ID references in linux_alternative
  if (app.linux_alternative) {
    const flathubMatch = app.linux_alternative.match(/flathub:([^\s/|]+)/);
    if (flathubMatch) {
      const flathubId = flathubMatch[1];
      // Basic validation: should have at least one dot
      if (!flathubId.includes('.')) {
        issues.invalidFlathubId.push({
          id: app.id,
          name: app.name,
          flathubId: flathubId,
          reason: 'No dots in ID'
        });
      }
      // Check if it starts with a known prefix
      const hasValidPrefix = validFlathubPrefixes.some(p => flathubId.startsWith(p));
      if (!hasValidPrefix) {
        issues.invalidFlathubId.push({
          id: app.id,
          name: app.name,
          flathubId: flathubId,
          reason: `Doesn't start with known prefix`
        });
      }
    }

    // Check for broken pipe syntax
    const pipeParts = app.linux_alternative.split('|');
    if (pipeParts.length > 1) {
      const metadata = pipeParts[1];
      if (metadata && !metadata.includes('flathub:') && !metadata.includes('github:')) {
        // Could be alternative names after pipe, which is fine
      }
    }
  }

  // Check for suspicious names (numbers only, single char, etc.)
  if (app.name.length < 2 || /^\d+$/.test(app.name)) {
    issues.suspiciousNames.push({ id: app.id, name: app.name });
  }
}

// Find duplicates
for (const [id, count] of Object.entries(idCount)) {
  if (count > 1) {
    issues.duplicateIds.push({ id, count });
  }
}

// Check for apps with same name but different IDs
const nameToIds = {};
for (const app of apps) {
  const normalizedName = app.name.toLowerCase().trim();
  if (!nameToIds[normalizedName]) nameToIds[normalizedName] = [];
  nameToIds[normalizedName].push(app.id);
}

// Print results
console.log('='.repeat(60));
console.log('📋 VALIDATION RESULTS');
console.log('='.repeat(60));

if (issues.duplicateIds.length > 0) {
  console.log(`\n🔴 DUPLICATE IDs (${issues.duplicateIds.length}):`);
  for (const d of issues.duplicateIds) {
    console.log(`   ${d.id} appears ${d.count} times`);
  }
}

if (issues.missingAlternative.length > 0) {
  console.log(`\n🟡 MISSING ALTERNATIVE (${issues.missingAlternative.length}):`);
  for (const a of issues.missingAlternative.slice(0, 50)) {
    console.log(`   [${a.id}] ${a.name} (${a.category})`);
  }
  if (issues.missingAlternative.length > 50) {
    console.log(`   ... and ${issues.missingAlternative.length - 50} more`);
  }
}

if (issues.emptyDescription.length > 0) {
  console.log(`\n🔴 EMPTY DESCRIPTION (${issues.emptyDescription.length}):`);
  for (const a of issues.emptyDescription) {
    console.log(`   [${a.id}] ${a.name}`);
  }
}

if (issues.shortDescription.length > 0) {
  console.log(`\n🟡 SHORT DESCRIPTION <20 chars (${issues.shortDescription.length}):`);
  for (const a of issues.shortDescription.slice(0, 20)) {
    console.log(`   [${a.id}] ${a.name}: "${a.desc}"`);
  }
  if (issues.shortDescription.length > 20) {
    console.log(`   ... and ${issues.shortDescription.length - 20} more`);
  }
}

if (issues.genericDescription.length > 0) {
  console.log(`\n🟡 GENERIC/PLACEHOLDER DESCRIPTION (${issues.genericDescription.length}):`);
  for (const a of issues.genericDescription) {
    console.log(`   [${a.id}] ${a.name}: "${a.desc}"`);
  }
}

if (issues.missingHomepage.length > 0) {
  console.log(`\n🟡 MISSING HOMEPAGE (${issues.missingHomepage.length}):`);
  for (const a of issues.missingHomepage.slice(0, 30)) {
    console.log(`   [${a.id}] ${a.name}`);
  }
  if (issues.missingHomepage.length > 30) {
    console.log(`   ... and ${issues.missingHomepage.length - 30} more`);
  }
}

if (issues.invalidFlathubId.length > 0) {
  console.log(`\n🔴 INVALID FLATHUB IDs (${issues.invalidFlathubId.length}):`);
  for (const a of issues.invalidFlathubId) {
    console.log(`   [${a.id}] ${a.name}: "${a.flathubId}" - ${a.reason}`);
  }
}

if (issues.missingCategory.length > 0) {
  console.log(`\n🔴 MISSING CATEGORY (${issues.missingCategory.length}):`);
  for (const a of issues.missingCategory) {
    console.log(`   [${a.id}] ${a.name}`);
  }
}

if (issues.suspiciousNames.length > 0) {
  console.log(`\n🟡 SUSPICIOUS NAMES (${issues.suspiciousNames.length}):`);
  for (const a of issues.suspiciousNames) {
    console.log(`   [${a.id}] "${a.name}"`);
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`   Total apps: ${apps.length}`);
console.log(`   Duplicate IDs: ${issues.duplicateIds.length}`);
console.log(`   Missing alternative: ${issues.missingAlternative.length}`);
console.log(`   Empty description: ${issues.emptyDescription.length}`);
console.log(`   Short description: ${issues.shortDescription.length}`);
console.log(`   Generic description: ${issues.genericDescription.length}`);
console.log(`   Missing homepage: ${issues.missingHomepage.length}`);
console.log(`   Invalid Flathub IDs: ${issues.invalidFlathubId.length}`);
console.log(`   Missing category: ${issues.missingCategory.length}`);
console.log(`   Suspicious names: ${issues.suspiciousNames.length}`);

// Also check for name duplicates (same name, different IDs)
const nameDuplicates = Object.entries(nameToIds).filter(([_, ids]) => ids.length > 1);
if (nameDuplicates.length > 0) {
  console.log(`\n🟡 SAME NAME DIFFERENT IDs (${nameDuplicates.length}):`);
  for (const [name, ids] of nameDuplicates.slice(0, 20)) {
    console.log(`   "${name}" -> ${ids.join(', ')}`);
  }
  if (nameDuplicates.length > 20) {
    console.log(`   ... and ${nameDuplicates.length - 20} more`);
  }
}

// Save full report
const report = {
  totalApps: apps.length,
  totalReports: reports.length,
  issues,
  nameDuplicates: nameDuplicates.map(([name, ids]) => ({ name, ids })),
};

fs.writeFileSync(path.join(projectRoot, 'scripts/validation-report.json'), JSON.stringify(report, null, 2));
console.log('\n✅ Full report saved to scripts/validation-report.json');
