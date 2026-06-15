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

// Define the consolidation groups: [idToEliminate, idToKeep, cleanLinuxAlternative, cleanCategory]
const consolidations = [
  {
    eliminate: 'agilebits-1password',
    keep: '1password',
    alternative: 'Native Linux Version|flathub:com.onepassword.OnePassword / Bitwarden / KeePassXC',
    category: 'Utilities'
  },
  {
    eliminate: '7zip-7zip',
    keep: 'igor-7zip',
    alternative: 'PeaZip / File Roller / Ark / Native Linux Version (CLI)',
    category: 'Utilities'
  },
  {
    eliminate: 'anydesksoftwaregmbh-anydesk',
    keep: 'anydesk',
    alternative: 'Native Linux Version|flathub:com.anydesk.Anydesk',
    category: 'Utilities'
  },
  {
    eliminate: 'arduinosa-ide-stable',
    keep: 'arduino-ide',
    alternative: 'Native Linux Version|flathub:cc.arduino.IDE2',
    category: 'Development'
  },
  {
    eliminate: 'audacity-audacity',
    keep: 'audacity',
    alternative: 'Native Linux Version|flathub:org.audacityteam.Audacity',
    category: 'Audio'
  },
  {
    eliminate: 'bitwarden-bitwarden',
    keep: 'bitwarden',
    alternative: 'Native Linux Version|flathub:com.bitwarden.desktop',
    category: 'Utilities'
  },
  {
    eliminate: 'bleachbit-bleachbit',
    keep: 'bleachbit',
    alternative: 'Native Linux Version|flathub:org.bleachbit.BleachBit',
    category: 'Utilities'
  },
  {
    eliminate: 'blenderfoundation-blender',
    keep: 'blender',
    alternative: 'Native Linux Version|flathub:org.blender.Blender',
    category: 'Design'
  },
  {
    eliminate: 'discord-discord',
    keep: 'discord',
    alternative: 'Native Linux Version|flathub:com.discordapp.Discord',
    category: 'Social'
  },
  {
    eliminate: '7s2p-effie-cn',
    keep: '7s2p-effie',
    alternative: 'Obsidian / Typora / MarkText / Native Linux Version (Web)',
    category: 'Development'
  },
  {
    eliminate: 'axosoft-gitkraken',
    keep: 'gitkraken',
    alternative: 'Native Linux Version|flathub:com.axosoft.GitKraken',
    category: 'Development'
  },
  {
    eliminate: 'automattic-simplenote',
    keep: 'simplenote',
    alternative: 'Native Linux Version|flathub:com.simplenote.Simplenote',
    category: 'Office'
  },
  {
    eliminate: 'microsoft-skype',
    keep: 'skype',
    alternative: 'Skype (Native Linux Version)|flathub:com.skype.Client',
    category: 'Social'
  },
  {
    eliminate: 'spotify-spotify',
    keep: 'spotify',
    alternative: 'Spotify (Native Linux Version)|flathub:com.spotify.Client',
    category: 'Audio'
  },
  {
    eliminate: 'valve-steam',
    keep: 'steam',
    alternative: 'Native Linux Version|flathub:com.valvesoftware.Steam',
    category: 'Games'
  },
  {
    eliminate: 'teamviewer-teamviewer',
    keep: 'teamviewer',
    alternative: 'RustDesk / AnyDesk / Native Linux Version|flathub:com.teamviewer.TeamViewer',
    category: 'Utilities'
  },
  {
    eliminate: 'videolan-vlc',
    keep: 'vlc-media-player',
    alternative: 'VLC (Native Linux Version)|flathub:org.videolan.VLC',
    category: 'Audio'
  }
];

// Single corrections for mismatched applications (the ones that had Office alternatives by mistake)
const corrections = [
  {
    id: 'agilebits-1password-beta',
    alternative: 'Native Linux Version (Beta)|flathub:com.onepassword.OnePassword / Bitwarden / KeePassXC',
    category: 'Utilities'
  },
  {
    id: 'agilebits-1password-cli',
    alternative: 'Native Linux Version (CLI)|github:1Password/op / Bitwarden CLI',
    category: 'Utilities'
  },
  {
    id: 'ahlyab-passwordchecker',
    alternative: 'Bitwarden / KeePassXC / Bitwarden Password Generator (Web)',
    category: 'Utilities'
  },
  {
    id: 'automattic-wordpress',
    alternative: 'Native Linux Version (Web) / WordPress Web Client / Ghost',
    category: 'Design'
  },
  {
    id: 'binarymark-passwordgenerator',
    alternative: 'KeePassXC / Bitwarden / pwgen / Bitwarden Password Generator',
    category: 'Utilities'
  },
  {
    id: 'bitrecover-aadhaarcardpasswordremover',
    alternative: 'qpdf (CLI) / pdftoppm / pdfunite',
    category: 'Utilities'
  },
  {
    id: 'bitnami-wordpress',
    alternative: 'Docker / local LAMP Stack / LocalWP',
    category: 'Utilities'
  },
  {
    id: 'apache-openoffice',
    alternative: 'LibreOffice / ONLYOFFICE',
    category: 'Office' // correcting category from Development to Office
  }
];

db.transaction(() => {
  // Consolidate duplicates
  for (const item of consolidations) {
    const appEliminate = db.prepare('SELECT popularity FROM apps WHERE id = ?').get(item.eliminate);
    const appKeep = db.prepare('SELECT popularity FROM apps WHERE id = ?').get(item.keep);

    if (appKeep && appEliminate) {
      // Sum popularity
      const newPopularity = (appKeep.popularity || 0) + (appEliminate.popularity || 0);

      // Reassign reports to the kept ID
      db.prepare('UPDATE reports SET app_id = ? WHERE app_id = ?').run(item.keep, item.eliminate);

      // Update kept app details
      db.prepare(`
        UPDATE apps 
        SET popularity = ?, linux_alternative = ?, category = ? 
        WHERE id = ?
      `).run(newPopularity, item.alternative, item.category, item.keep);

      // Delete eliminated app
      db.prepare('DELETE FROM apps WHERE id = ?').run(item.eliminate);

      console.log(`Consolidated: ${item.eliminate} -> ${item.keep} (New Pop: ${newPopularity})`);
    } else if (appKeep && !appEliminate) {
      // If only kept exists, update its details
      db.prepare(`
        UPDATE apps 
        SET linux_alternative = ?, category = ? 
        WHERE id = ?
      `).run(item.alternative, item.category, item.keep);
      console.log(`Updated details for (only existing): ${item.keep}`);
    } else if (!appKeep && appEliminate) {
      // If only eliminated exists, rename it to kept ID
      db.prepare('UPDATE reports SET app_id = ? WHERE app_id = ?').run(item.keep, item.eliminate);
      db.prepare('UPDATE apps SET id = ?, linux_alternative = ?, category = ? WHERE id = ?')
        .run(item.keep, item.alternative, item.category, item.eliminate);
      console.log(`Renamed and updated: ${item.eliminate} -> ${item.keep}`);
    }
  }

  // Apply single corrections
  for (const corr of corrections) {
    const info = db.prepare('UPDATE apps SET linux_alternative = ?, category = ? WHERE id = ?')
      .run(corr.alternative, corr.category, corr.id);
    if (info.changes > 0) {
      console.log(`Corrected details for: ${corr.id}`);
    }
  }
})();

console.log('Database clean-up and unifications complete!');
db.close();
