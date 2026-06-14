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

const highPopularityKeywords = [
  'chrome', 'firefox', 'brave', 'slack', 'zoom', 'skype', 'teamviewer', 'vscode', 'visual studio', 
  'github', 'vegas', 'winamp', 'ccleaner', 'paint', '7-zip', '7zip', 'bittorrent', 'ea app', 'origin', 
  'ubisoft', 'battle.net', 'battlenet', 'vlc', 'blender', 'audacity', 'gimp', 'krita', 'notepad', 
  'sublime', 'ableton', 'adobe', 'office', 'excel', 'word', 'powerpoint', 'autocad', 'fl studio', 
  'steam', 'discord', 'spotify', 'epic games', 'winrar', 'utorrent', 'rufus'
];

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

function calculatePopularity(name) {
  const lowerName = name.toLowerCase();
  for (const keyword of highPopularityKeywords) {
    if (lowerName.includes(keyword)) {
      return 50;
    }
  }
  return 0;
}

async function run() {
  console.log("Fetching packages from Winget API...");
  
  const take = 500;
  let allApps = [];
  const coreIds = new Set([
    'adobe-photoshop', 'microsoft-office', 'autodesk-autocad', 'imageline-flstudio',
    'epicgames-epicgameslauncher', 'discord-discord', 'spotify-spotify',
    'rarlab-winrar', 'bittorrent-utorrent', 'akeo-rufus', 'google-chrome',
    'valve-steam', 'adobe-premiere-pro', 'adobe-illustrator', 'igor-7zip',
    'whatsapp-desktop', 'videolan-vlc', 'notepad-plusplus', 'teamviewer-teamviewer',
    'microsoft-skype', 'zoom-zoom'
  ]);

  for (let page = 0; page < 3; page++) {
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
        const homepage = latest.Homepage || '';

        // Quality and duplicate filters
        if (containsChinese(name) || containsChinese(description)) {
          continue; // Skip Chinese entries
        }
        if (name.trim().length === 0 || description.trim().length < 30) {
          continue; // Skip empty or too short descriptions
        }
        if (coreIds.has(id)) {
          continue; // Will be manually injected
        }

        const category = determineCategory(name, description, tags);
        const linuxAlternative = getLinuxAlternative(name);
        const popularity = calculatePopularity(name);

        allApps.push({
          id,
          name,
          description,
          category,
          linuxAlternative,
          popularity,
          homepage
        });
      }
    } catch (err) {
      console.error(`API request failed:`, err);
      break;
    }
  }

  // Slice to exactly 479 apps so with the 21 core apps it sums to exactly 500
  allApps = allApps.slice(0, 479);

  // Inject the 21 core apps (all assigned popularity = 100)
  const coreApps = [
    { id: 'adobe-photoshop', name: 'Adobe Photoshop 2024', description: 'The most popular professional image editing and raster graphics software in the world.', category: 'Design', linuxAlternative: 'GIMP / Krita', popularity: 100, homepage: 'https://www.adobe.com/products/photoshop.html' },
    { id: 'microsoft-office', name: 'Microsoft Office', description: 'Industry standard office suite containing Word, Excel, and PowerPoint.', category: 'Office', linuxAlternative: 'LibreOffice / ONLYOFFICE', popularity: 100, homepage: 'https://www.microsoft.com/microsoft-365/office-apps' },
    { id: 'autodesk-autocad', name: 'AutoCAD 2024', description: 'Computer-aided design (CAD) software for architecture, engineering, and construction.', category: 'Engineering', linuxAlternative: 'FreeCAD / BricsCAD', popularity: 100, homepage: 'https://www.autodesk.com/products/autocad' },
    { id: 'imageline-flstudio', name: 'FL Studio', description: 'Complete software music production environment and digital audio workstation (DAW).', category: 'Audio', linuxAlternative: 'LMMS / Bitwig Studio / Reaper', popularity: 100, homepage: 'https://www.image-line.com/' },
    { id: 'epicgames-epicgameslauncher', name: 'Epic Games Launcher', description: 'Storefront launcher for Epic Games, Unreal Engine, and PC gaming.', category: 'Games', linuxAlternative: 'Heroic Games Launcher / Lutris', popularity: 100, homepage: 'https://store.epicgames.com/' },
    { id: 'discord-discord', name: 'Discord', description: 'Voice, video, and text communication service used by tens of millions of people.', category: 'Social', linuxAlternative: 'Discord (Native Linux Version)', popularity: 100, homepage: 'https://discord.com' },
    { id: 'spotify-spotify', name: 'Spotify', description: 'Digital music service that gives you access to millions of songs.', category: 'Audio', linuxAlternative: 'Spotify (Native Linux Version)', popularity: 100, homepage: 'https://spotify.com' },
    { id: 'rarlab-winrar', name: 'WinRAR', description: 'Powerful archive manager that can backup data and reduce size of email attachments.', category: 'Utilities', linuxAlternative: 'PeaZip / Ark', popularity: 100, homepage: 'https://www.rarlab.com' },
    { id: 'bittorrent-utorrent', name: 'uTorrent', description: 'Lightweight BitTorrent client designed for Windows desktop.', category: 'Utilities', linuxAlternative: 'qBittorrent / Transmission', popularity: 100, homepage: 'https://www.utorrent.com' },
    { id: 'akeo-rufus', name: 'Rufus', description: 'Utility that helps format and create bootable USB flash drives.', category: 'Utilities', linuxAlternative: 'Ventoy / BalenaEtcher', popularity: 100, homepage: 'https://rufus.ie' },
    { id: 'google-chrome', name: 'Google Chrome', description: 'The most popular web browser developed by Google, fast and secure.', category: 'Utilities', linuxAlternative: 'Firefox / Brave / Chromium', popularity: 100, homepage: 'https://www.google.com/chrome' },
    { id: 'valve-steam', name: 'Steam', description: 'The ultimate entertainment platform to play, connect, create, and discuss games.', category: 'Games', linuxAlternative: 'Steam (Native Linux Version)', popularity: 100, homepage: 'https://store.steampowered.com' },
    { id: 'adobe-premiere-pro', name: 'Adobe Premiere Pro', description: 'Industry-leading video editing software for film, TV, and the web.', category: 'Design', linuxAlternative: 'DaVinci Resolve / Kdenlive', popularity: 100, homepage: 'https://www.adobe.com/products/premiere.html' },
    { id: 'adobe-illustrator', name: 'Adobe Illustrator', description: 'Vector graphics editor and design program used by designers worldwide.', category: 'Design', linuxAlternative: 'Inkscape', popularity: 100, homepage: 'https://www.adobe.com/products/illustrator.html' },
    { id: 'igor-7zip', name: '7-Zip', description: 'Free and open-source file archiver with a high compression ratio.', category: 'Utilities', linuxAlternative: 'PeaZip / File Roller', popularity: 100, homepage: 'https://www.7-zip.org' },
    { id: 'whatsapp-desktop', name: 'WhatsApp Desktop', description: 'Simple, secure, and reliable messaging and calling service on desktop.', category: 'Social', linuxAlternative: 'WhatsApp Web / ZapZap / Telegram', popularity: 100, homepage: 'https://www.whatsapp.com' },
    { id: 'videolan-vlc', name: 'VLC Media Player', description: 'Free and open source cross-platform multimedia player and framework.', category: 'Audio', linuxAlternative: 'VLC (Native Linux Version)', popularity: 100, homepage: 'https://www.videolan.org/vlc' },
    { id: 'notepad-plusplus', name: 'Notepad++', description: 'Free source code editor and Notepad replacement that supports several languages.', category: 'Development', linuxAlternative: 'Notepadqq / VS Code', popularity: 100, homepage: 'https://notepad-plus-plus.org' },
    { id: 'teamviewer-teamviewer', name: 'TeamViewer', description: 'Remote connectivity cloud platform enabling secure remote access globally.', category: 'Utilities', linuxAlternative: 'RustDesk / AnyDesk', popularity: 100, homepage: 'https://www.teamviewer.com' },
    { id: 'microsoft-skype', name: 'Skype', description: 'Communication tool for free video and voice calls, instant messaging and sharing.', category: 'Social', linuxAlternative: 'Skype (Native Linux Version)', popularity: 100, homepage: 'https://www.skype.com' },
    { id: 'zoom-zoom', name: 'Zoom Workplace', description: 'Cloud video conferencing, meetings, group chat, and mobile collaboration.', category: 'Social', linuxAlternative: 'Zoom (Native Linux Version)', popularity: 100, homepage: 'https://zoom.us' }
  ];

  allApps = [...coreApps, ...allApps];

  console.log(`Database will seed exactly ${allApps.length} applications.`);

  // Generate database seed script
  let sqlContent = `-- Seeding of exactly 500 Winget Packages with Popularity and Homepage\n`;
  sqlContent += `DELETE FROM reports;\n`;
  sqlContent += `DELETE FROM apps;\n\n`;

  // We chunk inserts because SQLite has a max variable limit per query
  const chunkSize = 150;
  for (let i = 0; i < allApps.length; i += chunkSize) {
    const chunk = allApps.slice(i, i + chunkSize);
    sqlContent += `INSERT INTO apps (id, name, description, category, icon, linux_alternative, popularity, homepage) VALUES\n`;
    const appLines = chunk.map(app => 
      `('${app.id}', '${escapeSql(app.name)}', '${escapeSql(app.description)}', '${app.category}', '${app.id}-icon', '${escapeSql(app.linuxAlternative)}', ${app.popularity}, '${escapeSql(app.homepage)}')`
    );
    sqlContent += appLines.join(',\n') + ';\n\n';
  }

  // Insert some basic reports for the primary software without usernames
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
('10', 'akeo-rufus', 'Garbage', 'Wine', 'Low level USB disk writer cannot access hardware through Wine translation. Use Ventoy natively instead.', '2026-06-14'),
('11', 'google-chrome', 'Native', 'Native', 'Google Chrome has a native version for Linux and works perfectly.', '2026-06-14'),
('12', 'valve-steam', 'Native', 'Native', 'Steam runs natively on Linux. Highly recommended to use the official package or Flatpak.', '2026-06-14'),
('13', 'adobe-premiere-pro', 'Garbage', 'Wine', 'Does not install. Creative Cloud desktop app crashes and licensing fails. Use DaVinci Resolve or Kdenlive instead.', '2026-06-14'),
('14', 'adobe-illustrator', 'Bronze', 'Wine', 'Older versions (CS6) run okay, but modern CC versions crash during startup. Inkscape is a great native alternative.', '2026-06-14'),
('15', 'igor-7zip', 'Gold', 'Wine', 'Runs perfectly, but PeaZip is native and integrates with the Linux desktop environment much better.', '2026-06-14'),
('16', 'whatsapp-desktop', 'Native', 'Native', 'Use WhatsApp Web in browser or native open-source clients like ZapZap.', '2026-06-14'),
('17', 'videolan-vlc', 'Native', 'Native', 'VLC is native to Linux and works perfectly.', '2026-06-14'),
('18', 'notepad-plusplus', 'Platinum', 'Wine', 'Runs flawlessly under Wine. However, native editors like VS Code or Notepadqq are recommended.', '2026-06-14'),
('19', 'teamviewer-teamviewer', 'Native', 'Native', 'Official native TeamViewer package is available for Linux and works great.', '2026-06-14'),
('20', 'microsoft-skype', 'Native', 'Native', 'Official native client works perfectly.', '2026-06-14'),
('21', 'zoom-zoom', 'Native', 'Native', 'Zoom offers a native Linux client which is fully functional.', '2026-06-14');
`;

  fs.writeFileSync('seed-500.sql', sqlContent);
  console.log(`Successfully generated seed-500.sql with ${allApps.length} applications.`);

  console.log("Seeding local database...");
  try {
    execSync('npx wrangler d1 execute itrunsonlinux-db --local --file=seed-500.sql', { stdio: 'inherit' });
    console.log("Database successfully seeded!");
  } catch (err) {
    console.error("Failed executing database seed script:", err.message);
  }
}

run();
