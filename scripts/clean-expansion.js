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
    const matches = content.matchAll(/\('([a-z0-9][a-z0-9_-]*)',/gi);
    for (const match of matches) {
      existingIds.add(match[1].toLowerCase());
    }
  } catch (e) {}
}

const seedFiles = [
  'db/seed.sql', 'db/seed-extended.sql', 'db/seed-bulk.sql',
  'db/seed-crossplatform.sql', 'db/seed-alternatives.sql'
];
seedFiles.forEach(f => extractIdsFromFile(path.join(projectRoot, f)));

const scriptsDir = path.join(projectRoot, 'scripts');
const batchFiles = fs.readdirSync(scriptsDir).filter(f => 
  f.startsWith('add-100-apps') && f.endsWith('.js')
);
batchFiles.forEach(f => extractIdsFromFile(path.join(scriptsDir, f)));

console.log(`✅ Found ${existingIds.size} existing unique app IDs\n`);

const expansionDir = path.join(projectRoot, 'db', 'expansion');
const expansionFiles = fs.readdirSync(expansionDir).filter(f => f.endsWith('.sql'));

let totalRemoved = 0;

for (const file of expansionFiles) {
  const filePath = path.join(expansionDir, file);
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  const cleanedLines = [];
  let removedInFile = 0;
  
  for (const line of lines) {
    // Check if this is an INSERT INTO apps line
    const appMatch = line.match(/^\s*\('([a-z0-9][a-z0-9_-]*)',/i);
    if (appMatch) {
      const id = appMatch[1].toLowerCase();
      if (existingIds.has(id)) {
        removedInFile++;
        // Also remove the trailing comma/semicolon from previous line if needed
        continue;
      }
      existingIds.add(id);
    }
    
    // Check if this is an INSERT INTO reports line
    const reportMatch = line.match(/^\s*\('[^']+',\s*'([a-z0-9][a-z0-9_-]*)',/i);
    if (reportMatch) {
      const appId = reportMatch[1].toLowerCase();
      // We need to check if the app was removed - but we don't track that easily
      // For now, keep all reports
    }
    
    cleanedLines.push(line);
  }
  
  if (removedInFile > 0) {
    fs.writeFileSync(filePath, cleanedLines.join('\n'));
    console.log(`📄 ${file}: Removed ${removedInFile} duplicates`);
    totalRemoved += removedInFile;
  } else {
    console.log(`📄 ${file}: No duplicates found`);
  }
}

console.log(`\n✅ Total duplicates removed: ${totalRemoved}`);
