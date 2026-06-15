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
  // Autodesk suite
  {
    id: 'autodesk-maya',
    name: 'Autodesk Maya',
    category: 'Design',
    description: '3D computer graphics application used for creating interactive 3D applications, animated films, and visual effects.',
    icon: 'autodesk-maya-icon',
    linux_alternative: 'Blender / Maya (Native Linux Version)',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/maya/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-3dsmax',
    name: 'Autodesk 3ds Max',
    category: 'Design',
    description: 'Professional 3D computer graphics program for making 3D animations, models, games and images.',
    icon: 'autodesk-3dsmax-icon',
    linux_alternative: 'Blender',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/3ds-max/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-mudbox',
    name: 'Autodesk Mudbox',
    category: 'Design',
    description: 'Proprietary computer graphics 3D sculpting and painting tool.',
    icon: 'autodesk-mudbox-icon',
    linux_alternative: 'Blender / ZBrush',
    popularity: 35,
    homepage: 'https://www.autodesk.com/products/mudbox/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-sketchbook',
    name: 'Autodesk SketchBook Pro',
    category: 'Design',
    description: 'Raster graphics software app intended for expressive drawing and concept sketching.',
    icon: 'autodesk-sketchbook-icon',
    linux_alternative: 'Krita / GIMP / MyPaint',
    popularity: 40,
    homepage: 'https://www.sketchbook.com/',
    alternative_to: ''
  },
  {
    id: 'autodesk-civil3d',
    name: 'Autodesk Civil 3D',
    category: 'Engineering',
    description: 'Civil engineering design and documentation software that supports BIM workflows.',
    icon: 'autodesk-civil3d-icon',
    linux_alternative: 'FreeCAD / QCad',
    popularity: 35,
    homepage: 'https://www.autodesk.com/products/civil-3d/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-infraworks',
    name: 'Autodesk Infraworks',
    category: 'Engineering',
    description: 'Conceptual design software for infrastructure planning and analysis.',
    icon: 'autodesk-infraworks-icon',
    linux_alternative: 'Blender / FreeCAD',
    popularity: 35,
    homepage: 'https://www.autodesk.com/products/infraworks/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-navisworks',
    name: 'Autodesk Navisworks',
    category: 'Engineering',
    description: 'Project review software for 3D coordination, analysis, and communication.',
    icon: 'autodesk-navisworks-icon',
    linux_alternative: 'FreeCAD (BIM Workbench) / Blender BIM',
    popularity: 35,
    homepage: 'https://www.autodesk.com/products/navisworks/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-arnold',
    name: 'Autodesk Arnold',
    category: 'Design',
    description: 'Advanced Monte Carlo ray tracing renderer application.',
    icon: 'autodesk-arnold-icon',
    linux_alternative: 'Blender Cycles / LuxCoreRender',
    popularity: 35,
    homepage: 'https://www.autodesk.com/products/arnold/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-flame',
    name: 'Autodesk Flame',
    category: 'Design',
    description: 'High-end 3D compositing, visual effects, and editorial finishing software.',
    icon: 'autodesk-flame-icon',
    linux_alternative: 'Natron / Blender / DaVinci Resolve',
    popularity: 35,
    homepage: 'https://www.autodesk.com/products/flame/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-inventor-pro',
    name: 'Autodesk Inventor Professional',
    category: 'Engineering',
    description: '3D CAD modeling software for product design and engineering.',
    icon: 'autodesk-inventor-pro-icon',
    linux_alternative: 'FreeCAD / OpenCASCADE',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/inventor/overview',
    alternative_to: ''
  },
  {
    id: 'autodesk-revit-pro',
    name: 'Autodesk Revit Professional',
    category: 'Engineering',
    description: 'Multidisciplinary BIM software for high-quality architectural design.',
    icon: 'autodesk-revit-pro-icon',
    linux_alternative: 'FreeCAD (BIM) / Blender BIM',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/revit/overview',
    alternative_to: ''
  },

  // System monitoring
  {
    id: 'open-hardware-monitor',
    name: 'Open Hardware Monitor',
    category: 'Utilities',
    description: 'Free open source software that monitors temperature sensors, fan speeds, voltages, load and clock speeds of a computer.',
    icon: 'open-hardware-monitor-icon',
    linux_alternative: 'Psensor / lm-sensors / Hardinfo',
    popularity: 40,
    homepage: 'https://openhardwaremonitor.org/',
    alternative_to: ''
  },
  {
    id: 'hwmonitor-pro',
    name: 'HWMonitor Pro',
    category: 'Utilities',
    description: 'Professional hardware monitoring program that adds remote monitoring, graph generation, and improved interface.',
    icon: 'hwmonitor-pro-icon',
    linux_alternative: 'Psensor / lm-sensors',
    popularity: 35,
    homepage: 'https://www.cpuid.com/softwares/hwmonitor-pro.html',
    alternative_to: ''
  },

  // Cleaning
  {
    id: 'geek-uninstaller',
    name: 'Geek Uninstaller',
    category: 'Utilities',
    description: 'Lightweight, fast, and portable application uninstaller that performs deep scans for leftover registry keys and files.',
    icon: 'geek-uninstaller-icon',
    linux_alternative: 'Not needed on Linux (package managers handle clean uninstallations natively)',
    popularity: 40,
    homepage: 'https://geekuninstaller.com/',
    alternative_to: ''
  },
  {
    id: 'iobit-uninstaller',
    name: 'IObit Uninstaller',
    category: 'Utilities',
    description: 'Software utility to remove unwanted programs, bundleware, and Windows apps completely.',
    icon: 'iobit-uninstaller-icon',
    linux_alternative: 'Not needed on Linux (handled by package managers)',
    popularity: 40,
    homepage: 'https://www.iobit.com/en/advanceduninstaller.php',
    alternative_to: ''
  },

  // Missing requested apps
  {
    id: 'mozilla-firefox-browser',
    name: 'Mozilla Firefox',
    category: 'Utilities',
    description: 'Free and open-source web browser developed by the Mozilla Foundation.',
    icon: 'mozilla-firefox-browser-icon',
    linux_alternative: 'Native Linux Version|flathub:org.mozilla.firefox',
    popularity: 50,
    homepage: 'https://www.mozilla.org/firefox/',
    alternative_to: ''
  },
  {
    id: 'element-matrix-client',
    name: 'Element (Matrix)',
    category: 'Social',
    description: 'Secure, decentralized collaboration messenger app built on the Matrix protocol.',
    icon: 'element-matrix-client-icon',
    linux_alternative: 'Native Linux Version|flathub:im.riot.Riot / element-web',
    popularity: 40,
    homepage: 'https://element.io/',
    alternative_to: ''
  },
  {
    id: 'microsoft-word-app',
    name: 'Microsoft Word',
    category: 'Office',
    description: 'Industry-standard word processing software product by Microsoft.',
    icon: 'microsoft-word-app-icon',
    linux_alternative: 'LibreOffice Writer / OnlyOffice Desktop Editors / Google Docs (Web)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/en-us/microsoft-365/word',
    alternative_to: ''
  },
  {
    id: 'microsoft-excel-app',
    name: 'Microsoft Excel',
    category: 'Office',
    description: 'Industry-standard spreadsheet editor featuring data analysis and visualization tools.',
    icon: 'microsoft-excel-app-icon',
    linux_alternative: 'LibreOffice Calc / OnlyOffice Desktop Editors / Google Sheets (Web)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/en-us/microsoft-365/excel',
    alternative_to: ''
  },
  {
    id: 'microsoft-powerpoint-app',
    name: 'Microsoft PowerPoint',
    category: 'Office',
    description: 'Presentation software developed by Microsoft for slideshow creation.',
    icon: 'microsoft-powerpoint-app-icon',
    linux_alternative: 'LibreOffice Impress / OnlyOffice Desktop Editors / Google Slides (Web)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint',
    alternative_to: ''
  },
  {
    id: 'mendeley-desktop',
    name: 'Mendeley Desktop',
    category: 'Office',
    description: 'Academic reference manager, research network and PDF organizer by Elsevier.',
    icon: 'mendeley-desktop-icon',
    linux_alternative: 'Native Linux Version / Zotero',
    popularity: 40,
    homepage: 'https://www.mendeley.com/',
    alternative_to: ''
  },
  {
    id: 'figma-desktop-app',
    name: 'Figma Desktop',
    category: 'Design',
    description: 'Desktop app wrapper for the collaborative vector graphics editor and prototyping tool Figma.',
    icon: 'figma-desktop-app-icon',
    linux_alternative: 'Figma Web Client / Penpot / Inkscape',
    popularity: 45,
    homepage: 'https://www.figma.com/',
    alternative_to: ''
  },
  {
    id: 'git-for-windows',
    name: 'Git for Windows',
    category: 'Development',
    description: 'Lightweight, self-contained set of command-line tools that brings the full Git SCM features to Windows.',
    icon: 'git-for-windows-icon',
    linux_alternative: 'Native Linux Version (Git is built natively into Linux kernel/distributions)',
    popularity: 45,
    homepage: 'https://gitforwindows.org/',
    alternative_to: ''
  },
  {
    id: 'mobaxterm-client',
    name: 'MobaXterm',
    category: 'Development',
    description: 'Ultimate toolbox for remote computing, bringing SSH, X11, SFTP, and terminal tools in a single app.',
    icon: 'mobaxterm-client-icon',
    linux_alternative: 'Remmina / GNOME Terminal / Asbru Connection Manager',
    popularity: 40,
    homepage: 'https://mobaxterm.mobatek.net/',
    alternative_to: ''
  },
  {
    id: 'podman-desktop-app',
    name: 'Podman Desktop',
    category: 'Development',
    description: 'Graphical user interface for managing containers and pods using Podman.',
    icon: 'podman-desktop-app-icon',
    linux_alternative: 'Native Linux Version|flathub:io.podman_desktop.PodmanDesktop',
    popularity: 40,
    homepage: 'https://podman-desktop.io/',
    alternative_to: ''
  },
  {
    id: 'bulk-rename-utility',
    name: 'Bulk Rename Utility',
    category: 'Utilities',
    description: 'Extremely powerful, lightweight file renaming utility with rich regex and rule support.',
    icon: 'bulk-rename-utility-icon',
    linux_alternative: 'KRename / Métamorphose / rename (CLI)',
    popularity: 40,
    homepage: 'https://www.bulkrenameutility.co.uk/',
    alternative_to: ''
  },
  {
    id: 'wireshark-analyzer',
    name: 'Wireshark',
    category: 'Utilities',
    description: "World's foremost and widely-used network protocol analyzer.",
    icon: 'wireshark-analyzer-icon',
    linux_alternative: 'Native Linux Version|flathub:org.wireshark.Wireshark / tcpdump (CLI)',
    popularity: 45,
    homepage: 'https://www.wireshark.org/',
    alternative_to: ''
  },
  {
    id: 'advanced-ip-scanner',
    name: 'Advanced IP Scanner',
    category: 'Utilities',
    description: 'Fast, robust and easy-to-use network scanner that analyzes LAN devices.',
    icon: 'advanced-ip-scanner-icon',
    linux_alternative: 'Angry IP Scanner (Native Linux) / Nmap (CLI) / Zenmap',
    popularity: 40,
    homepage: 'https://www.advanced-ip-scanner.com/',
    alternative_to: ''
  },
  {
    id: 'remmina-remote',
    name: 'Remmina',
    category: 'Utilities',
    description: 'GTK+ remote desktop client supporting RDP, VNC, SPICE, and SSH.',
    icon: 'remmina-remote-icon',
    linux_alternative: 'Native Linux Version|flathub:org.remmina.Remmina',
    popularity: 45,
    homepage: 'https://remmina.org/',
    alternative_to: ''
  },
  {
    id: 'nextcloud-desktop-client',
    name: 'Nextcloud Desktop',
    category: 'Utilities',
    description: 'Client tool to sync local folders with your private Nextcloud server.',
    icon: 'nextcloud-desktop-client-icon',
    linux_alternative: 'Native Linux Version|flathub:org.nextcloud.Nextcloud',
    popularity: 45,
    homepage: 'https://nextcloud.com/install/#install-clients',
    alternative_to: ''
  },
  {
    id: 'insync-client',
    name: 'Insync',
    category: 'Utilities',
    description: 'Premium desktop sync client for Google Drive, OneDrive, and Dropbox with native Linux integration.',
    icon: 'insync-client-icon',
    linux_alternative: 'Native Linux Version (official Insync deb/rpm packages) / rclone',
    popularity: 40,
    homepage: 'https://www.insynchq.com/',
    alternative_to: ''
  },
  {
    id: 'rclone-sync',
    name: 'Rclone',
    category: 'Utilities',
    description: 'Command-line program to sync files and directories to and from major cloud storage providers.',
    icon: 'rclone-sync-icon',
    linux_alternative: 'Native Linux Version (Rclone is native to Linux)',
    popularity: 45,
    homepage: 'https://rclone.org/',
    alternative_to: ''
  },
  {
    id: 'modrinth-app-launcher',
    name: 'Modrinth App',
    category: 'Games',
    description: 'Modern, open-source Minecraft launcher focused on modular mod and modpack installation.',
    icon: 'modrinth-app-launcher-icon',
    linux_alternative: 'Native Linux Version (AppImage/Flatpak) / Prism Launcher',
    popularity: 45,
    homepage: 'https://modrinth.com/app',
    alternative_to: ''
  },
  {
    id: 'protonup-qt-tool',
    name: 'ProtonUp-Qt',
    category: 'Games',
    description: 'Graphical tool to install and manage custom Proton compatibility layers (Proton-GE) for Steam and Lutris.',
    icon: 'protonup-qt-tool-icon',
    linux_alternative: 'Native Linux Version|flathub:net.davidotek.pupgui2',
    popularity: 45,
    homepage: 'https://github.com/DavidoTek/ProtonUp-Qt',
    alternative_to: ''
  },

  // Multimedia
  {
    id: 'corel-videostudio',
    name: 'Corel VideoStudio',
    category: 'Design',
    description: 'Consumer-oriented video editing software package by Corel.',
    icon: 'corel-videostudio-icon',
    linux_alternative: 'Kdenlive / Shotcut',
    popularity: 40,
    homepage: 'https://www.videostudiopro.com/',
    alternative_to: ''
  },
  {
    id: 'vegas-pro',
    name: 'VEGAS Pro',
    category: 'Design',
    description: 'Professional non-linear video editing software suite (formerly Sony VEGAS).',
    icon: 'vegas-pro-icon',
    linux_alternative: 'DaVinci Resolve / Kdenlive',
    popularity: 45,
    homepage: 'https://www.vegascreativesoftware.com/us/vegas-pro/',
    alternative_to: ''
  },
  {
    id: 'avid-media-composer',
    name: 'Avid Media Composer',
    category: 'Design',
    description: 'Industry-standard film and video non-linear editing system.',
    icon: 'avid-media-composer-icon',
    linux_alternative: 'DaVinci Resolve / Lightworks',
    popularity: 40,
    homepage: 'https://www.avid.com/media-composer',
    alternative_to: ''
  },
  {
    id: 'lightworks-editor',
    name: 'Lightworks',
    category: 'Design',
    description: 'Professional non-linear video editor used in high-profile movie editing.',
    icon: 'lightworks-editor-icon',
    linux_alternative: 'Native Linux Version / DaVinci Resolve / Kdenlive',
    popularity: 40,
    homepage: 'https://lwks.com/',
    alternative_to: ''
  },
  {
    id: 'pinnacle-studio',
    name: 'Pinnacle Studio',
    category: 'Design',
    description: 'Consumer video editing software package by Corel.',
    icon: 'pinnacle-studio-icon',
    linux_alternative: 'Kdenlive / Shotcut',
    popularity: 40,
    homepage: 'https://www.pinnaclesys.com/',
    alternative_to: ''
  },
  {
    id: 'cyberlink-powerdirector',
    name: 'CyberLink PowerDirector',
    category: 'Design',
    description: 'High-speed video editing software program for video enthusiasts.',
    icon: 'cyberlink-powerdirector-icon',
    linux_alternative: 'Kdenlive / Shotcut / DaVinci Resolve',
    popularity: 40,
    homepage: 'https://www.cyberlink.com/products/powerdirector-video-editing-software/overview.html',
    alternative_to: ''
  },
  {
    id: 'cyberlink-powerdvd',
    name: 'CyberLink PowerDVD',
    category: 'Audio',
    description: 'Universal media player for movie discs, video files, photos and music.',
    icon: 'cyberlink-powerdvd-icon',
    linux_alternative: 'VLC Media Player / MPV',
    popularity: 40,
    homepage: 'https://www.cyberlink.com/products/powerdvd-ultra/features.html',
    alternative_to: ''
  },

  // Utilities
  {
    id: 'winzip-self-extractor',
    name: 'WinZip Self-Extractor',
    category: 'Utilities',
    description: 'Companion tool to create self-extracting zip archive files.',
    icon: 'winzip-self-extractor-icon',
    linux_alternative: 'Ark / PeaZip',
    popularity: 35,
    homepage: 'https://www.winzip.com/en/product/self-extractor/',
    alternative_to: ''
  },
  {
    id: 'winimage-tool',
    name: 'WinImage',
    category: 'Utilities',
    description: 'Disk image utility for floppy and hard disks, including FAT, NTFS, and ISO formats.',
    icon: 'winimage-tool-icon',
    linux_alternative: 'dd (CLI) / GNOME Disks',
    popularity: 35,
    homepage: 'http://www.winimage.com/',
    alternative_to: ''
  },
  {
    id: 'isobuster-recovery',
    name: 'IsoBuster',
    category: 'Utilities',
    description: 'Specialized data recovery software for CD, DVD, BD, hard drives, and USB sticks.',
    icon: 'isobuster-recovery-icon',
    linux_alternative: 'TestDisk / PhotoRec / ddrescue (CLI)',
    popularity: 35,
    homepage: 'https://www.isobuster.com/',
    alternative_to: ''
  },
  {
    id: 'recuva-recovery',
    name: 'Recuva',
    category: 'Utilities',
    description: 'Popular freeware data recovery program that restores deleted files.',
    icon: 'recuva-recovery-icon',
    linux_alternative: 'TestDisk / PhotoRec',
    popularity: 45,
    homepage: 'https://www.ccleaner.com/recuva',
    alternative_to: ''
  },
  {
    id: 'active-partition-recovery',
    name: 'Active@ Partition Recovery',
    category: 'Utilities',
    description: 'Software tool that helps to recover deleted or damaged partitions.',
    icon: 'active-partition-recovery-icon',
    linux_alternative: 'TestDisk / GParted',
    popularity: 35,
    homepage: 'https://www.partition-recovery.com/',
    alternative_to: ''
  },
  {
    id: 'easeus-data-recovery',
    name: 'EaseUS Data Recovery Wizard',
    category: 'Utilities',
    description: 'All-in-one data recovery software to retrieve deleted files and formatted partitions.',
    icon: 'easeus-data-recovery-icon',
    linux_alternative: 'TestDisk / PhotoRec',
    popularity: 40,
    homepage: 'https://www.easeus.com/datarecoverywizard/',
    alternative_to: ''
  },
  {
    id: 'minitool-power-data',
    name: 'MiniTool Power Data Recovery',
    category: 'Utilities',
    description: 'Comprehensive file recovery software for Windows and external storage devices.',
    icon: 'minitool-power-data-icon',
    linux_alternative: 'TestDisk / PhotoRec',
    popularity: 40,
    homepage: 'https://www.minitool.com/data-recovery-software/free-for-windows.html',
    alternative_to: ''
  },
  {
    id: 'disk-drill-recovery',
    name: 'Disk Drill',
    category: 'Utilities',
    description: 'Professional data recovery software designed to restore lost files on multiple devices.',
    icon: 'disk-drill-recovery-icon',
    linux_alternative: 'TestDisk / PhotoRec',
    popularity: 40,
    homepage: 'https://www.cleverfiles.com/',
    alternative_to: ''
  },
  {
    id: 'stellar-data-recovery',
    name: 'Stellar Data Recovery',
    category: 'Utilities',
    description: 'Complete DIY software tool to recover deleted files, photos, videos, and partitions.',
    icon: 'stellar-data-recovery-icon',
    linux_alternative: 'TestDisk / PhotoRec',
    popularity: 40,
    homepage: 'https://www.stellarinfo.com/',
    alternative_to: ''
  },
  {
    id: 'glary-utilities-pro',
    name: 'Glary Utilities',
    category: 'Utilities',
    description: 'Registry cleaner, system optimizer, and disk speedup tool collection.',
    icon: 'glary-utilities-pro-icon',
    linux_alternative: 'Stacer / BleachBit',
    popularity: 40,
    homepage: 'https://www.glarysoft.com/',
    alternative_to: ''
  },
  {
    id: 'wisecare-365',
    name: 'Wise Care 365',
    category: 'Utilities',
    description: 'PC cleaning and speedup tool that offers registry cleaner and disk cleaner features.',
    icon: 'wisecare-365-icon',
    linux_alternative: 'Stacer / BleachBit',
    popularity: 40,
    homepage: 'https://www.wisecleaner.com/wise-care-365.html',
    alternative_to: ''
  },
  {
    id: 'system-mechanic',
    name: 'System Mechanic',
    category: 'Utilities',
    description: 'System optimization software designed to speed up, repair, and secure PC systems.',
    icon: 'system-mechanic-icon',
    linux_alternative: 'Stacer',
    popularity: 40,
    homepage: 'https://www.iolo.com/products/system-mechanic/',
    alternative_to: ''
  },
  {
    id: 'iobit-advanced-systemcare',
    name: 'Advanced SystemCare',
    category: 'Utilities',
    description: 'All-in-one system optimizer, security guard, and registry repair tool.',
    icon: 'iobit-advanced-systemcare-icon',
    linux_alternative: 'Stacer / BleachBit',
    popularity: 40,
    homepage: 'https://www.iobit.com/en/advancedsystemcarefree.php',
    alternative_to: ''
  },
  {
    id: 'ashampoo-winoptimizer',
    name: 'Ashampoo WinOptimizer',
    category: 'Utilities',
    description: 'System cleaning, tweaking, and tune-up utility suite.',
    icon: 'ashampoo-winoptimizer-icon',
    linux_alternative: 'Stacer / GNOME Tweaks',
    popularity: 40,
    homepage: 'https://www.ashampoo.com/en-us/winoptimizer',
    alternative_to: ''
  },
  {
    id: 'auslogics-disk-defrag',
    name: 'Auslogics Disk Defrag',
    category: 'Utilities',
    description: 'Compact and fast defragger tool that supports FAT16/32 and NTFS filesystems.',
    icon: 'auslogics-disk-defrag-icon',
    linux_alternative: 'Not needed on Linux (standard filesystems like ext4/btrfs automatically avoid fragmentation)',
    popularity: 35,
    homepage: 'https://www.auslogics.com/en/software/disk-defrag/',
    alternative_to: ''
  },
  {
    id: 'smart-defrag-iobit',
    name: 'Smart Defrag',
    category: 'Utilities',
    description: 'Safe and stable disk defragmenter program by IObit.',
    icon: 'smart-defrag-iobit-icon',
    linux_alternative: 'Not needed on Linux',
    popularity: 35,
    homepage: 'https://www.iobit.com/en/iobitsmartdefrag.php',
    alternative_to: ''
  },
  {
    id: 'defraggler-ccleaner',
    name: 'Defraggler',
    category: 'Utilities',
    description: 'File and folder-level defragmentation software utility by Piriform.',
    icon: 'defraggler-ccleaner-icon',
    linux_alternative: 'Not needed on Linux',
    popularity: 35,
    homepage: 'https://www.ccleaner.com/defraggler',
    alternative_to: ''
  },
  {
    id: 'iobit-driver-booster',
    name: 'Driver Booster',
    category: 'Utilities',
    description: 'Automatic driver updater tool to keep hardware drivers up to date.',
    icon: 'iobit-driver-booster-icon',
    linux_alternative: 'Not needed on Linux (hardware support is built into the kernel and updated automatically)',
    popularity: 40,
    homepage: 'https://www.iobit.com/en/driver-booster.php',
    alternative_to: ''
  },
  {
    id: 'ashampoo-driver-updater',
    name: 'Ashampoo Driver Updater',
    category: 'Utilities',
    description: 'Database driver updater utility for finding and installing missing system drivers.',
    icon: 'ashampoo-driver-updater-icon',
    linux_alternative: 'Not needed on Linux (drivers are bundled in the Linux kernel)',
    popularity: 35,
    homepage: 'https://www.ashampoo.com/en-us/driver-updater',
    alternative_to: ''
  },
  {
    id: 'driver-easy',
    name: 'Driver Easy',
    category: 'Utilities',
    description: 'Tool that scans your computer and downloads missing or outdated drivers.',
    icon: 'driver-easy-icon',
    linux_alternative: 'Not needed on Linux',
    popularity: 35,
    homepage: 'https://www.drivereasy.com/',
    alternative_to: ''
  },
  {
    id: 'driver-genius',
    name: 'Driver Genius',
    category: 'Utilities',
    description: 'Professional driver management tool that backs up, restores, and updates drivers.',
    icon: 'driver-genius-icon',
    linux_alternative: 'Not needed on Linux',
    popularity: 35,
    homepage: 'https://www.driversoft.com/',
    alternative_to: ''
  },

  // Security
  {
    id: 'bitdefender-antivirus',
    name: 'Bitdefender Antivirus',
    category: 'Utilities',
    description: 'High-quality anti-malware and security suite for Windows.',
    icon: 'bitdefender-antivirus-icon',
    linux_alternative: 'ClamAV / Firejail sandbox / UFW / Not needed (Linux security model does not require active scanners)',
    popularity: 45,
    homepage: 'https://www.bitdefender.com/',
    alternative_to: ''
  },
  {
    id: 'norton-360',
    name: 'Norton 360',
    category: 'Utilities',
    description: 'Comprehensive antivirus, firewall, and device security package.',
    icon: 'norton-360-icon',
    linux_alternative: 'ClamAV / Not needed on Linux',
    popularity: 45,
    homepage: 'https://us.norton.com/',
    alternative_to: ''
  },
  {
    id: 'mcafee-total-protection',
    name: 'McAfee Total Protection',
    category: 'Utilities',
    description: 'Desktop virus scanner, safe browsing tool, and personal firewall.',
    icon: 'mcafee-total-protection-icon',
    linux_alternative: 'ClamAV / Not needed',
    popularity: 40,
    homepage: 'https://www.mcafee.com/',
    alternative_to: ''
  },
  {
    id: 'webroot-secureanywhere',
    name: 'Webroot SecureAnywhere',
    category: 'Utilities',
    description: 'Extremely lightweight cloud-based endpoint security and antivirus program.',
    icon: 'webroot-secureanywhere-icon',
    linux_alternative: 'ClamAV / Not needed',
    popularity: 35,
    homepage: 'https://www.webroot.com/',
    alternative_to: ''
  },
  {
    id: 'trend-micro-antivirus',
    name: 'Trend Micro Antivirus',
    category: 'Utilities',
    description: 'Smart security client offering ransomware protection and safe web filters.',
    icon: 'trend-micro-antivirus-icon',
    linux_alternative: 'ClamAV / Not needed',
    popularity: 35,
    homepage: 'https://www.trendmicro.com/',
    alternative_to: ''
  },
  {
    id: 'eset-nod32',
    name: 'ESET NOD32 Antivirus',
    category: 'Utilities',
    description: 'Award-winning security scanner for malware prevention on Windows.',
    icon: 'eset-nod32-icon',
    linux_alternative: 'ESET NOD32 Antivirus for Linux (Native version) / ClamAV',
    popularity: 45,
    homepage: 'https://www.eset.com/',
    alternative_to: ''
  },
  {
    id: 'f-secure-antivirus',
    name: 'F-Secure Antivirus',
    category: 'Utilities',
    description: 'Robust computer security and privacy protection software suite.',
    icon: 'f-secure-antivirus-icon',
    linux_alternative: 'ClamAV / Not needed',
    popularity: 35,
    homepage: 'https://www.f-secure.com/',
    alternative_to: ''
  },
  {
    id: 'sophos-home',
    name: 'Sophos Home',
    category: 'Utilities',
    description: 'Business-grade cybersecurity protection client for home computers.',
    icon: 'sophos-home-icon',
    linux_alternative: 'ClamAV / Sophos Antivirus for Linux (Native version)',
    popularity: 35,
    homepage: 'https://home.sophos.com/',
    alternative_to: ''
  },
  {
    id: 'comodo-antivirus',
    name: 'Comodo Antivirus',
    category: 'Utilities',
    description: 'Free antivirus scanner featuring sandboxing and host intrusion prevention.',
    icon: 'comodo-antivirus-icon',
    linux_alternative: 'Comodo Antivirus for Linux (Native version) / ClamAV',
    popularity: 35,
    homepage: 'https://www.comodo.com/',
    alternative_to: ''
  },
  {
    id: 'avg-antivirus',
    name: 'AVG Antivirus',
    category: 'Utilities',
    description: 'Popular free antivirus scanner and computer optimizer.',
    icon: 'avg-antivirus-icon',
    linux_alternative: 'ClamAV / Not needed',
    popularity: 40,
    homepage: 'https://www.avg.com/',
    alternative_to: ''
  },
  {
    id: 'avira-antivirus',
    name: 'Avira Antivirus',
    category: 'Utilities',
    description: 'Free security client featuring malware scanner and safe search extension.',
    icon: 'avira-antivirus-icon',
    linux_alternative: 'ClamAV / Not needed',
    popularity: 40,
    homepage: 'https://www.avira.com/',
    alternative_to: ''
  },
  {
    id: 'zonealarm-firewall',
    name: 'ZoneAlarm Free Firewall',
    category: 'Utilities',
    description: 'Standard personal firewall utility that blocks malware and hacker connections.',
    icon: 'zonealarm-firewall-icon',
    linux_alternative: 'UFW (Uncomplicated Firewall) / GUFW / Firewalld',
    popularity: 35,
    homepage: 'https://www.zonealarm.com/',
    alternative_to: ''
  },
  {
    id: 'glasswire-firewall',
    name: 'GlassWire',
    category: 'Utilities',
    description: 'Beautiful visual network monitor and personal firewall tool.',
    icon: 'glasswire-firewall-icon',
    linux_alternative: 'OpenSnitch / Portmaster',
    popularity: 40,
    homepage: 'https://www.glasswire.com/',
    alternative_to: ''
  },
  {
    id: 'safing-portmaster',
    name: 'Portmaster (Safing)',
    category: 'Utilities',
    description: 'Privacy application that monitors, controls, and blocks network connections on your system.',
    icon: 'safing-portmaster-icon',
    linux_alternative: 'Native Linux Version|flathub:cc.safing.portmaster / OpenSnitch',
    popularity: 40,
    homepage: 'https://safing.io/',
    alternative_to: ''
  },
  {
    id: 'opensnitch-firewall',
    name: 'OpenSnitch',
    category: 'Utilities',
    description: 'GNU/Linux port of Little Snitch application firewall.',
    icon: 'opensnitch-firewall-icon',
    linux_alternative: 'Native Linux Version / GlassWire',
    popularity: 40,
    homepage: 'https://github.com/evilsocket/opensnitch',
    alternative_to: ''
  },

  // Bandwidth controls
  {
    id: 'netlimiter-network',
    name: 'NetLimiter',
    category: 'Utilities',
    description: 'Ultimate internet traffic control and monitoring tool designed for Windows.',
    icon: 'netlimiter-network-icon',
    linux_alternative: 'Trickle (CLI) / Wondershaper / Portmaster',
    popularity: 35,
    homepage: 'https://www.netlimiter.com/',
    alternative_to: ''
  },
  {
    id: 'du-meter',
    name: 'DU Meter',
    category: 'Utilities',
    description: 'Accurate real-time network bandwidth monitor and reporter.',
    icon: 'du-meter-icon',
    linux_alternative: 'System Monitoring Center / NetHogs / Knemo',
    popularity: 35,
    homepage: 'https://www.dumeter.com/',
    alternative_to: ''
  },
  {
    id: 'networx-monitor',
    name: 'NetWorx',
    category: 'Utilities',
    description: 'Simple and versatile tool to measure and report internet speed and bandwidth consumption.',
    icon: 'networx-monitor-icon',
    linux_alternative: 'vnStat (CLI) / System Monitoring Center',
    popularity: 35,
    homepage: 'https://www.softperfect.com/products/networx/',
    alternative_to: ''
  },

  // Network diagnostics
  {
    id: 'angry-ip-scanner',
    name: 'Angry IP Scanner',
    category: 'Utilities',
    description: 'Fast and friendly network scanner that pings and scans ports on IP ranges.',
    icon: 'angry-ip-scanner-icon',
    linux_alternative: 'Native Linux Version|flathub:org.angryziber.ipscan / Nmap (CLI)',
    popularity: 40,
    homepage: 'https://angryip.org/',
    alternative_to: ''
  },
  {
    id: 'zenmap-nmap',
    name: 'Zenmap',
    category: 'Utilities',
    description: 'Official graphical user interface for the Nmap Security Scanner.',
    icon: 'zenmap-nmap-icon',
    linux_alternative: 'Native Linux Version / Nmap (CLI)',
    popularity: 40,
    homepage: 'https://nmap.org/zenmap/',
    alternative_to: ''
  },

  // SSH / Terminal
  {
    id: 'putty-ssh',
    name: 'PuTTY',
    category: 'Development',
    description: 'Free SSH, Telnet, and serial terminal client.',
    icon: 'putty-ssh-icon',
    linux_alternative: 'Native Linux Version (PuTTY is native to Linux) / GNOME Terminal / SSH (CLI)',
    popularity: 45,
    homepage: 'https://www.putty.org/',
    alternative_to: ''
  },
  {
    id: 'securecrt',
    name: 'SecureCRT',
    category: 'Development',
    description: 'Professional GUI terminal emulator, SSH, and Telnet client.',
    icon: 'securecrt-icon',
    linux_alternative: 'Native Linux Version (official Linux installer) / Remmina / GNOME Terminal',
    popularity: 35,
    homepage: 'https://www.vandyke.com/products/securecrt/',
    alternative_to: ''
  },
  {
    id: 'kitty-ssh',
    name: 'KiTTY',
    category: 'Development',
    description: 'Fork of PuTTY with automatic password, filters, and portability features.',
    icon: 'kitty-ssh-icon',
    linux_alternative: 'PuTTY / Remmina / GNOME Terminal',
    popularity: 35,
    homepage: 'http://www.9bis.net/kitty/',
    alternative_to: ''
  },
  {
    id: 'superputty',
    name: 'SuperPutty',
    category: 'Development',
    description: 'Tabbed window manager wrapper for the PuTTY SSH client.',
    icon: 'superputty-icon',
    linux_alternative: 'Remmina / GNOME Terminal / Asbru Connection Manager',
    popularity: 30,
    homepage: 'https://github.com/jimradford/superputty',
    alternative_to: ''
  },
  {
    id: 'asbru-connection',
    name: 'Ásbrú Connection Manager',
    category: 'Development',
    description: 'User interface to organize and launch remote terminal connections.',
    icon: 'asbru-connection-icon',
    linux_alternative: 'Native Linux Version / Remmina',
    popularity: 35,
    homepage: 'https://www.asbru.dfm.unito.it/',
    alternative_to: ''
  },
  {
    id: 'xshell-terminal',
    name: 'Xshell',
    category: 'Development',
    description: 'Industry-leading SSH, SFTP, and terminal emulator for Windows.',
    icon: 'xshell-terminal-icon',
    linux_alternative: 'Remmina / GNOME Terminal',
    popularity: 35,
    homepage: 'https://www.netsarang.com/en/xshell/',
    alternative_to: ''
  },
  {
    id: 'mobaxterm-home',
    name: 'MobaXterm Home Edition',
    category: 'Development',
    description: 'Remote networking tool featuring tabbed terminal and built-in server connections.',
    icon: 'mobaxterm-home-icon',
    linux_alternative: 'Remmina / GNOME Terminal / Asbru',
    popularity: 40,
    homepage: 'https://mobaxterm.mobatek.net/',
    alternative_to: ''
  },

  // Remote desktop / VNC
  {
    id: 'vnc-viewer',
    name: 'RealVNC Viewer',
    category: 'Utilities',
    description: 'Remote control software viewer client supporting cloud connectivity.',
    icon: 'vnc-viewer-icon',
    linux_alternative: 'Native Linux Version (RealVNC Viewer has official Linux builds) / Remmina',
    popularity: 40,
    homepage: 'https://www.realvnc.com/en/connect/download/viewer/',
    alternative_to: ''
  },
  {
    id: 'vnc-server',
    name: 'RealVNC Server',
    category: 'Utilities',
    description: 'Remote desktop server component allowing computers to be controlled remotely.',
    icon: 'vnc-server-icon',
    linux_alternative: 'TigerVNC / WayVNC / Vino',
    popularity: 35,
    homepage: 'https://www.realvnc.com/en/connect/download/vnc/',
    alternative_to: ''
  },
  {
    id: 'tightvnc-viewer',
    name: 'TightVNC',
    category: 'Utilities',
    description: 'Free lightweight remote desktop control software package.',
    icon: 'tightvnc-viewer-icon',
    linux_alternative: 'Remmina / TigerVNC',
    popularity: 35,
    homepage: 'https://www.tightvnc.com/',
    alternative_to: ''
  },
  {
    id: 'ultravnc-viewer',
    name: 'UltraVNC',
    category: 'Utilities',
    description: 'Powerful remote control software designed specifically for Windows.',
    icon: 'ultravnc-viewer-icon',
    linux_alternative: 'Remmina / TigerVNC',
    popularity: 35,
    homepage: 'https://www.uvnc.com/',
    alternative_to: ''
  },
  {
    id: 'rustdesk-client',
    name: 'RustDesk',
    category: 'Utilities',
    description: 'Open-source remote desktop client designed as self-hosted TeamViewer alternative.',
    icon: 'rustdesk-client-icon',
    linux_alternative: 'Native Linux Version|flathub:com.rustdesk.RustDesk',
    popularity: 40,
    homepage: 'https://rustdesk.com/',
    alternative_to: ''
  },
  {
    id: 'anydesk-client',
    name: 'AnyDesk',
    category: 'Utilities',
    description: 'Proprietary remote desktop application facilitating bidirectional file transfer.',
    icon: 'anydesk-client-icon',
    linux_alternative: 'Native Linux Version (official AnyDesk Linux package) / RustDesk',
    popularity: 40,
    homepage: 'https://anydesk.com/',
    alternative_to: ''
  },
  {
    id: 'chrome-remote-desktop',
    name: 'Chrome Remote Desktop',
    category: 'Utilities',
    description: 'Remote desktop access service built by Google using Chrome browser protocols.',
    icon: 'chrome-remote-desktop-icon',
    linux_alternative: 'Chrome Remote Desktop Web Client / Remmina',
    popularity: 40,
    homepage: 'https://remotedesktop.google.com/',
    alternative_to: ''
  },
  {
    id: 'parsec-gaming',
    name: 'Parsec',
    category: 'Games',
    description: 'High performance, low-latency remote desktop software optimized for cloud gaming and remote work.',
    icon: 'parsec-gaming-icon',
    linux_alternative: 'Native Linux Version (official Flatpak/package) / Moonlight / Sunshine',
    popularity: 40,
    homepage: 'https://parsec.app/',
    alternative_to: ''
  },
  {
    id: 'moonlight-qt',
    name: 'Moonlight Game Streaming',
    category: 'Games',
    description: 'Open source NVIDIA GameStream client for streaming PC games.',
    icon: 'moonlight-qt-icon',
    linux_alternative: 'Native Linux Version|flathub:com.limelight_stream.Moonlight',
    popularity: 45,
    homepage: 'https://moonlight-stream.org/',
    alternative_to: ''
  },
  {
    id: 'sunshine-server',
    name: 'Sunshine',
    category: 'Games',
    description: 'Self-hosted game stream host server for Moonlight.',
    icon: 'sunshine-server-icon',
    linux_alternative: 'Native Linux Version|flathub:app.showcase.Sunshine',
    popularity: 45,
    homepage: 'https://app.showcase.sunshine/',
    alternative_to: ''
  },
  {
    id: 'wiztree-analyzer',
    name: 'WizTree',
    category: 'Utilities',
    description: 'Extremely fast disk space analyzer that reads directly from the NTFS MFT file.',
    icon: 'wiztree-analyzer-icon',
    linux_alternative: 'Filelight / QDirStat / Baobab (Disk Usage Analyzer)',
    popularity: 40,
    homepage: 'https://diskanalyzer.com/',
    alternative_to: ''
  },

  // Additional apps for batch 5 to ensure 100 unique ones
  {
    id: 'visual-studio-enterprise',
    name: 'Visual Studio Enterprise',
    category: 'Development',
    description: 'Premium, end-to-end development solution for teams of any size to design and build apps.',
    icon: 'visual-studio-enterprise-icon',
    linux_alternative: 'Rider / VS Code',
    popularity: 40,
    homepage: 'https://visualstudio.microsoft.com/vs/enterprise/',
    alternative_to: ''
  },
  {
    id: 'tortoisesvn',
    name: 'TortoiseSVN',
    category: 'Development',
    description: 'Easy-to-use Subversion (SVN) client for Windows, implemented as a shell extension.',
    icon: 'tortoisesvn-icon',
    linux_alternative: 'RabbitVCS / GitKraken / SmartGit',
    popularity: 40,
    homepage: 'https://tortoisesvn.net/',
    alternative_to: ''
  },
  {
    id: 'tortoisegit-client',
    name: 'TortoiseGit',
    category: 'Development',
    description: 'Windows shell interface to Git, based on TortoiseSVN.',
    icon: 'tortoisegit-client-icon',
    linux_alternative: 'RabbitVCS / GitKraken / SmartGit',
    popularity: 40,
    homepage: 'https://tortoisegit.org/',
    alternative_to: ''
  },
  {
    id: 'sublime-merge',
    name: 'Sublime Merge',
    category: 'Development',
    description: 'Fast, lightweight Git client developed by the makers of Sublime Text.',
    icon: 'sublime-merge-icon',
    linux_alternative: 'Native Linux Version / GitKraken / lazygit',
    popularity: 45,
    homepage: 'https://www.sublimemerge.com/',
    alternative_to: ''
  },
  {
    id: 'gitea-server',
    name: 'Gitea',
    category: 'Development',
    description: 'Painless self-hosted Git service written in Go.',
    icon: 'gitea-server-icon',
    linux_alternative: 'Native Linux Version|flathub:io.gitea.Gitea / GitLab / GitHub',
    popularity: 45,
    homepage: 'https://gitea.com/',
    alternative_to: ''
  },
  {
    id: 'gogs-server',
    name: 'Gogs',
    category: 'Development',
    description: 'Extremely painless self-hosted Git service.',
    icon: 'gogs-server-icon',
    linux_alternative: 'Native Linux Version / Gitea',
    popularity: 40,
    homepage: 'https://gogs.io/',
    alternative_to: ''
  },
  {
    id: 'hbuilderx',
    name: 'HBuilderX',
    category: 'Development',
    description: 'Next-generation developer IDE optimized for Vue, HTML5, and mobile web app development.',
    icon: 'hbuilderx-icon',
    linux_alternative: 'Native Linux Version / VS Code',
    popularity: 40,
    homepage: 'https://www.dcloud.io/hbuilderx.html',
    alternative_to: ''
  },
  {
    id: 'cocos-creator',
    name: 'Cocos Creator',
    category: 'Development',
    description: 'Complete package of game development tools and workflow.',
    icon: 'cocos-creator-icon',
    linux_alternative: 'Native Linux Version / Godot / Unity',
    popularity: 40,
    homepage: 'https://www.cocos.com/en/creator',
    alternative_to: ''
  },
  {
    id: 'rpg-maker-mv',
    name: 'RPG Maker MV',
    category: 'Development',
    description: 'Game construction engine for retro RPG games.',
    icon: 'rpg-maker-mv-icon',
    linux_alternative: 'Native Linux Version (MV runs natively on Linux)',
    popularity: 40,
    homepage: 'https://www.rpgmakerweb.com/products/rpg-maker-mv',
    alternative_to: ''
  },
  {
    id: 'renpy-engine',
    name: 'Ren\'Py',
    category: 'Development',
    description: 'Visual novel engine that helps you use words, images, and sounds to tell interactive stories.',
    icon: 'renpy-engine-icon',
    linux_alternative: 'Native Linux Version (Ren\'Py is written in Python and runs natively)',
    popularity: 40,
    homepage: 'https://www.renpy.org/',
    alternative_to: ''
  },
  {
    id: 'twine-tool',
    name: 'Twine',
    category: 'Development',
    description: 'Open-source tool for telling interactive, nonlinear stories.',
    icon: 'twine-tool-icon',
    linux_alternative: 'Native Linux Version|flathub:org.twinery.Twine',
    popularity: 40,
    homepage: 'https://twinery.org/',
    alternative_to: ''
  },
  {
    id: 'lightshot-screenshot',
    name: 'Lightshot',
    category: 'Utilities',
    description: 'Easy-to-use screenshot tool that lets you capture, edit, and upload screenshots instantly.',
    icon: 'lightshot-screenshot-icon',
    linux_alternative: 'Flameshot / Spectacle / GNOME Screenshot',
    popularity: 45,
    homepage: 'https://app.prntscr.com/',
    alternative_to: ''
  },
  {
    id: 'sharex-screenshot',
    name: 'ShareX',
    category: 'Utilities',
    description: 'Extremely feature-rich open-source screenshot, screen capture, file sharing and productivity tool.',
    icon: 'sharex-screenshot-icon',
    linux_alternative: 'Flameshot / Ksnip / GreenShot via Wine',
    popularity: 45,
    homepage: 'https://getsharex.com/',
    alternative_to: ''
  },
  {
    id: 'greenshot-screenshot',
    name: 'Greenshot',
    category: 'Utilities',
    description: 'Light-weight screenshot software tool for Windows optimized for productivity.',
    icon: 'greenshot-screenshot-icon',
    linux_alternative: 'Flameshot / Ksnip',
    popularity: 45,
    homepage: 'https://getgreenshot.org/',
    alternative_to: ''
  },
  {
    id: 'flameshot-screenshot',
    name: 'Flameshot',
    category: 'Utilities',
    description: 'Powerful open-source screenshot and annotation software.',
    icon: 'flameshot-screenshot-icon',
    linux_alternative: 'Native Linux Version|flathub:org.flameshot.Flameshot',
    popularity: 45,
    homepage: 'https://flameshot.org/',
    alternative_to: ''
  }
];

const existing = db.prepare('SELECT id, name FROM apps').all();
const existingIds = new Set(existing.map(row => row.id.toLowerCase()));
const existingNames = new Set(existing.map(row => row.name.toLowerCase()));

const filteredApps = newApps.filter(app => {
  return !existingIds.has(app.id.toLowerCase()) && !existingNames.has(app.name.toLowerCase());
});

console.log(`Loaded ${existing.length} existing apps.`);
console.log(`Found ${filteredApps.length} unique candidates after filtering duplicates.`);

if (filteredApps.length < 100) {
  console.error(`Error: Only ${filteredApps.length} unique apps are available to insert, but we need exactly 100! Please add more candidates.`);
  process.exit(1);
}

const finalApps = filteredApps.slice(0, 100);
console.log(`Inserting exactly ${finalApps.length} new apps...`);

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

transaction(finalApps);
console.log(`Successfully inserted/replaced ${inserted} apps in the local SQLite database!`);
db.close();
