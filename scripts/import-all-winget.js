import fs from 'fs';
import { execSync } from 'child_process';

const alternativeMap = {
  'photoshop': 'GIMP / Krita',
  'illustrator': 'Inkscape',
  'indesign': 'Scribus',
  'premiere': 'DaVinci Resolve / Kdenlive',
  'after effects': 'Natron / Blender',
  'vegas pro': 'DaVinci Resolve / Kdenlive',
  'coreldraw': 'Inkscape',
  'lightroom': 'Darktable / RawTherapee',
  'autocad': 'FreeCAD / BricsCAD',
  'solidworks': 'FreeCAD / Onshape',
  'maya': 'Blender',
  '3ds max': 'Blender',
  'sketchup': 'Blender / FreeCAD',
  'rhino': 'Blender / FreeCAD',
  'excel': 'LibreOffice Calc / ONLYOFFICE',
  'word': 'LibreOffice Writer / ONLYOFFICE',
  'powerpoint': 'LibreOffice Impress / ONLYOFFICE',
  'outlook': 'Thunderbird / Evolution',
  'winrar': 'PeaZip / Ark',
  'winzip': 'PeaZip / File Roller',
  'utorrent': 'qBittorrent / Transmission',
  'bittorrent': 'qBittorrent',
  'teamviewer': 'RustDesk / AnyDesk',
  'notepad++': 'Notepadqq / VS Code',
  'paint.net': 'Pinta / Krita',
  'ccleaner': 'BleachBit',
  'rufus': 'Ventoy / BalenaEtcher',
  'daemon tools': 'CDEmu',
  'fraps': 'OBS Studio / SimpleScreenRecorder',
  'foobar2000': 'DeaDBeeF / Audacious',
  'winamp': 'Audacious / QMMP',
  'sublime text': 'VS Code / VSCodium',
  'dreamweaver': 'VS Code / Bluefish',
  'fl studio': 'LMMS / Bitwig Studio',
  'ableton': 'Bitwig Studio / Reaper',
  'pro tools': 'Reaper / Ardour',
  'cubase': 'Reaper / Ardour',
  'itunes': 'Rhythmbox / Strawberry',
  'winscp': 'FileZilla / Krusader',
  'putty': 'Native Linux Terminal',
};

function containsChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

function determineCategory(name, desc, tags) {
  const text = `${name} ${desc} ${tags.join(' ')}`.toLowerCase();
  
  if (text.includes('game') || text.includes('gaming') || text.includes('launcher') || text.includes('steam') || text.includes('epic')) {
    return 'Games';
  }
  if (text.includes('code') || text.includes('develop') || text.includes('ide') || text.includes('programming') || text.includes('compiler') || text.includes('git') || text.includes('database') || text.includes('sql')) {
    return 'Development';
  }
  if (text.includes('audio') || text.includes('music') || text.includes('player') || text.includes('sound') || text.includes('daw') || text.includes('mp3') || text.includes('podcast')) {
    return 'Audio';
  }
  if (text.includes('graphic') || text.includes('design') || text.includes('image') || text.includes('photo') || text.includes('paint') || text.includes('draw') || text.includes('video') || text.includes('editor') || text.includes('art') || text.includes('render') || text.includes('3d') || text.includes('cad') || text.includes('modeling')) {
    return 'Design';
  }
  if (text.includes('office') || text.includes('document') || text.includes('excel') || text.includes('word') || text.includes('pdf') || text.includes('reader') || text.includes('sheet') || text.includes('slide') || text.includes('presentation')) {
    return 'Office';
  }
  if (text.includes('chat') || text.includes('social') || text.includes('messenger') || text.includes('communication') || text.includes('voice') || text.includes('zoom') || text.includes('meet') || text.includes('slack')) {
    return 'Social';
  }
  return 'Utilities';
}

function getLinuxAlternative(name) {
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(alternativeMap)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  return '';
}

async function run() {
  console.log("Fetching bulk packages from Winget API (this might take a minute)...");
  
  const take = 500;
  let page = 0;
  let totalImported = 0;
  let allApps = [];

  while (true) {
    try {
      console.log(`Fetching page ${page}...`);
      const url = `https://api.winget.run/v2/packages?take=${take}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Error fetching page ${page}: ${response.statusText}`);
        break;
      }
      const json = await response.json();
      const packages = json.Packages || [];
      if (packages.length === 0) {
        break;
      }

      for (const pkg of packages) {
        const id = pkg.Id.toLowerCase().replace(/\./g, '-');
        const latest = pkg.Latest || {};
        const name = latest.Name || pkg.Id;
        const description = latest.Description || `Windows software package: ${name}`;
        const tags = latest.Tags || [];

        // Quality filters
        if (containsChinese(name) || containsChinese(description)) {
          continue; // Skip Chinese entries
        }
        if (name.trim().length === 0 || description.trim().length === 0) {
          continue; // Skip empty metadata
        }

        const category = determineCategory(name, description, tags);
        const linuxAlternative = getLinuxAlternative(name);

        allApps.push({
          id,
          name,
          description,
          category,
          linuxAlternative
        });
      }

      totalImported += packages.length;
      if (packages.length < take) {
        break; // Reached last page
      }
      page++;
    } catch (err) {
      console.error(`API request failed:`, err);
      break;
    }
  }

  // Inject Core Apps to avoid FOREIGN KEY errors on report seeds
  const coreApps = [
    { id: 'adobe-photoshop', name: 'Adobe Photoshop 2024', description: 'The most popular professional image editing and raster graphics software in the world.', category: 'Design', linuxAlternative: 'GIMP / Krita' },
    { id: 'microsoft-office', name: 'Microsoft Office', description: 'Industry standard office suite containing Word, Excel, and PowerPoint.', category: 'Office', linuxAlternative: 'LibreOffice / ONLYOFFICE' },
    { id: 'autodesk-autocad', name: 'AutoCAD 2024', description: 'Computer-aided design (CAD) software for architecture, engineering, and construction.', category: 'Engineering', linuxAlternative: 'FreeCAD / BricsCAD' },
    { id: 'imageline-flstudio', name: 'FL Studio', description: 'Complete software music production environment and digital audio workstation (DAW).', category: 'Audio', linuxAlternative: 'LMMS / Bitwig Studio / Reaper' },
    { id: 'epicgames-epicgameslauncher', name: 'Epic Games Launcher', description: 'Storefront launcher for Epic Games, Unreal Engine, and PC gaming.', category: 'Games', linuxAlternative: 'Heroic Games Launcher / Lutris' },
    { id: 'discord-discord', name: 'Discord', description: 'Voice, video, and text communication service used by tens of millions of people.', category: 'Social', linuxAlternative: 'Discord (Native Linux Version)' },
    { id: 'spotify-spotify', name: 'Spotify', description: 'Digital music service that gives you access to millions of songs.', category: 'Audio', linuxAlternative: 'Spotify (Native Linux Version)' },
    { id: 'rarlab-winrar', name: 'WinRAR', description: 'Powerful archive manager that can backup data and reduce size of email attachments.', category: 'Utilities', linuxAlternative: 'PeaZip / Ark' },
    { id: 'bittorrent-utorrent', name: 'uTorrent', description: 'Lightweight BitTorrent client designed for Windows desktop.', category: 'Utilities', linuxAlternative: 'qBittorrent / Transmission' },
    { id: 'akeo-rufus', name: 'Rufus', description: 'Utility that helps format and create bootable USB flash drives.', category: 'Utilities', linuxAlternative: 'Ventoy / BalenaEtcher' }
  ];

  for (const core of coreApps) {
    if (!allApps.some(app => app.id === core.id)) {
      allApps.push(core);
    }
  }

  console.log(`Fetched ${totalImported} items from Winget. Seed database will have ${allApps.length} applications.`);

  // Generate database seed script
  let sqlContent = `-- Extended Seeding of Winget Packages\n`;
  sqlContent += `DELETE FROM reports;\n`;
  sqlContent += `DELETE FROM apps;\n\n`;

  // We chunk inserts because SQLite has a max variable limit per query
  const chunkSize = 150;
  for (let i = 0; i < allApps.length; i += chunkSize) {
    const chunk = allApps.slice(i, i + chunkSize);
    sqlContent += `INSERT INTO apps (id, name, description, category, icon, linux_alternative) VALUES\n`;
    const appLines = chunk.map(app => 
      `('${app.id}', '${escapeSql(app.name)}', '${escapeSql(app.description)}', '${app.category}', '${app.id}-icon', '${escapeSql(app.linuxAlternative)}')`
    );
    sqlContent += appLines.join(',\n') + ';\n\n';
  }

  // Insert some basic reports for the primary software without user names
  sqlContent += `INSERT INTO reports (id, app_id, rating, runner, details, date) VALUES
('1', 'adobe-photoshop', 'Silver', 'Bottles (Soda)', 'Works using the Soda runner in Bottles. The installation fails on the first try, so you must use the offline installer. Decent performance.', '2026-06-14'),
('2', 'microsoft-office', 'Bronze', 'Wine', 'Word and Excel work okay, but advanced macros, plugins, and cloud licensing crash the application.', '2026-06-13'),
('3', 'autodesk-autocad', 'Garbage', 'CrossOver', 'Impossible to install. Fails at the licensing service and does not render the viewport canvas.', '2026-06-10'),
('4', 'imageline-flstudio', 'Platinum', 'Lutris', 'Using the latest Lutris-GE version. Audio works perfectly with Pipewire-ALSA. Loads all VSTs with no issues.', '2026-06-12'),
('5', 'epicgames-epicgameslauncher', 'Platinum', 'Lutris', 'Runs well using Lutris or Bottles. However, using the native Heroic Games Launcher is highly recommended as a superior alternative.', '2026-06-14'),
('6', 'discord-discord', 'Native', 'Native', 'Works perfectly native. Install the Flatpak version for sandbox security.', '2026-06-14'),
('7', 'spotify-spotify', 'Native', 'Native', 'Official Linux client is available and works perfectly. Zero lag.', '2026-06-14'),
('8', 'rarlab-winrar', 'Gold', 'Wine', 'Runs flawlessly under Wine, but PeaZip is a native Linux tool and works much better.', '2026-06-14'),
('9', 'bittorrent-utorrent', 'Silver', 'Wine', 'Runs in Wine but has ads. Recommend switching to qBittorrent which is native and ad-free.', '2026-06-14'),
('10', 'akeo-rufus', 'Garbage', 'Wine', 'Low level USB disk writer cannot access hardware through Wine translation. Use Ventoy natively instead.', '2026-06-14');
`;

  fs.writeFileSync('seed-bulk.sql', sqlContent);
  console.log(`Successfully generated seed-bulk.sql with ${allApps.length} applications.`);

  console.log("Seeding local database...");
  try {
    execSync('npx wrangler d1 execute itrunsonlinux-db --local --file=seed-bulk.sql', { stdio: 'inherit' });
    console.log("Database successfully seeded with bulk Winget packages!");
  } catch (err) {
    console.error("Failed executing database seed script:", err.message);
  }
}

run();
