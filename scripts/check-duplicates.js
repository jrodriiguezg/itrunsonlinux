import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Collect all existing IDs from seed files
const existingIds = new Set();

function extractIdsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Match all app IDs: ('id', ...) pattern
    const matches = content.matchAll(/\('([a-z0-9][a-z0-9_-]*)',/gi);
    for (const match of matches) {
      existingIds.add(match[1].toLowerCase());
    }
  } catch (e) {
    // File doesn't exist, skip
  }
}

// Main seed files
const seedFiles = [
  'db/seed.sql',
  'db/seed-extended.sql',
  'db/seed-bulk.sql',
  'db/seed-crossplatform.sql',
  'db/seed-alternatives.sql'
];

seedFiles.forEach(f => extractIdsFromFile(path.join(projectRoot, f)));

// Batch scripts
const scriptsDir = path.join(projectRoot, 'scripts');
const batchFiles = fs.readdirSync(scriptsDir).filter(f => 
  f.startsWith('add-100-apps') && f.endsWith('.js')
);
batchFiles.forEach(f => extractIdsFromFile(path.join(scriptsDir, f)));

console.log(`✅ Found ${existingIds.size} existing unique app IDs\n`);

// Check expansion files for duplicates
const expansionDir = path.join(projectRoot, 'db', 'expansion');
let totalNew = 0;
let totalDuplicates = 0;
const allDuplicates = [];

if (fs.existsSync(expansionDir)) {
  const expansionFiles = fs.readdirSync(expansionDir).filter(f => f.endsWith('.sql'));
  
  for (const file of expansionFiles) {
    const filePath = path.join(expansionDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = [...content.matchAll(/\('([a-z0-9][a-z0-9_-]*)',/gi)];
    
    const fileIds = matches.map(m => m[1].toLowerCase());
    const duplicates = fileIds.filter(id => existingIds.has(id));
    const newIds = fileIds.filter(id => !existingIds.has(id));
    
    console.log(`📄 ${file}:`);
    console.log(`   Total entries: ${fileIds.length}`);
    console.log(`   New: ${newIds.length}`);
    console.log(`   Duplicates: ${duplicates.length}`);
    
    if (duplicates.length > 0) {
      console.log(`   ⚠️  Duplicate IDs: ${[...new Set(duplicates)].join(', ')}`);
      allDuplicates.push(...duplicates);
    }
    
    // Add new IDs to the set to avoid cross-file duplicates
    newIds.forEach(id => existingIds.add(id));
    
    totalNew += newIds.length;
    totalDuplicates += duplicates.length;
    console.log('');
  }
}

console.log('='.repeat(50));
console.log(`📊 Summary:`);
console.log(`   Total existing IDs: ${existingIds.size - totalNew}`);
console.log(`   Total new apps: ${totalNew}`);
console.log(`   Total duplicates found: ${totalDuplicates}`);
console.log(`   Final DB size: ~${existingIds.size} apps`);
console.log('='.repeat(50));

if (totalDuplicates > 0) {
  console.log('\n⚠️  WARNING: Remove duplicate entries before executing SQL files!');
  console.log('   Duplicates:', [...new Set(allDuplicates)].join(', '));
  process.exit(1);
} else {
  console.log('\n✅ No duplicates found. Safe to execute SQL files.');
}
