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

const newApps = [
  {
    id: 'minecraft-launcher',
    name: 'Minecraft Launcher',
    category: 'Games',
    description: 'Official launcher for the sandbox building game Minecraft.',
    icon: 'minecraft-launcher-icon',
    linux_alternative: 'Native Linux Version|flathub:com.mojang.Minecraft / Prism Launcher / Modrinth App',
    popularity: 50,
    homepage: 'https://www.minecraft.net/',
    alternative_to: ''
  },
  {
    id: 'ubisoft-connect',
    name: 'Ubisoft Connect',
    category: 'Games',
    description: 'Game launcher and digital distribution service by Ubisoft.',
    icon: 'ubisoft-connect-icon',
    linux_alternative: 'Lutris / Heroic Games Launcher / Bottles / Steam (via Proton)',
    popularity: 20,
    homepage: 'https://ubisoftconnect.com/',
    alternative_to: ''
  },
  {
    id: 'lightshot',
    name: 'Lightshot',
    category: 'Utilities',
    description: 'Simple and convenient screen capture tool.',
    icon: 'lightshot-icon',
    linux_alternative: 'Flameshot / Spectacle / Ksnip / GNOME Screenshot',
    popularity: 30,
    homepage: 'https://app.prntscr.com/',
    alternative_to: ''
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Office',
    description: 'Collaborative note-taking and project management workspace.',
    icon: 'notion-icon',
    linux_alternative: 'Native Linux Version (Web Client / PWA) / Obsidian / Notion-Reborn (Electron wrapper)',
    popularity: 50,
    homepage: 'https://www.notion.so/',
    alternative_to: ''
  },
  {
    id: 'putty',
    name: 'PuTTY',
    category: 'Utilities',
    description: 'Free SSH and telnet client for remote server connection.',
    icon: 'putty-icon',
    linux_alternative: 'Native Linux Version / OpenSSH (Terminal) / Remmina / PuTTY (Native port)',
    popularity: 30,
    homepage: 'https://www.putty.org/',
    alternative_to: ''
  },
  {
    id: 'recuva',
    name: 'Recuva',
    category: 'Utilities',
    description: 'User-friendly file recovery tool by Piriform.',
    icon: 'recuva-icon',
    linux_alternative: 'TestDisk / PhotoRec / ddrescue / QPhotoRec (GUI)',
    popularity: 25,
    homepage: 'https://www.ccleaner.com/recuva',
    alternative_to: ''
  },
  {
    id: 'crystaldiskinfo',
    name: 'CrystalDiskInfo',
    category: 'Utilities',
    description: 'HDD/SSD utility for monitoring disk health and temperature.',
    icon: 'crystaldiskinfo-icon',
    linux_alternative: 'GSmartControl / GNOME Disks / smartctl (CLI)',
    popularity: 40,
    homepage: 'https://crystalmark.info/',
    alternative_to: ''
  },
  {
    id: 'crystaldiskmark',
    name: 'CrystalDiskMark',
    category: 'Utilities',
    description: 'Graphical disk drive benchmark tool.',
    icon: 'crystaldiskmark-icon',
    linux_alternative: 'KDiskMark / GNOME Disks benchmark / Fio (CLI)',
    popularity: 35,
    homepage: 'https://crystalmark.info/',
    alternative_to: ''
  },
  {
    id: 'rustdesk',
    name: 'RustDesk',
    category: 'Utilities',
    description: 'Open-source remote desktop client and server software.',
    icon: 'rustdesk-icon',
    linux_alternative: 'Native Linux Version|flathub:com.rustdesk.RustDesk',
    popularity: 40,
    homepage: 'https://rustdesk.com/',
    alternative_to: ''
  },
  {
    id: 'malwarebytes-antivirus',
    name: 'Malwarebytes',
    category: 'Utilities',
    description: 'Antivirus software that protects against malware, ransomware, and malicious websites.',
    icon: 'malwarebytes-antivirus-icon',
    linux_alternative: 'ClamAV / OpenSnitch (for firewall alert rules) / Not needed on Linux',
    popularity: 45,
    homepage: 'https://www.malwarebytes.com/',
    alternative_to: ''
  },
  {
    id: 'avast-antivirus',
    name: 'Avast Free Antivirus',
    category: 'Utilities',
    description: 'Popular freeware antivirus protection for computer security.',
    icon: 'avast-antivirus-icon',
    linux_alternative: 'ClamAV / Not needed on Linux (Linux security relies on system design)',
    popularity: 40,
    homepage: 'https://www.avast.com/',
    alternative_to: ''
  },
  {
    id: 'kaspersky-antivirus',
    name: 'Kaspersky Free Antivirus',
    category: 'Utilities',
    description: 'Comprehensive security suite protecting against viruses, spyware, and malware.',
    icon: 'kaspersky-antivirus-icon',
    linux_alternative: 'ClamAV / Not needed on Linux',
    popularity: 35,
    homepage: 'https://www.kaspersky.com/',
    alternative_to: ''
  },
  {
    id: 'tailscale',
    name: 'Tailscale',
    category: 'Utilities',
    description: 'Zero configuration VPN to connect your devices and networks securely.',
    icon: 'tailscale-icon',
    linux_alternative: 'Native Linux Version|github:tailscale/tailscale / WireGuard',
    popularity: 45,
    homepage: 'https://tailscale.com/',
    alternative_to: ''
  },
  {
    id: 'revo-uninstaller',
    name: 'Revo Uninstaller',
    category: 'Utilities',
    description: 'Advanced uninstaller that removes leftover files and registry keys from software.',
    icon: 'revo-uninstaller-icon',
    linux_alternative: 'Not needed on Linux (package managers like apt/pacman/flatpak handle clean uninstallation natively)',
    popularity: 30,
    homepage: 'https://www.revouninstaller.com/',
    alternative_to: ''
  },
  {
    id: 'opera-gx',
    name: 'Opera GX',
    category: 'Utilities',
    description: 'A web browser tailored specifically for gamers, featuring RAM and CPU limiters.',
    icon: 'opera-gx-icon',
    linux_alternative: 'Opera Browser (via Flatpak) / Brave / Vivaldi (with gaming-focused tabs and sidebars)',
    popularity: 40,
    homepage: 'https://www.opera.com/gx',
    alternative_to: ''
  },
  {
    id: 'msi-afterburner',
    name: 'MSI Afterburner',
    category: 'Utilities',
    description: 'Graphics card overclocking utility and hardware monitoring tool.',
    icon: 'msi-afterburner-icon',
    linux_alternative: 'TuxClocker / GreenWithEnvy (GWE) / CoreCtrl (for AMD Radeon cards) / MangoHud (FPS overlay)',
    popularity: 50,
    homepage: 'https://www.msi.com/Landing/afterburner',
    alternative_to: ''
  },
  {
    id: 'pdfcreator',
    name: 'PDFCreator',
    category: 'Office',
    description: 'Free tool to convert documents to PDF format.',
    icon: 'pdfcreator-icon',
    linux_alternative: 'Natively supported in Linux (Print to PDF is a built-in system printer) / PDFArranger',
    popularity: 30,
    homepage: 'https://www.pdfforge.org/pdfcreator',
    alternative_to: ''
  },
  {
    id: 'google-earth-pro',
    name: 'Google Earth Pro',
    category: 'Utilities',
    description: 'Virtual globe, map and geographical information program.',
    icon: 'google-earth-pro-icon',
    linux_alternative: 'Native Linux Version / Google Earth Web / QGIS',
    popularity: 35,
    homepage: 'https://www.google.com/earth/',
    alternative_to: ''
  },
  {
    id: 'rpcs3',
    name: 'RPCS3',
    category: 'Games',
    description: 'Open-source PlayStation 3 emulator and debugger.',
    icon: 'rpcs3-icon',
    linux_alternative: 'Native Linux Version|flathub:net.rpcs3.RPCS3',
    popularity: 45,
    homepage: 'https://rpcs3.net/',
    alternative_to: ''
  },
  {
    id: 'pcsx2',
    name: 'PCSX2',
    category: 'Games',
    description: 'PlayStation 2 video game console emulator.',
    icon: 'pcsx2-icon',
    linux_alternative: 'Native Linux Version|flathub:net.pcsx2.PCSX2',
    popularity: 45,
    homepage: 'https://pcsx2.net/',
    alternative_to: ''
  },
  {
    id: 'dolphin-emu',
    name: 'Dolphin Emulator',
    category: 'Games',
    description: 'Video game console emulator for GameCube and Wii.',
    icon: 'dolphin-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:org.DolphinEmu.dolphin-emu',
    popularity: 45,
    homepage: 'https://dolphin-emu.org/',
    alternative_to: ''
  },
  {
    id: 'ppsspp',
    name: 'PPSSPP',
    category: 'Games',
    description: 'Fast and portable PlayStation Portable (PSP) emulator.',
    icon: 'ppsspp-icon',
    linux_alternative: 'Native Linux Version|flathub:org.ppsspp.PPSSPP',
    popularity: 40,
    homepage: 'https://www.ppsspp.org/',
    alternative_to: ''
  },
  {
    id: 'duckstation',
    name: 'DuckStation',
    category: 'Games',
    description: 'Sony PlayStation 1 (PSX) console emulator focusing on playability and speed.',
    icon: 'duckstation-icon',
    linux_alternative: 'Native Linux Version|flathub:org.duckstation.DuckStation',
    popularity: 40,
    homepage: 'https://github.com/stenzek/duckstation',
    alternative_to: ''
  },
  {
    id: 'cemu',
    name: 'Cemu',
    category: 'Games',
    description: 'Highly optimized emulator for the Nintendo Wii U console.',
    icon: 'cemu-icon',
    linux_alternative: 'Native Linux Version|github:cemu-project/Cemu',
    popularity: 40,
    homepage: 'https://cemu.info/',
    alternative_to: ''
  },
  {
    id: 'ryujinx',
    name: 'Ryujinx',
    category: 'Games',
    description: 'Experimental Nintendo Switch emulator written in C#.',
    icon: 'ryujinx-icon',
    linux_alternative: 'Native Linux Version|github:Ryujinx/Ryujinx',
    popularity: 45,
    homepage: 'https://ryujinx.org/',
    alternative_to: ''
  },
  {
    id: 'piriform-ccleaner',
    name: 'CCleaner',
    category: 'Utilities',
    description: 'System optimization, privacy, and cleaning tool.',
    icon: 'piriform-ccleaner-icon',
    linux_alternative: 'BleachBit / Stacer / Czkawka',
    popularity: 50,
    homepage: 'https://www.ccleaner.com/',
    alternative_to: ''
  },
  {
    id: 'windirstat',
    name: 'WinDirStat',
    category: 'Utilities',
    description: 'Disk usage statistics viewer and cleanup tool.',
    icon: 'windirstat-icon',
    linux_alternative: 'QDirStat / Baobab (Disk Usage Analyzer) / NCurses Disk Usage (ncdu)',
    popularity: 30,
    homepage: 'https://windirstat.net/',
    alternative_to: ''
  },
  {
    id: 'jamsoftware-treesize-free',
    name: 'TreeSize Free',
    category: 'Utilities',
    description: 'Fast directory size scanner and disk usage analyzer.',
    icon: 'jamsoftware-treesize-free-icon',
    linux_alternative: 'Baobab / QDirStat / Ncdu',
    popularity: 25,
    homepage: 'https://www.jam-software.com/treesize_free',
    alternative_to: ''
  },
  {
    id: 'cpuid-hwmonitor',
    name: 'HWMonitor',
    category: 'Utilities',
    description: 'Hardware monitoring program that reads PC systems main health sensors.',
    icon: 'cpuid-hwmonitor-icon',
    linux_alternative: 'Psensor / lm-sensors (CLI) / Hardinfo',
    popularity: 35,
    homepage: 'https://www.cpuid.com/softwares/hwmonitor.html',
    alternative_to: ''
  },
  {
    id: 'cpuid-cpu-z',
    name: 'CPU-Z',
    category: 'Utilities',
    description: 'System profiling and monitoring application that detects CPU, RAM, and Motherboard details.',
    icon: 'cpuid-cpu-z-icon',
    linux_alternative: 'CPU-X / Hardinfo / CPU-G',
    popularity: 45,
    homepage: 'https://www.cpuid.com/softwares/cpu-z.html',
    alternative_to: ''
  },
  {
    id: 'techpowerup-gpu-z',
    name: 'GPU-Z',
    category: 'Utilities',
    description: 'Lightweight utility designed to provide information about video cards and GPUs.',
    icon: 'techpowerup-gpu-z-icon',
    linux_alternative: 'GPU-Viewer / NVTop (CLI) / GreenWithEnvy',
    popularity: 40,
    homepage: 'https://www.techpowerup.com/gpuz/',
    alternative_to: ''
  },
  {
    id: 'piriform-speccy',
    name: 'Speccy',
    category: 'Utilities',
    description: 'Detailed system information tool for your PC.',
    icon: 'piriform-speccy-icon',
    linux_alternative: 'Hardinfo / Neofetch / Fastfetch / CPU-X',
    popularity: 30,
    homepage: 'https://www.ccleaner.com/speccy',
    alternative_to: ''
  },
  {
    id: 'piriform-defraggler',
    name: 'Defraggler',
    category: 'Utilities',
    description: 'File and drive defragmentation software.',
    icon: 'piriform-defraggler-icon',
    linux_alternative: 'Not needed on Linux (modern Linux filesystems like Ext4, Btrfs, and F2FS do not require defragmentation)',
    popularity: 15,
    homepage: 'https://www.ccleaner.com/defraggler',
    alternative_to: ''
  },
  {
    id: 'codesector-teracopy',
    name: 'TeraCopy',
    category: 'Utilities',
    description: 'Compact program designed to copy and move files at the maximum possible speed.',
    icon: 'codesector-teracopy-icon',
    linux_alternative: 'Natively supported in Linux (file managers like Dolphin or Nautilus handle robust copy/pause out of the box) / rsync',
    popularity: 30,
    homepage: 'https://www.codesector.com/teracopy',
    alternative_to: ''
  },
  {
    id: 'aida64',
    name: 'AIDA64',
    category: 'Utilities',
    description: 'Detailed hardware detection, diagnostic and benchmarking utility.',
    icon: 'aida64-icon',
    linux_alternative: 'Hardinfo / Geekbench / Phoronix Test Suite',
    popularity: 35,
    homepage: 'https://www.aida64.com/',
    alternative_to: ''
  },
  {
    id: 'systeminformer-processhacker',
    name: 'Process Hacker',
    category: 'Utilities',
    description: 'Powerful multi-purpose process and service monitoring tool.',
    icon: 'systeminformer-processhacker-icon',
    linux_alternative: 'System Monitoring Center / HTOP / GNOME System Monitor / Stacer',
    popularity: 30,
    homepage: 'https://systeminformer.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'ditto',
    name: 'Ditto Clipboard Manager',
    category: 'Utilities',
    description: 'Extension to the standard Windows clipboard, saving copy history.',
    icon: 'ditto-icon',
    linux_alternative: 'CopyQ / GPaste / Klipper',
    popularity: 25,
    homepage: 'https://ditto-cp.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'voidtools-everything',
    name: 'Everything Search',
    category: 'Utilities',
    description: 'Locate files and folders by name instantly on Windows.',
    icon: 'voidtools-everything-icon',
    linux_alternative: 'FSearch / Catfish / locate / KRunner',
    popularity: 45,
    homepage: 'https://www.voidtools.com/',
    alternative_to: ''
  },
  {
    id: 'sharex',
    name: 'ShareX',
    category: 'Utilities',
    description: 'Free and open-source screen capture, file sharing and productivity tool.',
    icon: 'sharex-icon',
    linux_alternative: 'Flameshot / Spectacle / Ksnip / OBS Studio',
    popularity: 45,
    homepage: 'https://getsharex.com/',
    alternative_to: ''
  },
  {
    id: 'greenshot',
    name: 'Greenshot',
    category: 'Utilities',
    description: 'Light-weight screenshot software tool for Windows.',
    icon: 'greenshot-icon',
    linux_alternative: 'Flameshot / Spectacle / Ksnip',
    popularity: 30,
    homepage: 'https://getgreenshot.org/',
    alternative_to: ''
  },
  {
    id: 'faststone-capture',
    name: 'FastStone Capture',
    category: 'Utilities',
    description: 'Powerful, lightweight yet full-featured screen capture tool.',
    icon: 'faststone-capture-icon',
    linux_alternative: 'Flameshot / Spectacle / Ksnip',
    popularity: 20,
    homepage: 'https://www.faststone.org/FSCaptureDetail.htm',
    alternative_to: ''
  },
  {
    id: 'iobit-uninstaller',
    name: 'IObit Uninstaller',
    category: 'Utilities',
    description: 'Software uninstallation utility with deep registry cleaning.',
    icon: 'iobit-uninstaller-icon',
    linux_alternative: 'Not needed in Linux (package managers remove all dependencies cleanly)',
    popularity: 30,
    homepage: 'https://www.iobit.com/en/advanceduninstaller.php',
    alternative_to: ''
  },
  {
    id: 'netlimiter',
    name: 'NetLimiter',
    category: 'Utilities',
    description: 'Traffic monitoring and control tool designed for Windows.',
    icon: 'netlimiter-icon',
    linux_alternative: 'OpenSnitch / Wondershaper (CLI) / Trickle',
    popularity: 25,
    homepage: 'https://www.netlimiter.com/',
    alternative_to: ''
  },
  {
    id: 'glasswire',
    name: 'GlassWire',
    category: 'Utilities',
    description: 'Personal firewall and network monitor tool.',
    icon: 'glasswire-icon',
    linux_alternative: 'OpenSnitch / Gufw / Portmaster',
    popularity: 30,
    homepage: 'https://www.glasswire.com/',
    alternative_to: ''
  },
  {
    id: 'easyuefi-wintousb',
    name: 'WinToUSB',
    category: 'Utilities',
    description: 'Creator software that allows installing and running Windows OS on a USB drive.',
    icon: 'easyuefi-wintousb-icon',
    linux_alternative: 'WoeUSB / Ventoy',
    popularity: 20,
    homepage: 'https://www.easyuefi.com/wintousb/index.html',
    alternative_to: ''
  },
  {
    id: 'microsoft-onenote',
    name: 'Microsoft OneNote',
    category: 'Office',
    description: 'Digital note-taking application for collecting notes and information.',
    icon: 'microsoft-onenote-icon',
    linux_alternative: 'P3X OneNote (Linux client wrapper) / Obsidian / Joplin / Logseq / Web App',
    popularity: 50,
    homepage: 'https://www.onenote.com/',
    alternative_to: ''
  },
  {
    id: 'microsoft-powertoys',
    name: 'Microsoft PowerToys',
    category: 'Utilities',
    description: 'Set of utilities for power users to tune and streamline their Windows experience.',
    icon: 'microsoft-powertoys-icon',
    linux_alternative: 'Natively supported in Linux / GNOME extensions (e.g. gTile, Clipboard managers, Keyboard shortcuts) / KRunner',
    popularity: 40,
    homepage: 'https://learn.microsoft.com/en-us/windows/powertoys/',
    alternative_to: ''
  },
  {
    id: 'microsoft-project',
    name: 'Microsoft Project',
    category: 'Office',
    description: 'Project management software developed and sold by Microsoft.',
    icon: 'microsoft-project-icon',
    linux_alternative: 'ProjectLibre / GanttProject / OpenProject (Web-based)',
    popularity: 30,
    homepage: 'https://www.microsoft.com/en-us/microsoft-365/project/project-management-software',
    alternative_to: ''
  },
  {
    id: 'literatureandlatte-scrivener',
    name: 'Scrivener',
    category: 'Office',
    description: 'Powerful word-processing program and outliner designed for authors.',
    icon: 'literatureandlatte-scrivener-icon',
    linux_alternative: 'Manuskript / NovelWriter / Scrivener (via Wine)',
    popularity: 25,
    homepage: 'https://www.literatureandlatte.com/scrivener/overview',
    alternative_to: ''
  },
  {
    id: 'evernote',
    name: 'Evernote',
    category: 'Office',
    description: 'Mobile and desktop app designed for note taking, organizing, task management, and archiving.',
    icon: 'evernote-icon',
    linux_alternative: 'Joplin / Obsidian / Logseq / Evernote Web Client',
    popularity: 40,
    homepage: 'https://evernote.com/',
    alternative_to: ''
  },
  {
    id: 'todoist',
    name: 'Todoist',
    category: 'Office',
    description: 'Popular task manager and to-do list app.',
    icon: 'todoist-icon',
    linux_alternative: 'Native Linux Version|flathub:com.todoist.Todoist / Super Productivity / Web App',
    popularity: 35,
    homepage: 'https://todoist.com/',
    alternative_to: ''
  },
  {
    id: 'ticktick',
    name: 'TickTick',
    category: 'Office',
    description: 'Collaborative calendar, to-do list, and task manager app.',
    icon: 'ticktick-icon',
    linux_alternative: 'Native Linux Version (Web Client / PWA) / Super Productivity',
    popularity: 30,
    homepage: 'https://ticktick.com/',
    alternative_to: ''
  },
  {
    id: 'adobe-lightroom',
    name: 'Adobe Lightroom',
    category: 'Design',
    description: 'Creative image organization and image processing software.',
    icon: 'adobe-lightroom-icon',
    linux_alternative: 'Darktable / RawTherapee / Digikam',
    popularity: 50,
    homepage: 'https://www.adobe.com/products/photoshop-lightroom.html',
    alternative_to: ''
  },
  {
    id: 'adobe-indesign',
    name: 'Adobe InDesign',
    category: 'Design',
    description: 'Desktop publishing and typesetting software application.',
    icon: 'adobe-indesign-icon',
    linux_alternative: 'Scribus / Canva (Web)',
    popularity: 45,
    homepage: 'https://www.adobe.com/products/indesign.html',
    alternative_to: ''
  },
  {
    id: 'adobe-aftereffects',
    name: 'Adobe After Effects',
    category: 'Design',
    description: 'Digital visual effects, motion graphics, and compositing application.',
    icon: 'adobe-aftereffects-icon',
    linux_alternative: 'Natron / Blender / DaVinci Resolve (Fusion tab)',
    popularity: 50,
    homepage: 'https://www.adobe.com/products/aftereffects.html',
    alternative_to: ''
  },
  {
    id: 'adobe-animate',
    name: 'Adobe Animate',
    category: 'Design',
    description: 'Multimedia authoring and computer animation program.',
    icon: 'adobe-animate-icon',
    linux_alternative: 'Synfig Studio / Wick Editor / OpenToonz',
    popularity: 35,
    homepage: 'https://www.adobe.com/products/animate.html',
    alternative_to: ''
  },
  {
    id: 'adobe-audition',
    name: 'Adobe Audition',
    category: 'Audio',
    description: 'Digital audio workstation featuring a multitrack, destructive-mixdown editing and non-destructive effects.',
    icon: 'adobe-audition-icon',
    linux_alternative: 'Audacity / Ardour / Tenacity',
    popularity: 40,
    homepage: 'https://www.adobe.com/products/audition.html',
    alternative_to: ''
  },
  {
    id: 'corel-coreldraw',
    name: 'CorelDRAW',
    category: 'Design',
    description: 'Professional vector graphics editor used for illustration and layout.',
    icon: 'corel-coreldraw-icon',
    linux_alternative: 'Inkscape / Gravit Designer (Web)',
    popularity: 40,
    homepage: 'https://www.coreldraw.com/',
    alternative_to: ''
  },
  {
    id: 'systemax-painttoolsai',
    name: 'PaintTool SAI',
    category: 'Design',
    description: 'Lightweight raster graphics editor and painting software.',
    icon: 'systemax-painttoolsai-icon',
    linux_alternative: 'Krita / MyPaint / PaintTool SAI under Wine (runs perfectly)',
    popularity: 30,
    homepage: 'https://www.systemax.jp/en/sai/',
    alternative_to: ''
  },
  {
    id: 'celcys-clipstudiopaint',
    name: 'Clip Studio Paint',
    category: 'Design',
    description: 'Digital painting program used for creating manga, comics, and digital illustrations.',
    icon: 'celcys-clipstudiopaint-icon',
    linux_alternative: 'Krita / MediBang Paint (via Wine) / Clip Studio Paint (via Wine)',
    popularity: 40,
    homepage: 'https://www.clipstudio.net/en/',
    alternative_to: ''
  },
  {
    id: 'serif-affinityphoto',
    name: 'Affinity Photo',
    category: 'Design',
    description: 'Professional photo editing and raster graphics editor.',
    icon: 'serif-affinityphoto-icon',
    linux_alternative: 'GIMP / Krita / Photopea (Web)',
    popularity: 40,
    homepage: 'https://affinity.serif.com/en-us/photo/',
    alternative_to: ''
  },
  {
    id: 'serif-affinitydesigner',
    name: 'Affinity Designer',
    category: 'Design',
    description: 'Vector graphics design software for illustrations, UI and web layout.',
    icon: 'serif-affinitydesigner-icon',
    linux_alternative: 'Inkscape / Penpot / Figma (Web)',
    popularity: 40,
    homepage: 'https://affinity.serif.com/en-us/designer/',
    alternative_to: ''
  },
  {
    id: 'serif-affinitypublisher',
    name: 'Affinity Publisher',
    category: 'Design',
    description: 'Professional desktop publishing software for creating layouts.',
    icon: 'serif-affinitypublisher-icon',
    linux_alternative: 'Scribus / Canva (Web)',
    popularity: 35,
    homepage: 'https://affinity.serif.com/en-us/publisher/',
    alternative_to: ''
  },
  {
    id: 'dotpdn-paintnet',
    name: 'Paint.NET',
    category: 'Design',
    description: 'Free raster graphics editor software with a simple, tabbed interface.',
    icon: 'dotpdn-paintnet-icon',
    linux_alternative: 'Pinta / GIMP / LazPaint',
    popularity: 35,
    homepage: 'https://www.getpaint.net/',
    alternative_to: ''
  },
  {
    id: 'trimble-sketchup',
    name: 'SketchUp',
    category: 'Design',
    description: '3D modeling computer program for drawing and design applications.',
    icon: 'trimble-sketchup-icon',
    linux_alternative: 'Blender / FreeCAD / SketchUp Web Version',
    popularity: 40,
    homepage: 'https://www.sketchup.com/',
    alternative_to: ''
  },
  {
    id: 'dassault-solidworks',
    name: 'SolidWorks',
    category: 'Design',
    description: 'Solid modeling computer-aided design and computer-aided engineering computer program.',
    icon: 'dassault-solidworks-icon',
    linux_alternative: 'FreeCAD / Onshape (Web-based CAD) / BricsCAD',
    popularity: 45,
    homepage: 'https://www.solidworks.com/',
    alternative_to: ''
  },
  {
    id: 'mcneel-rhinoceros',
    name: 'Rhinoceros 3D',
    category: 'Design',
    description: 'Commercial 3D computer graphics and computer-aided design application software.',
    icon: 'mcneel-rhinoceros-icon',
    linux_alternative: 'Blender / FreeCAD / OpenCASCADE',
    popularity: 35,
    homepage: 'https://www.rhino3d.com/',
    alternative_to: ''
  },
  {
    id: 'magix-vegaspro',
    name: 'Sony Vegas Pro',
    category: 'Design',
    description: 'Professional non-linear video editing software.',
    icon: 'magix-vegaspro-icon',
    linux_alternative: 'DaVinci Resolve / Kdenlive / Shotcut',
    popularity: 45,
    homepage: 'https://www.vegascreativesoftware.com/us/vegas-pro/',
    alternative_to: ''
  },
  {
    id: 'techsmith-camtasia',
    name: 'Camtasia Studio',
    category: 'Design',
    description: 'Screen recorder and video editor suite for creating video tutorials.',
    icon: 'techsmith-camtasia-icon',
    linux_alternative: 'OBS Studio / Kdenlive / VokoscreenNG / SimpleScreenRecorder',
    popularity: 35,
    homepage: 'https://www.techsmith.com/video-editor.html',
    alternative_to: ''
  },
  {
    id: 'foobar2000',
    name: 'Foobar2000',
    category: 'Audio',
    description: 'Highly customizable freeware audio player for Windows.',
    icon: 'foobar2000-icon',
    linux_alternative: 'DeaDBeeF / Strawberry Music Player / Foobar2000 under Wine',
    popularity: 40,
    homepage: 'https://www.foobar2000.org/',
    alternative_to: ''
  },
  {
    id: 'winamp',
    name: 'Winamp',
    category: 'Audio',
    description: 'Iconic retro media player for MP3s and other audio formats.',
    icon: 'winamp-icon',
    linux_alternative: 'Audacious (with Winamp classic skins) / Qmmp / Clementine',
    popularity: 30,
    homepage: 'https://www.winamp.com/',
    alternative_to: ''
  },
  {
    id: 'musicbee',
    name: 'MusicBee',
    category: 'Audio',
    description: 'Feature-rich music manager and player for Windows.',
    icon: 'musicbee-icon',
    linux_alternative: 'Strawberry / Clementine / Rhythmbox',
    popularity: 30,
    homepage: 'https://getmusicbee.com/',
    alternative_to: ''
  },
  {
    id: 'ultraedit',
    name: 'UltraEdit',
    category: 'Development',
    description: 'Commercial text editor for developers with multi-file search and hex editing.',
    icon: 'ultraedit-icon',
    linux_alternative: 'Native Linux Version / VS Code / VSCodium / Sublime Text',
    popularity: 30,
    homepage: 'https://www.ultraedit.com/',
    alternative_to: ''
  },
  {
    id: 'winmerge',
    name: 'WinMerge',
    category: 'Development',
    description: 'Open-source differencing and merging tool for files and directories.',
    icon: 'winmerge-icon',
    linux_alternative: 'Meld / Kompare / KDiff3',
    popularity: 35,
    homepage: 'https://winmerge.org/',
    alternative_to: ''
  },
  {
    id: 'scootersoftware-beyondcompare',
    name: 'Beyond Compare',
    category: 'Development',
    description: 'Directory and file comparison utility with syntax highlighting and binary comparison.',
    icon: 'scootersoftware-beyondcompare-icon',
    linux_alternative: 'Native Linux Version / Meld / KDiff3',
    popularity: 30,
    homepage: 'https://www.scootersoftware.com/',
    alternative_to: ''
  },
  {
    id: 'heidisql',
    name: 'HeidiSQL',
    category: 'Development',
    description: 'Free administration tool for MySQL, MariaDB, SQL Server and PostgreSQL.',
    icon: 'heidisql-icon',
    linux_alternative: 'DBeaver / HeidiSQL under Wine (runs perfectly) / Beekeeper Studio',
    popularity: 45,
    homepage: 'https://www.heidisql.com/',
    alternative_to: ''
  },
  {
    id: 'microsoft-ssms',
    name: 'SQL Server Management Studio (SSMS)',
    category: 'Development',
    description: 'Integrated environment for managing any SQL Server infrastructure.',
    icon: 'microsoft-ssms-icon',
    linux_alternative: 'DBeaver / Azure Data Studio (Native Linux Version) / DataGrip',
    popularity: 45,
    homepage: 'https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms',
    alternative_to: ''
  },
  {
    id: 'tortoisegit',
    name: 'TortoiseGit',
    category: 'Development',
    description: 'Windows Shell Interface to Git.',
    icon: 'tortoisegit-icon',
    linux_alternative: 'RabbitVCS (Nautilus/Dolphin shell integration) / GitKraken / lazygit',
    popularity: 35,
    homepage: 'https://tortoisegit.org/',
    alternative_to: ''
  },
  {
    id: 'github-desktop',
    name: 'GitHub Desktop',
    category: 'Development',
    description: 'Simple Git GUI to collaborate on projects directly from your desktop.',
    icon: 'github-desktop-icon',
    linux_alternative: 'GitHub Desktop (Unofficial Linux Port by shiftkey) / GitKraken / Gitg / LazyGit',
    popularity: 45,
    homepage: 'https://desktop.github.com/',
    alternative_to: ''
  },
  {
    id: 'ea-app',
    name: 'EA App (Origin)',
    category: 'Games',
    description: 'Digital storefront and gaming client developed by Electronic Arts.',
    icon: 'ea-app-icon',
    linux_alternative: 'Lutris / Bottles / Steam (via Proton) / Heroic Games Launcher',
    popularity: 40,
    homepage: 'https://www.ea.com/news/introducing-the-ea-app',
    alternative_to: ''
  },
  {
    id: 'rockstar-launcher',
    name: 'Rockstar Games Launcher',
    category: 'Games',
    description: 'Storefront and game launcher for Rockstar Games on PC.',
    icon: 'rockstar-launcher-icon',
    linux_alternative: 'Steam (via Proton) / Lutris / Bottles',
    popularity: 30,
    homepage: 'https://socialclub.rockstargames.com/rockstar-games-launcher',
    alternative_to: ''
  },
  {
    id: 'gog-galaxy',
    name: 'GOG Galaxy',
    category: 'Games',
    description: 'Unified game client that keeps all your games in one place, across multiple platforms.',
    icon: 'gog-galaxy-icon',
    linux_alternative: 'Heroic Games Launcher / Lutris / Bottles / Minigalaxy',
    popularity: 40,
    homepage: 'https://www.gogalaxy.com/en/',
    alternative_to: ''
  },
  {
    id: 'blizzard-battlenet',
    name: 'Battle.net Launcher',
    category: 'Games',
    description: 'Game client and storefront for Blizzard Entertainment games.',
    icon: 'blizzard-battlenet-icon',
    linux_alternative: 'Lutris / Bottles / Steam (via Proton)',
    popularity: 40,
    homepage: 'https://www.blizzard.com/en-us/apps/battle.net/desktop',
    alternative_to: ''
  },
  {
    id: 'overwolf-curseforge',
    name: 'CurseForge App',
    category: 'Games',
    description: 'Mod and addon manager for Minecraft, WoW, and other games.',
    icon: 'overwolf-curseforge-icon',
    linux_alternative: 'Prism Launcher (for Minecraft mods) / Modrinth App / WowUp (for WoW addons) / CurseForge Linux Client',
    popularity: 40,
    homepage: 'https://www.curseforge.com/',
    alternative_to: ''
  },
  {
    id: 'nexusmods-vortex',
    name: 'Vortex Mod Manager',
    category: 'Games',
    description: 'Powerful open-source mod manager developed by Nexus Mods.',
    icon: 'nexusmods-vortex-icon',
    linux_alternative: 'ModOrganizer 2 (runs well on Linux via installer scripts) / Vortex under Wine / SteamTinkerLaunch',
    popularity: 40,
    homepage: 'https://www.nexusmods.com/site/mods/1',
    alternative_to: ''
  },
  {
    id: 'cheatengine',
    name: 'Cheat Engine',
    category: 'Games',
    description: 'Memory scanner and debugger designed for modifying single-player games offline.',
    icon: 'cheatengine-icon',
    linux_alternative: 'PINCE / GameConqueror / scanmem',
    popularity: 40,
    homepage: 'https://www.cheatengine.org/',
    alternative_to: ''
  },
  {
    id: 'wemod',
    name: 'WeMod',
    category: 'Games',
    description: 'Desktop game trainer application containing cheats for thousands of PC games.',
    icon: 'wemod-icon',
    linux_alternative: 'WeMod-Launcher (Wine script on Github) / Cheat Engine / SteamTinkerLaunch',
    popularity: 35,
    homepage: 'https://www.wemod.com/',
    alternative_to: ''
  },
  {
    id: 'razer-synapse',
    name: 'Razer Synapse',
    category: 'Utilities',
    description: 'Configuration software for Razer peripherals and device settings.',
    icon: 'razer-synapse-icon',
    linux_alternative: 'OpenRazer / Polychromatic (GUI) / RazerGenie (GUI)',
    popularity: 40,
    homepage: 'https://www.razer.com/synapse-3',
    alternative_to: ''
  },
  {
    id: 'logitech-ghub',
    name: 'Logitech G HUB',
    category: 'Utilities',
    description: 'Single portal for optimizing and customizing all your compatible Logitech G gear.',
    icon: 'logitech-ghub-icon',
    linux_alternative: 'Solaar (for unifying receivers) / Piper (for mapping mouse buttons and DPI profiles)',
    popularity: 40,
    homepage: 'https://www.logitechg.com/en-us/innovation/g-hub.html',
    alternative_to: ''
  },
  {
    id: 'vb-audiovoicemeeter',
    name: 'VoiceMeeter Banana',
    category: 'Audio',
    description: 'Advanced virtual audio mixer and routing controller.',
    icon: 'vb-audiovoicemeeter-icon',
    linux_alternative: 'PipeWire / Helvum / qpwgraph / Carla (using virtual sinks and routing)',
    popularity: 40,
    homepage: 'https://vb-audio.com/Voicemeeter/banana.htm',
    alternative_to: ''
  },
  {
    id: 'ventrilo',
    name: 'Ventrilo',
    category: 'Social',
    description: 'Voice over IP group communication software.',
    icon: 'ventrilo-icon',
    linux_alternative: 'Mumble / Discord / TeamSpeak',
    popularity: 15,
    homepage: 'https://www.ventrilo.com/',
    alternative_to: ''
  },
  {
    id: 'stardock-start11',
    name: 'Stardock Start11',
    category: 'Utilities',
    description: 'Windows 11 Start Menu and taskbar customization software.',
    icon: 'stardock-start11-icon',
    linux_alternative: 'Natively supported in Linux (desktop environments like KDE Plasma or Cinnamon offer complete start menu customizability out of the box)',
    popularity: 20,
    homepage: 'https://www.stardock.com/products/start11/',
    alternative_to: ''
  },
  {
    id: 'poweriso',
    name: 'PowerISO',
    category: 'Utilities',
    description: 'CD/DVD/BD image file processing tool that lets you open, extract, burn, create, and edit ISO files.',
    icon: 'poweriso-icon',
    linux_alternative: 'K3b / AcetoneISO / Furius ISO Mount',
    popularity: 30,
    homepage: 'https://www.poweriso.com/',
    alternative_to: ''
  },
  {
    id: 'daemon-tools-lite',
    name: 'DAEMON Tools Lite',
    category: 'Utilities',
    description: 'Disk imaging software for mounting virtual CD/DVD drives.',
    icon: 'daemon-tools-lite-icon',
    linux_alternative: 'Natively supported in Linux (using loop device mounting) / AcetoneISO',
    popularity: 45,
    homepage: 'https://www.daemon-tools.cc/products/dtlite',
    alternative_to: ''
  },
  {
    id: 'macrium-reflect',
    name: 'Macrium Reflect',
    category: 'Utilities',
    description: 'Image-based backup and cloning software for hard disks.',
    icon: 'macrium-reflect-icon',
    linux_alternative: 'Clonezilla / Rescuezilla / Timeshift',
    popularity: 35,
    homepage: 'https://www.macrium.com/reflectfree',
    alternative_to: ''
  },
  {
    id: 'neosemart-easybcd',
    name: 'EasyBCD',
    category: 'Utilities',
    description: 'Bootloader modifier and multi-boot manager tool.',
    icon: 'neosemart-easybcd-icon',
    linux_alternative: 'Grub Customizer / manual GRUB configuration',
    popularity: 25,
    homepage: 'https://neosmart.net/EasyBCD/',
    alternative_to: ''
  },
  {
    id: 'hwinfo-sensor',
    name: 'HWiNFO',
    category: 'Utilities',
    description: 'Professional hardware information and diagnostic tool.',
    icon: 'hwinfo-sensor-icon',
    linux_alternative: 'Hardinfo / lm-sensors / CPU-X',
    popularity: 35,
    homepage: 'https://www.hwinfo.com/',
    alternative_to: ''
  },
  {
    id: 'xpadder',
    name: 'Xpadder',
    category: 'Games',
    description: 'Keyboard/mouse emulation software for gamepads.',
    icon: 'xpadder-icon',
    linux_alternative: 'AntiMicroX / QJoyPad',
    popularity: 30,
    homepage: 'https://xpadder.com/',
    alternative_to: ''
  },
  {
    id: 'ds4windows',
    name: 'DS4Windows',
    category: 'Games',
    description: 'Virtual emulator and mapper that allows using DualShock 4 on Windows.',
    icon: 'ds4windows-icon',
    linux_alternative: 'Natively supported in Linux (the Linux kernel has official Sony drivers that support DS4 plug-and-play) / Steam Input',
    popularity: 40,
    homepage: 'https://ds4windows.dev/',
    alternative_to: ''
  },
  {
    id: 'nvidia-geforce-experience',
    name: 'Nvidia GeForce Experience',
    category: 'Utilities',
    description: 'Companion application for GeForce graphics cards providing driver updates and game optimization.',
    icon: 'nvidia-geforce-experience-icon',
    linux_alternative: 'Native NVIDIA Linux Drivers / GreenWithEnvy / OBS Studio / Proton',
    popularity: 50,
    homepage: 'https://www.nvidia.com/en-us/geforce/geforce-experience/',
    alternative_to: ''
  }
];

// Perform insertion
const stmt = db.prepare(`
  INSERT OR REPLACE INTO apps (id, name, description, category, icon, linux_alternative, popularity, homepage, alternative_to)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let inserted = 0;
const transaction = db.transaction((apps) => {
  for (const app of apps) {
    stmt.run(app.id, app.name, app.description, app.category, app.icon, app.linux_alternative, app.popularity, app.homepage, app.alternative_to);
    inserted++;
  }
});

transaction(newApps);
console.log(`Successfully inserted/replaced ${inserted} apps in the local SQLite database!`);
db.close();
