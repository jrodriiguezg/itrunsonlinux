import fs from 'fs';
import { execSync } from 'child_process';

const appsToImport = [
  {
    id: 'adobe-photoshop',
    name: 'Adobe Photoshop 2024',
    wingetId: 'Adobe.Photoshop',
    category: 'Design',
    linuxAlternative: 'GIMP / Krita',
    fallbackDescription: 'The most popular professional image editing and raster graphics software in the world.',
    report: { rating: 'Silver', runner: 'Bottles', details: 'Works using the Soda runner in Bottles. The installation fails on the first try, so you must use the offline installer. Decent performance.' }
  },
  {
    id: 'microsoft-excel',
    name: 'Microsoft Excel',
    wingetId: 'Microsoft.Excel',
    category: 'Office',
    linuxAlternative: 'LibreOffice Calc / ONLYOFFICE',
    fallbackDescription: 'Industry standard spreadsheet editor developed by Microsoft.',
    report: { rating: 'Bronze', runner: 'Wine', details: 'Opens basic files, but advanced macros and VBA plugins crash the application.' }
  },
  {
    id: 'autocad',
    name: 'AutoCAD 2024',
    wingetId: 'Autodesk.AutoCAD',
    category: 'Engineering',
    linuxAlternative: 'FreeCAD / BricsCAD',
    fallbackDescription: 'Computer-aided design (CAD) software for architecture, engineering, and construction.',
    report: { rating: 'Garbage', runner: 'CrossOver', details: 'Impossible to install. Fails at the licensing service and does not render the viewport canvas.' }
  },
  {
    id: 'fl-studio',
    name: 'FL Studio',
    wingetId: 'ImageLine.FLStudio',
    category: 'Audio',
    linuxAlternative: 'LMMS / Bitwig Studio / Reaper',
    fallbackDescription: 'Complete software music production environment and digital audio workstation (DAW).',
    report: { rating: 'Platinum', runner: 'Lutris', details: 'Using the latest Lutris-GE version. Audio works perfectly with Pipewire-ALSA. Loads all VSTs with no issues.' }
  },
  {
    id: 'epic-games',
    name: 'Epic Games Launcher',
    wingetId: 'EpicGames.EpicGamesLauncher',
    category: 'Games',
    linuxAlternative: 'Heroic Games Launcher / Lutris',
    fallbackDescription: 'Storefront launcher for Epic Games, Unreal Engine, and PC gaming.',
    report: { rating: 'Native', runner: 'Native', details: 'I use Heroic Games Launcher, which is a native client for Linux. Everything runs extremely fast.' }
  },
  {
    id: 'steam',
    name: 'Steam',
    wingetId: 'Valve.Steam',
    category: 'Games',
    linuxAlternative: 'Steam (Native Linux Version)',
    fallbackDescription: 'The ultimate entertainment platform. Play, connect, create, and more.',
    report: { rating: 'Native', runner: 'Native', details: 'Steam runs natively on Linux. Valve Proton compatibility runs most Windows games flawlessly.' }
  },
  {
    id: 'discord',
    name: 'Discord',
    wingetId: 'Discord.Discord',
    category: 'Social',
    linuxAlternative: 'Discord (Native Linux Version)',
    fallbackDescription: 'Voice, video, and text communication service used by tens of millions of people.',
    report: { rating: 'Native', runner: 'Native', details: 'Native Flatpak client works perfectly. Screen sharing might require Wayland workarounds depending on your distro.' }
  },
  {
    id: 'spotify',
    name: 'Spotify',
    wingetId: 'Spotify.Spotify',
    category: 'Audio',
    linuxAlternative: 'Spotify (Native Linux Version)',
    fallbackDescription: 'Digital music service that gives you access to millions of songs.',
    report: { rating: 'Native', runner: 'Native', details: 'Official Flatpak/snap works great. Seamless audio integration.' }
  },
  {
    id: 'chrome',
    name: 'Google Chrome',
    wingetId: 'Google.Chrome',
    category: 'Utilities',
    linuxAlternative: 'Firefox / Chromium / Brave',
    fallbackDescription: 'Fast, secure, and free web browser built for the modern web.',
    report: { rating: 'Native', runner: 'Native', details: 'Chrome runs natively on all Linux distributions. Installed via flatpak or official deb/rpm repos.' }
  },
  {
    id: 'notepadplusplus',
    name: 'Notepad++',
    wingetId: 'Notepad++.Notepad++',
    category: 'Development',
    linuxAlternative: 'Notepadqq / VS Code / VSCodium',
    fallbackDescription: 'Free source code editor and Notepad replacement that supports several languages.',
    report: { rating: 'Gold', runner: 'Wine', details: 'Runs incredibly fast via Wine. Almost 100% stable, but using native Notepadqq or VS Code is smoother.' }
  },
  {
    id: 'winrar',
    name: 'WinRAR',
    wingetId: 'RARLab.WinRAR',
    category: 'Utilities',
    linuxAlternative: 'PeaZip / Ark / File Roller',
    fallbackDescription: 'Powerful archive manager that can backup data and reduce size of email attachments.',
    report: { rating: 'Gold', runner: 'Wine', details: 'Runs perfectly fine in Wine, but PeaZip is a beautiful native alternative you should use instead.' }
  },
  {
    id: 'utorrent',
    name: 'uTorrent',
    wingetId: 'BitTorrent.uTorrent',
    category: 'Utilities',
    linuxAlternative: 'qBittorrent / Transmission',
    fallbackDescription: 'Lightweight BitTorrent client designed for Windows desktop.',
    report: { rating: 'Silver', runner: 'Wine', details: 'Runs in Wine but contains ads. qBittorrent is native, open-source, and has no ads. Avoid using uTorrent on Linux.' }
  },
  {
    id: 'slack',
    name: 'Slack',
    wingetId: 'Slack.Slack',
    category: 'Social',
    linuxAlternative: 'Slack (Native Linux Version)',
    fallbackDescription: 'Team communication tool providing real-time messaging, archiving, and search.',
    report: { rating: 'Native', runner: 'Native', details: 'Native app works perfectly. Audio/video calls are fully stable.' }
  },
  {
    id: 'zoom',
    name: 'Zoom',
    wingetId: 'Zoom.Zoom',
    category: 'Social',
    linuxAlternative: 'Zoom (Native Linux Version)',
    fallbackDescription: 'Video conferencing, web conferencing, and webinar service.',
    report: { rating: 'Native', runner: 'Native', details: 'Native client available via Flatpak. Screen sharing on Wayland is supported in recent versions.' }
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    wingetId: 'Microsoft.VisualStudioCode',
    category: 'Development',
    linuxAlternative: 'VS Code (Native Linux Version) / VSCodium',
    fallbackDescription: 'Code editor redefined and optimized for building and debugging modern web and cloud applications.',
    report: { rating: 'Native', runner: 'Native', details: 'Runs natively and beautifully. Full support for extensions and terminal integrations.' }
  },
  {
    id: 'adobe-premiere',
    name: 'Adobe Premiere Pro',
    wingetId: 'Adobe.PremierePro',
    category: 'Design',
    linuxAlternative: 'DaVinci Resolve / Kdenlive',
    fallbackDescription: 'Timeline-based video editing software application developed by Adobe.',
    report: { rating: 'Garbage', runner: 'Bottles', details: 'Crashing on startup. Fails to initialize GPU drivers and timeline rendering is broken. Use DaVinci Resolve instead.' }
  },
  {
    id: 'adobe-illustrator',
    name: 'Adobe Illustrator',
    wingetId: 'Adobe.Illustrator',
    category: 'Design',
    linuxAlternative: 'Inkscape',
    fallbackDescription: 'Vector graphics editor and design program developed and marketed by Adobe.',
    report: { rating: 'Silver', runner: 'Wine', details: 'Can be run via older Wine versions, but has noticeable lag and missing menu renderers. Inkscape is a solid native alternative.' }
  },
  {
    id: 'ccleaner',
    name: 'CCleaner',
    wingetId: 'Piriform.CCleaner',
    category: 'Utilities',
    linuxAlternative: 'BleachBit',
    fallbackDescription: 'Utility program used to clean potentially unwanted files and invalid Windows Registry entries.',
    report: { rating: 'Garbage', runner: 'Wine', details: 'No sense to run this on Linux as there is no Windows registry. Use BleachBit to clean up cache files natively.' }
  },
  {
    id: 'rufus',
    name: 'Rufus',
    wingetId: 'Akeo.Rufus',
    category: 'Utilities',
    linuxAlternative: 'Ventoy / BalenaEtcher',
    fallbackDescription: 'Utility that helps format and create bootable USB flash drives.',
    report: { rating: 'Garbage', runner: 'Wine', details: 'Cannot access low-level raw USB drives in Wine. Use Ventoy or BalenaEtcher, they are native and much better.' }
  },
  {
    id: 'paint-net',
    name: 'Paint.NET',
    wingetId: 'dotPDN.PaintDotNet',
    category: 'Design',
    linuxAlternative: 'Pinta',
    fallbackDescription: 'Free image and photo editing software for PCs that run Windows.',
    report: { rating: 'Bronze', runner: 'Wine', details: 'Requires .NET framework installation which is very tricky in Wine. Pinta is a native Linux clone of Paint.NET.' }
  }
];

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

async function run() {
  console.log("Fetching descriptions from Winget API...");
  
  const finalApps = [];
  const finalReports = [];
  let reportIdCounter = 1;

  for (const app of appsToImport) {
    let description = app.fallbackDescription;
    let name = app.name;

    try {
      const url = `https://api.winget.run/v2/packages/${app.wingetId}`;
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json.Packages && json.Packages.length > 0) {
          const latest = json.Packages[0].Latest;
          if (latest.Description) {
            description = latest.Description;
          }
          if (latest.Name) {
            name = latest.Name;
          }
        }
      }
    } catch (err) {
      console.log(`Failed to fetch winget info for ${app.wingetId}, using fallback.`);
    }

    finalApps.push({
      id: app.id,
      name: name,
      description: description,
      category: app.category,
      linux_alternative: app.linuxAlternative
    });

    if (app.report) {
      finalReports.push({
        id: String(reportIdCounter++),
        app_id: app.id,
        github_user: app.report.rating === 'Native' ? 'linux-refugee' : 'jrodriiguezg',
        rating: app.report.rating,
        runner: app.report.runner,
        details: app.report.details,
        date: new Date().toISOString().slice(0, 10)
      });
    }
  }

  // Generate extended SQL file
  let sqlContent = `-- Extended Seed Data Generated on ${new Date().toISOString()}\n`;
  sqlContent += `DELETE FROM reports;\n`;
  sqlContent += `DELETE FROM apps;\n\n`;

  sqlContent += `INSERT INTO apps (id, name, description, category, icon, linux_alternative) VALUES\n`;
  const appLines = finalApps.map(app => 
    `('${app.id}', '${escapeSql(app.name)}', '${escapeSql(app.description)}', '${app.category}', '${app.id}-icon', '${escapeSql(app.linux_alternative)}')`
  );
  sqlContent += appLines.join(',\n') + ';\n\n';

  sqlContent += `INSERT INTO reports (id, app_id, github_user, rating, runner, details, date) VALUES\n`;
  const reportLines = finalReports.map(rep => 
    `('${rep.id}', '${rep.app_id}', '${rep.github_user}', '${rep.rating}', '${rep.runner}', '${escapeSql(rep.details)}', '${rep.date}')`
  );
  sqlContent += reportLines.join(',\n') + ';\n';

  fs.writeFileSync('seed-extended.sql', sqlContent);
  console.log("Generated seed-extended.sql successfully.");

  // Execute on local D1
  console.log("Executing SQL on local database...");
  try {
    execSync('npx wrangler d1 execute itrunsonlinux-db --local --file=seed-extended.sql', { stdio: 'inherit' });
    console.log("Local D1 database populated with 20 extended apps!");
  } catch (err) {
    console.error("Error executing D1 database script:", err.message);
  }
}

run();
