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
    id: 'easeus-todobackup',
    name: 'EaseUS Todo Backup',
    category: 'Utilities',
    description: 'Free/Commercial backup and disk cloning software for Windows.',
    icon: 'easeus-todobackup-icon',
    linux_alternative: 'Rescuezilla / Clonezilla / Timeshift',
    popularity: 20,
    homepage: 'https://www.easeus.com/backup-software/',
    alternative_to: ''
  },
  {
    id: 'veeam-agent-windows',
    name: 'Veeam Agent for Windows',
    category: 'Utilities',
    description: 'Enterprise-grade backup agent for Windows servers and workstations.',
    icon: 'veeam-agent-windows-icon',
    linux_alternative: 'UrBackup / Vorta / BorgBackup',
    popularity: 25,
    homepage: 'https://www.veeam.com/',
    alternative_to: ''
  },
  {
    id: 'minitool-partition-wizard',
    name: 'MiniTool Partition Wizard',
    category: 'Utilities',
    description: 'Popular disk partition manager and analyzer.',
    icon: 'minitool-partition-wizard-icon',
    linux_alternative: 'GParted / GNOME Disks',
    popularity: 35,
    homepage: 'https://www.partitionwizard.com/',
    alternative_to: ''
  },
  {
    id: 'easeus-partition-master',
    name: 'EaseUS Partition Master',
    category: 'Utilities',
    description: 'All-in-one partition manager and disk space analyzer.',
    icon: 'easeus-partition-master-icon',
    linux_alternative: 'GParted / GNOME Disks',
    popularity: 30,
    homepage: 'https://www.easeus.com/partition-manager/',
    alternative_to: ''
  },
  {
    id: 'paragon-partition-manager',
    name: 'Paragon Partition Manager',
    category: 'Utilities',
    description: 'Advanced disk partitioning and drive copying tool.',
    icon: 'paragon-partition-manager-icon',
    linux_alternative: 'GParted / GNOME Disks',
    popularity: 25,
    homepage: 'https://www.paragon-software.com/free/pm-express/',
    alternative_to: ''
  },
  {
    id: 'sandboxie-plus',
    name: 'Sandboxie-Plus',
    category: 'Utilities',
    description: 'Open-source sandbox isolation software that runs applications securely.',
    icon: 'sandboxie-plus-icon',
    linux_alternative: 'Firejail / Bubblewrap / Flatpak sandbox',
    popularity: 30,
    homepage: 'https://sandboxie-plus.com/',
    alternative_to: ''
  },
  {
    id: 'sysinternals-processexplorer',
    name: 'Process Explorer',
    category: 'Utilities',
    description: 'Sysinternals advanced process viewer and system diagnostics tool.',
    icon: 'sysinternals-processexplorer-icon',
    linux_alternative: 'System Monitoring Center / HTOP / QPS',
    popularity: 45,
    homepage: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer',
    alternative_to: ''
  },
  {
    id: 'sysinternals-autoruns',
    name: 'Autoruns',
    category: 'Utilities',
    description: 'Sysinternals autostart entry manager showing what programs boot.',
    icon: 'sysinternals-autoruns-icon',
    linux_alternative: 'Stacer / GNOME Session Properties / systemctl (CLI)',
    popularity: 40,
    homepage: 'https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns',
    alternative_to: ''
  },
  {
    id: 'sysinternals-tcpview',
    name: 'TCPView',
    category: 'Utilities',
    description: 'Sysinternals network socket and connection monitoring tool.',
    icon: 'sysinternals-tcpview-icon',
    linux_alternative: 'OpenSnitch / Netstat / SS (CLI)',
    popularity: 35,
    homepage: 'https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview',
    alternative_to: ''
  },
  {
    id: 'sysinternals-procmon',
    name: 'Process Monitor',
    category: 'Utilities',
    description: 'Sysinternals real-time file system, registry and process monitoring tool.',
    icon: 'sysinternals-procmon-icon',
    linux_alternative: 'strace (CLI) / sysdig (CLI) / Auditd',
    popularity: 40,
    homepage: 'https://learn.microsoft.com/en-us/sysinternals/downloads/procmon',
    alternative_to: ''
  },
  {
    id: 'sysinternals-suite',
    name: 'Sysinternals Suite',
    category: 'Utilities',
    description: 'Complete bundle of Sysinternals troubleshooting utilities.',
    icon: 'sysinternals-suite-icon',
    linux_alternative: 'Natively supported by native Linux diagnostic tools (strace, htop, lsof, netstat)',
    popularity: 35,
    homepage: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysinternals-suite',
    alternative_to: ''
  },
  {
    id: 'driverpack-solution',
    name: 'DriverPack Solution',
    category: 'Utilities',
    description: 'Automated driver installation database utility.',
    icon: 'driverpack-solution-icon',
    linux_alternative: 'Not needed on Linux (drivers are built into the kernel and updated automatically)',
    popularity: 20,
    homepage: 'https://driverpack.io/',
    alternative_to: ''
  },
  {
    id: 'snappy-driver-installer',
    name: 'Snappy Driver Installer',
    category: 'Utilities',
    description: 'Portable driver updater for offline systems and technicians.',
    icon: 'snappy-driver-installer-icon',
    linux_alternative: 'Not needed on Linux (hardware support is built into the kernel)',
    popularity: 15,
    homepage: 'https://sdi-tool.org/',
    alternative_to: ''
  },
  {
    id: 'intel-driver-support-assistant',
    name: 'Intel Driver & Support Assistant',
    category: 'Utilities',
    description: 'Intel driver updater for graphic, wireless, and bluetooth chipsets.',
    icon: 'intel-driver-support-assistant-icon',
    linux_alternative: 'Not needed on Linux (Intel drivers are open-source and bundled in the kernel/mesa)',
    popularity: 30,
    homepage: 'https://www.intel.com/content/www/us/en/support/detect.html',
    alternative_to: ''
  },
  {
    id: 'amd-software-adrenalin',
    name: 'AMD Software: Adrenalin Edition',
    category: 'Utilities',
    description: 'AMD GPU control panel, drivers and performance overclocking suite.',
    icon: 'amd-software-adrenalin-icon',
    linux_alternative: 'CoreCtrl / LACT (Linux AMD Controller) / Radeon Profile',
    popularity: 40,
    homepage: 'https://www.amd.com/en/technologies/software',
    alternative_to: ''
  },
  {
    id: 'nvidia-control-panel',
    name: 'NVIDIA Control Panel',
    category: 'Utilities',
    description: 'NVIDIA GPU settings and configuration panel.',
    icon: 'nvidia-control-panel-icon',
    linux_alternative: 'nvidia-settings (Native Linux Version)',
    popularity: 45,
    homepage: 'https://www.nvidia.com/',
    alternative_to: ''
  },
  {
    id: 'quick-cpu',
    name: 'Quick CPU',
    category: 'Utilities',
    description: 'CPU performance tuning, core parking, and frequency scaling tool.',
    icon: 'quick-cpu-icon',
    linux_alternative: 'TLP / CPU Power Manager / CoreCtrl',
    popularity: 25,
    homepage: 'https://coderbag.com/product/quick-cpu',
    alternative_to: ''
  },
  {
    id: 'lively-wallpaper',
    name: 'Lively Wallpaper',
    category: 'Utilities',
    description: 'Animated, video, and interactive desktop wallpaper manager.',
    icon: 'lively-wallpaper-icon',
    linux_alternative: 'Komorebi / Hanabi / Kvantum / KDE Plasma Video Wallpaper',
    popularity: 35,
    homepage: 'https://rocksdanister.github.io/lively/',
    alternative_to: ''
  },
  {
    id: 'wallpaper-engine',
    name: 'Wallpaper Engine',
    category: 'Utilities',
    description: 'Steam-based live interactive wallpaper loader and creator.',
    icon: 'wallpaper-engine-icon',
    linux_alternative: 'Komorebi / Wallpaper Engine KDE plugin (runs using Steam assets)',
    popularity: 50,
    homepage: 'https://www.wallpaperengine.io/',
    alternative_to: ''
  },
  {
    id: 'rainmeter',
    name: 'Rainmeter',
    category: 'Utilities',
    description: 'Desktop customization tool for displaying system meters and widgets.',
    icon: 'rainmeter-icon',
    linux_alternative: 'Conky / KDE Plasma Widgets',
    popularity: 45,
    homepage: 'https://www.rainmeter.net/',
    alternative_to: ''
  },
  {
    id: 'winaero-tweaker',
    name: 'Winaero Tweaker',
    category: 'Utilities',
    description: 'Windows UI customization and behavior tweaking software.',
    icon: 'winaero-tweaker-icon',
    linux_alternative: 'GNOME Tweaks / KDE System Settings',
    popularity: 35,
    homepage: 'https://winaero.com/winaero-tweaker/',
    alternative_to: ''
  },
  {
    id: 'ultimate-windows-tweaker',
    name: 'Ultimate Windows Tweaker',
    category: 'Utilities',
    description: 'Windows OS behavior and performance customizer.',
    icon: 'ultimate-windows-tweaker-icon',
    linux_alternative: 'GNOME Tweaks / KDE System Settings',
    popularity: 25,
    homepage: 'https://www.thewindowsclub.com/ultimate-windows-tweaker-4-windows-10',
    alternative_to: ''
  },
  {
    id: 'oo-shutup10',
    name: 'O&O ShutUp10++',
    category: 'Utilities',
    description: 'Windows 10/11 privacy, security, and telemetry blocker.',
    icon: 'oo-shutup10-icon',
    linux_alternative: 'Not needed on Linux (Linux has no built-in telemetry or user spying by default)',
    popularity: 40,
    homepage: 'https://www.oo-software.com/en/shutup10',
    alternative_to: ''
  },
  {
    id: 'win10spydisabler',
    name: 'Win10SpyDisabler',
    category: 'Utilities',
    description: 'Privacy optimizer and telemetry blocker for Windows systems.',
    icon: 'win10spydisabler-icon',
    linux_alternative: 'Not needed on Linux',
    popularity: 20,
    homepage: 'https://www.win10spydisabler.com/',
    alternative_to: ''
  },
  {
    id: 'win32-diskimager',
    name: 'Win32 Disk Imager',
    category: 'Utilities',
    description: 'Write raw disk images to USB thumb drives or SD cards.',
    icon: 'win32-diskimager-icon',
    linux_alternative: 'Ventoy / BalenaEtcher / dd (CLI)',
    popularity: 30,
    homepage: 'https://sourceforge.net/projects/win32diskimager/',
    alternative_to: ''
  },
  {
    id: 'hd-tune',
    name: 'HD Tune',
    category: 'Utilities',
    description: 'HDD/SSD health scanning, benchmarking, and diagnosis tool.',
    icon: 'hd-tune-icon',
    linux_alternative: 'GNOME Disks / GSmartControl / smartctl',
    popularity: 25,
    homepage: 'https://www.hdtune.com/',
    alternative_to: ''
  },
  {
    id: 'as-ssd-benchmark',
    name: 'AS SSD Benchmark',
    category: 'Utilities',
    description: 'SSD performance and transfer speed benchmark utility.',
    icon: 'as-ssd-benchmark-icon',
    linux_alternative: 'KDiskMark / GNOME Disks benchmark',
    popularity: 25,
    homepage: 'https://alex-is.de/',
    alternative_to: ''
  },
  {
    id: 'furmark',
    name: 'FurMark',
    category: 'Utilities',
    description: 'Intense GPU stress testing and OpenGL rendering benchmark.',
    icon: 'furmark-icon',
    linux_alternative: 'GpuTest / GeeXLab / Unigine benchmarks',
    popularity: 45,
    homepage: 'https://geeks3d.com/furmark/',
    alternative_to: ''
  },
  {
    id: 'prime95',
    name: 'Prime95',
    category: 'Utilities',
    description: 'CPU stress test utility used for benchmarking and prime number searches.',
    icon: 'prime95-icon',
    linux_alternative: 'Native Linux Version (mprime) / stress-ng (CLI)',
    popularity: 35,
    homepage: 'https://www.mersenne.org/download/',
    alternative_to: ''
  },
  {
    id: 'memtest86',
    name: 'MemTest86',
    category: 'Utilities',
    description: 'Stand-alone diagnostic boot-disk tool for testing RAM errors.',
    icon: 'memtest86-icon',
    linux_alternative: 'Native Linux Version (Memtest86+ in GRUB boot menu)',
    popularity: 45,
    homepage: 'https://www.memtest86.com/',
    alternative_to: ''
  },
  {
    id: 'cinebench',
    name: 'Cinebench',
    category: 'Utilities',
    description: 'CPU benchmarking software simulating 3D rendering tasks.',
    icon: 'cinebench-icon',
    linux_alternative: 'Cinebench (via Wine) / Blender Benchmark / Geekbench',
    popularity: 50,
    homepage: 'https://www.maxon.net/en/cinebench',
    alternative_to: ''
  },
  {
    id: '3dmark',
    name: '3DMark',
    category: 'Utilities',
    description: 'Leading gaming benchmark suite measuring GPU and CPU 3D processing capabilities.',
    icon: '3dmark-icon',
    linux_alternative: 'Unigine Superposition / Basemark GPU / Steam (via Proton)',
    popularity: 45,
    homepage: 'https://www.benchmarks.ul.com/3dmark',
    alternative_to: ''
  },
  {
    id: 'pcmark',
    name: 'PCMark',
    category: 'Utilities',
    description: 'System application and daily office-tasks hardware benchmark tool.',
    icon: 'pcmark-icon',
    linux_alternative: 'Phoronix Test Suite / Geekbench',
    popularity: 30,
    homepage: 'https://www.benchmarks.ul.com/pcmark10',
    alternative_to: ''
  },
  {
    id: 'unigine-heaven',
    name: 'Unigine Heaven Benchmark',
    category: 'Utilities',
    description: 'GPU stress testing tool featuring an interactive 3D fantasy world.',
    icon: 'unigine-heaven-icon',
    linux_alternative: 'Native Linux Version (Unigine Heaven)',
    popularity: 40,
    homepage: 'https://benchmark.unigine.com/heaven',
    alternative_to: ''
  },
  {
    id: 'unigine-valley',
    name: 'Unigine Valley Benchmark',
    category: 'Utilities',
    description: 'Interactive forest GPU stress test and benchmark.',
    icon: 'unigine-valley-icon',
    linux_alternative: 'Native Linux Version (Unigine Valley)',
    popularity: 35,
    homepage: 'https://benchmark.unigine.com/valley',
    alternative_to: ''
  },
  {
    id: 'unigine-superposition',
    name: 'Unigine Superposition Benchmark',
    category: 'Utilities',
    description: 'High-end photorealistic GPU stress testing and benchmark tool.',
    icon: 'unigine-superposition-icon',
    linux_alternative: 'Native Linux Version (Unigine Superposition)',
    popularity: 45,
    homepage: 'https://benchmark.unigine.com/superposition',
    alternative_to: ''
  },
  {
    id: 'wox-launcher',
    name: 'Wox',
    category: 'Utilities',
    description: 'Keystroke launcher for files and web searches on Windows.',
    icon: 'wox-launcher-icon',
    linux_alternative: 'Ulauncher / Albert / KRunner / Rofi',
    popularity: 30,
    homepage: 'https://github.com/Wox-launcher/Wox',
    alternative_to: ''
  },
  {
    id: 'keypirinha',
    name: 'Keypirinha',
    category: 'Utilities',
    description: 'Keyboard-centric fast launcher for tools and settings.',
    icon: 'keypirinha-icon',
    linux_alternative: 'Ulauncher / Albert / KRunner / Rofi',
    popularity: 25,
    homepage: 'https://keypirinha.com/',
    alternative_to: ''
  },
  {
    id: 'launchy',
    name: 'Launchy',
    category: 'Utilities',
    description: 'Classic open-source keyboard launcher utility.',
    icon: 'launchy-icon',
    linux_alternative: 'Native Linux Version / Ulauncher / Albert',
    popularity: 20,
    homepage: 'https://www.launchy.net/',
    alternative_to: ''
  },
  {
    id: 'foxit-reader',
    name: 'Foxit PDF Reader',
    category: 'Office',
    description: 'Fast, secure, and feature-rich PDF document viewer.',
    icon: 'foxit-reader-icon',
    linux_alternative: 'Native Linux Version (official Linux installer) / Okular / Evince',
    popularity: 45,
    homepage: 'https://www.foxit.com/pdf-reader/',
    alternative_to: ''
  },
  {
    id: 'pdfxchange-viewer',
    name: 'PDF-XChange Viewer',
    category: 'Office',
    description: 'PDF reader and editor with built-in OCR and annotation tools.',
    icon: 'pdfxchange-viewer-icon',
    linux_alternative: 'PDF-XChange Viewer (via Wine) / Okular / Master PDF Editor',
    popularity: 35,
    homepage: 'https://www.tracker-software.com/product/pdf-xchange-viewer',
    alternative_to: ''
  },
  {
    id: 'pdf24-creator',
    name: 'PDF24 Creator',
    category: 'Office',
    description: 'Desktop PDF editor to merge, split, compress, and sign documents.',
    icon: 'pdf24-creator-icon',
    linux_alternative: 'PDFArranger / Sejda PDF / PDF24 Web tools',
    popularity: 40,
    homepage: 'https://www.pdf24.org/',
    alternative_to: ''
  },
  {
    id: 'pdfsam',
    name: 'PDFsam (PDF Split and Merge)',
    category: 'Office',
    description: 'Desktop utility to split, merge, rotate, and mix PDF files.',
    icon: 'pdfsam-icon',
    linux_alternative: 'Native Linux Version|flathub:org.pdfsam.PDFsam / PDFArranger',
    popularity: 35,
    homepage: 'https://pdfsam.org/',
    alternative_to: ''
  },
  {
    id: 'sejda-pdf',
    name: 'Sejda PDF Desktop',
    category: 'Office',
    description: 'Comprehensive PDF manager, editor, and signer tool.',
    icon: 'sejda-pdf-icon',
    linux_alternative: 'Native Linux Version / PDFArranger / LibreOffice Draw',
    popularity: 30,
    homepage: 'https://www.sejda.com/desktop',
    alternative_to: ''
  },
  {
    id: 'soda-pdf',
    name: 'Soda PDF',
    category: 'Office',
    description: 'Modern PDF editor, creator, and conversion suite.',
    icon: 'soda-pdf-icon',
    linux_alternative: 'Soda PDF Web App / Master PDF Editor / Okular',
    popularity: 30,
    homepage: 'https://www.sodapdf.com/',
    alternative_to: ''
  },
  {
    id: 'wps-pdf',
    name: 'WPS PDF',
    category: 'Office',
    description: 'PDF viewer and editor included in the WPS Office utility.',
    icon: 'wps-pdf-icon',
    linux_alternative: 'Native Linux Version (bundled with WPS Office for Linux) / Okular',
    popularity: 35,
    homepage: 'https://www.wps.com/pdf/',
    alternative_to: ''
  },
  {
    id: 'pdf-architect',
    name: 'PDF Architect',
    category: 'Office',
    description: 'Customizable PDF editor featuring OCR and forms creation.',
    icon: 'pdf-architect-icon',
    linux_alternative: 'Master PDF Editor / Okular',
    popularity: 25,
    homepage: 'https://www.pdfforge.org/pdf-architect',
    alternative_to: ''
  },
  {
    id: 'mindmanager',
    name: 'MindManager',
    category: 'Office',
    description: 'Professional enterprise mind mapping and workflow diagramming software.',
    icon: 'mindmanager-icon',
    linux_alternative: 'Freeplane / XMind / MindMup (Web)',
    popularity: 30,
    homepage: 'https://www.mindmanager.com/',
    alternative_to: ''
  },
  {
    id: 'xmind',
    name: 'XMind',
    category: 'Office',
    description: 'Brainstorming and mind mapping program for project planning.',
    icon: 'xmind-icon',
    linux_alternative: 'Native Linux Version|flathub:net.xmind.XMind8 / Freeplane',
    popularity: 45,
    homepage: 'https://www.xmind.net/',
    alternative_to: ''
  },
  {
    id: 'freeplane',
    name: 'Freeplane',
    category: 'Office',
    description: 'Open-source Java-based mind mapping and concept organization app.',
    icon: 'freeplane-icon',
    linux_alternative: 'Native Linux Version|flathub:org.freeplane.App / XMind',
    popularity: 40,
    homepage: 'https://www.freeplane.org/',
    alternative_to: ''
  },
  {
    id: 'freemind',
    name: 'FreeMind',
    category: 'Office',
    description: 'Classic open-source mind mapping software using node trees.',
    icon: 'freemind-icon',
    linux_alternative: 'Native Linux Version / Freeplane',
    popularity: 30,
    homepage: 'http://freemind.sourceforge.net/',
    alternative_to: ''
  },
  {
    id: 'standard-notes',
    name: 'Standard Notes',
    category: 'Office',
    description: 'Fully encrypted and secure notes application focused on privacy.',
    icon: 'standard-notes-icon',
    linux_alternative: 'Native Linux Version|flathub:org.standardnotes.standardnotes',
    popularity: 40,
    homepage: 'https://standardnotes.com/',
    alternative_to: ''
  },
  {
    id: 'rednotebook',
    name: 'RedNotebook',
    category: 'Office',
    description: 'Desktop journal and calendar-based personal diary planner.',
    icon: 'rednotebook-icon',
    linux_alternative: 'Native Linux Version|flathub:info.rednotebook.RedNotebook',
    popularity: 25,
    homepage: 'https://rednotebook.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'literatureandlatte-scapple',
    name: 'Scapple',
    category: 'Office',
    description: 'Freeform note integration and mind-mapping companion by Literature & Latte.',
    icon: 'literatureandlatte-scapple-icon',
    linux_alternative: 'Scapple under Wine (runs perfectly) / Draw.io / Pencil Project',
    popularity: 25,
    homepage: 'https://www.literatureandlatte.com/scapple/overview',
    alternative_to: ''
  },
  {
    id: 'ywriter',
    name: 'yWriter',
    category: 'Office',
    description: 'Novel writing software that structures manuscript drafts into chapters and scenes.',
    icon: 'ywriter-icon',
    linux_alternative: 'yWriter under Wine / NovelWriter / bibisco',
    popularity: 20,
    homepage: 'https://www.spacejock.com/yWriter.html',
    alternative_to: ''
  },
  {
    id: 'focuswriter',
    name: 'FocusWriter',
    category: 'Office',
    description: 'Minimalist, full-screen distraction-free word processor.',
    icon: 'focuswriter-icon',
    linux_alternative: 'Native Linux Version|flathub:org.gottcode.FocusWriter',
    popularity: 30,
    homepage: 'https://gottcode.org/focuswriter/',
    alternative_to: ''
  },
  {
    id: 'writemonkey',
    name: 'WriteMonkey',
    category: 'Office',
    description: 'Zen-like distraction-free writing client supporting markdown.',
    icon: 'writemonkey-icon',
    linux_alternative: 'FocusWriter / NovelWriter / Ghostwriter',
    popularity: 20,
    homepage: 'http://writemonkey.com/',
    alternative_to: ''
  },
  {
    id: 'cold-turkey-writer',
    name: 'Cold Turkey Writer',
    category: 'Office',
    description: 'Word processor that forces you to write by blocking your computer until you reach a goal.',
    icon: 'cold-turkey-writer-icon',
    linux_alternative: 'FocusWriter (which has writing goals and lockers) / WriteRoom',
    popularity: 20,
    homepage: 'https://getcoldturkey.com/writer/',
    alternative_to: ''
  },
  {
    id: 'cold-turkey-blocker',
    name: 'Cold Turkey Blocker',
    category: 'Utilities',
    description: 'Strict website and application blocker for productivity.',
    icon: 'cold-turkey-blocker-icon',
    linux_alternative: 'Plucky / Focalboard / SelfControl (via hosts editing)',
    popularity: 25,
    homepage: 'https://getcoldturkey.com/',
    alternative_to: ''
  },
  {
    id: 'flux',
    name: 'F.lux',
    category: 'Utilities',
    description: 'Screen color temperature adjuster that mimics daylight shifts.',
    icon: 'flux-icon',
    linux_alternative: 'Natively supported (GNOME/KDE Night Light is built-in) / Redshift / Gammastep',
    popularity: 45,
    homepage: 'https://justgetflux.com/',
    alternative_to: ''
  },
  {
    id: 'lightbulb',
    name: 'LightBulb',
    category: 'Utilities',
    description: 'Open-source screen tinting and blue light filter software.',
    icon: 'lightbulb-icon',
    linux_alternative: 'Natively supported (Night Light) / Redshift / Gammastep',
    popularity: 30,
    homepage: 'https://github.com/Tyrrrz/LightBulb',
    alternative_to: ''
  },
  {
    id: 'stretchly',
    name: 'Stretchly',
    category: 'Utilities',
    description: 'Break reminder application designed to prevent RSI and eye strain.',
    icon: 'stretchly-icon',
    linux_alternative: 'Native Linux Version|flathub:net.hovancik.stretchly',
    popularity: 30,
    homepage: 'https://hovancik.net/stretchly/',
    alternative_to: ''
  },
  {
    id: 'dxo-photolab',
    name: 'DxO PhotoLab',
    category: 'Design',
    description: 'Advanced RAW image processor and photo editing software.',
    icon: 'dxo-photolab-icon',
    linux_alternative: 'Darktable / RawTherapee / Digikam',
    popularity: 35,
    homepage: 'https://www.dxo.com/dxo-photolab/',
    alternative_to: ''
  },
  {
    id: 'capture-one',
    name: 'Capture One',
    category: 'Design',
    description: 'Professional photography workstation for tethered shooting and RAW editing.',
    icon: 'capture-one-icon',
    linux_alternative: 'Darktable / RawTherapee',
    popularity: 40,
    homepage: 'https://www.captureone.com/',
    alternative_to: ''
  },
  {
    id: 'corel-paintshoppro',
    name: 'PaintShop Pro',
    category: 'Design',
    description: 'All-in-one photo editing and vector design application by Corel.',
    icon: 'corel-paintshoppro-icon',
    linux_alternative: 'GIMP / Krita',
    popularity: 35,
    homepage: 'https://www.paintshoppro.com/',
    alternative_to: ''
  },
  {
    id: 'corel-painter',
    name: 'Corel Painter',
    category: 'Design',
    description: 'Professional raster-based digital art studio and painting software.',
    icon: 'corel-painter-icon',
    linux_alternative: 'Krita / MyPaint',
    popularity: 35,
    homepage: 'https://www.painterartist.com/',
    alternative_to: ''
  },
  {
    id: 'photoscape-x',
    name: 'PhotoScape X',
    category: 'Design',
    description: 'Photo editor suite with filters, collage, and batch capabilities.',
    icon: 'photoscape-x-icon',
    linux_alternative: 'PhotoScape X under Wine / GIMP / Gwenview',
    popularity: 30,
    homepage: 'http://x.photoscape.org/',
    alternative_to: ''
  },
  {
    id: 'pixlr-desktop',
    name: 'Pixlr Desktop',
    category: 'Design',
    description: 'Desktop client wrapper for the Pixlr web photo editor.',
    icon: 'pixlr-desktop-icon',
    linux_alternative: 'Pixlr Web App / GIMP / Photopea',
    popularity: 30,
    homepage: 'https://pixlr.com/',
    alternative_to: ''
  },
  {
    id: 'skylum-luminarneo',
    name: 'Luminar Neo',
    category: 'Design',
    description: 'Creative photo editor powered by artificial intelligence engines.',
    icon: 'skylum-luminarneo-icon',
    linux_alternative: 'Darktable / GIMP (with AI plugins)',
    popularity: 35,
    homepage: 'https://skylum.com/luminar',
    alternative_to: ''
  },
  {
    id: 'gravit-designer',
    name: 'Gravit Designer',
    category: 'Design',
    description: 'Professional vector graphics editor for web and print layout.',
    icon: 'gravit-designer-icon',
    linux_alternative: 'Inkscape / Penpot / Figma (Web)',
    popularity: 30,
    homepage: 'https://www.designer.io/',
    alternative_to: ''
  },
  {
    id: 'vectr',
    name: 'Vectr',
    category: 'Design',
    description: 'Free vector graphics editor with real-time collaboration features.',
    icon: 'vectr-icon',
    linux_alternative: 'Vectr Web App / Inkscape / Penpot',
    popularity: 30,
    homepage: 'https://vectr.com/',
    alternative_to: ''
  },
  {
    id: 'pencil2d',
    name: 'Pencil2D',
    category: 'Design',
    description: 'Open-source 2D hand-drawn animation software.',
    icon: 'pencil2d-icon',
    linux_alternative: 'Native Linux Version|flathub:org.pencil2d.Pencil2D / Krita',
    popularity: 35,
    homepage: 'https://www.pencil2d.org/',
    alternative_to: ''
  },
  {
    id: 'opentoonz',
    name: 'OpenToonz',
    category: 'Design',
    description: '2D animation production software used by Studio Ghibli.',
    icon: 'opentoonz-icon',
    linux_alternative: 'Native Linux Version|flathub:io.github.OpenToonz / Tahoma2D',
    popularity: 35,
    homepage: 'https://opentoonz.github.io/e/',
    alternative_to: ''
  },
  {
    id: 'synfig-studio',
    name: 'Synfig Studio',
    category: 'Design',
    description: 'Powerful 2D vector animation studio utilizing bone systems.',
    icon: 'synfig-studio-icon',
    linux_alternative: 'Native Linux Version|flathub:org.synfig.SynfigStudio',
    popularity: 35,
    homepage: 'https://www.synfig.org/',
    alternative_to: ''
  },
  {
    id: 'tupitube',
    name: 'TupiTube',
    category: 'Design',
    description: '2D vector animation tool designed for children and hobbyists.',
    icon: 'tupitube-icon',
    linux_alternative: 'Native Linux Version / Pencil2D',
    popularity: 20,
    homepage: 'https://www.maefloresta.com/',
    alternative_to: ''
  },
  {
    id: 'pivot-animator',
    name: 'Pivot Animator',
    category: 'Design',
    description: 'Stick-figure 2D animation creator with canvas support.',
    icon: 'pivot-animator-icon',
    linux_alternative: 'Pivot under Wine / TupiTube / Pencil2D',
    popularity: 30,
    homepage: 'https://pivotanimator.net/',
    alternative_to: ''
  },
  {
    id: 'stencyl',
    name: 'Stencyl',
    category: 'Development',
    description: 'Video game development engine featuring block-based coding.',
    icon: 'stencyl-icon',
    linux_alternative: 'Native Linux Version / Godot / GDevelop',
    popularity: 25,
    homepage: 'http://www.stencyl.com/',
    alternative_to: ''
  },
  {
    id: 'construct-3',
    name: 'Construct 3',
    category: 'Development',
    description: 'HTML5 2D game engine optimized for visual block programming.',
    icon: 'construct-3-icon',
    linux_alternative: 'Construct 3 Web Client / GDevelop / Godot',
    popularity: 30,
    homepage: 'https://www.construct.net/',
    alternative_to: ''
  },
  {
    id: 'gamemaker',
    name: 'GameMaker',
    category: 'Development',
    description: 'Popular 2D game engine supporting both drag-and-drop and GML scripting.',
    icon: 'gamemaker-icon',
    linux_alternative: 'Native Linux Version (official Ubuntu beta) / Godot / GDevelop',
    popularity: 45,
    homepage: 'https://gamemaker.io/',
    alternative_to: ''
  },
  {
    id: 'rpgmaker-mz',
    name: 'RPG Maker MZ',
    category: 'Development',
    description: 'Game design software tailored for building retro role-playing games.',
    icon: 'rpgmaker-mz-icon',
    linux_alternative: 'Native Linux Version (MZ runs natively on Linux) / RPG Maker MZ under Wine',
    popularity: 40,
    homepage: 'https://www.rpgmakerweb.com/products/rpg-maker-mz',
    alternative_to: ''
  },
  {
    id: 'natron',
    name: 'Natron',
    category: 'Design',
    description: 'Node-based open-source compositing application for visual effects.',
    icon: 'natron-icon',
    linux_alternative: 'Native Linux Version|flathub:fr.natron.Natron / Blender',
    popularity: 35,
    homepage: 'https://natrongithub.github.io/',
    alternative_to: ''
  },
  {
    id: 'olive-video-editor',
    name: 'Olive Video Editor',
    category: 'Design',
    description: 'Non-linear video editor targeting high performance and professional editing tools.',
    icon: 'olive-video-editor-icon',
    linux_alternative: 'Native Linux Version|flathub:org.olivevideoeditor.Olive',
    popularity: 35,
    homepage: 'https://www.olivevideoeditor.org/',
    alternative_to: ''
  },
  {
    id: 'losslesscut',
    name: 'LosslessCut',
    category: 'Design',
    description: 'Fast, lossless video and audio cutting tool based on FFmpeg.',
    icon: 'losslesscut-icon',
    linux_alternative: 'Native Linux Version|flathub:mifi.losslesscut',
    popularity: 45,
    homepage: 'https://github.com/mifi/losslesscut',
    alternative_to: ''
  },
  {
    id: 'mkvtoolnix',
    name: 'MKVToolNix',
    category: 'Utilities',
    description: 'Set of tools to create, inspect, split and merge Matroska (MKV) video container files.',
    icon: 'mkvtoolnix-icon',
    linux_alternative: 'Native Linux Version|flathub:org.bunkus.mkvtoolnix-gui',
    popularity: 45,
    homepage: 'https://mkvtoolnix.download/',
    alternative_to: ''
  },
  {
    id: 'subtitle-edit',
    name: 'Subtitle Edit',
    category: 'Utilities',
    description: 'Subtitle creation and editing utility with wave-form visual sync.',
    icon: 'subtitle-edit-icon',
    linux_alternative: 'Subtitle Edit under Wine / Gaupol / Subtitle Composer',
    popularity: 40,
    homepage: 'https://www.nikse.dk/subtitleedit',
    alternative_to: ''
  },
  {
    id: 'mpc-hc',
    name: 'MPC-HC (Media Player Classic)',
    category: 'Audio',
    description: 'Classic and lightweight video/audio player.',
    icon: 'mpc-hc-icon',
    linux_alternative: 'MPC-HC under Wine / VLC / MPV / Clapper',
    popularity: 40,
    homepage: 'https://github.com/clsid2/mpc-hc',
    alternative_to: ''
  },
  {
    id: 'mpc-be',
    name: 'MPC-BE',
    category: 'Audio',
    description: 'Modernized fork of Media Player Classic with skin support and updated internal filters.',
    icon: 'mpc-be-icon',
    linux_alternative: 'MPC-BE under Wine / VLC / MPV',
    popularity: 35,
    homepage: 'https://sourceforge.net/projects/mpcbe/',
    alternative_to: ''
  },
  {
    id: 'daum-potplayer',
    name: 'PotPlayer',
    category: 'Audio',
    description: 'Feature-rich and highly customizable multimedia player by Daum.',
    icon: 'daum-potplayer-icon',
    linux_alternative: 'PotPlayer under Wine / VLC / MPV / Celluloid',
    popularity: 45,
    homepage: 'https://potplayer.daum.net/',
    alternative_to: ''
  },
  {
    id: 'kmplayer',
    name: 'KMPlayer',
    category: 'Audio',
    description: 'High-definition video player supporting ultra-high resolutions.',
    icon: 'kmplayer-icon',
    linux_alternative: 'KMPlayer (Native Linux Version) / VLC / MPV',
    popularity: 40,
    homepage: 'http://www.kmplayer.com/',
    alternative_to: ''
  },
  {
    id: 'gom-player',
    name: 'GOM Player',
    category: 'Audio',
    description: 'Codec-finding media player supporting subtitle integration.',
    icon: 'gom-player-icon',
    linux_alternative: 'VLC / MPV / Celluloid',
    popularity: 30,
    homepage: 'https://www.gomlab.com/gomplayer-media-player/',
    alternative_to: ''
  },
  {
    id: 'bs-player',
    name: 'BS.Player',
    category: 'Audio',
    description: 'Media player optimized for low resource and low-spec systems.',
    icon: 'bs-player-icon',
    linux_alternative: 'VLC / MPV',
    popularity: 20,
    homepage: 'http://www.bsplayer.com/',
    alternative_to: ''
  },
  {
    id: 'divx-player',
    name: 'DivX Player',
    category: 'Audio',
    description: 'Media player supporting DivX, HEVC, and high-quality audio files.',
    icon: 'divx-player-icon',
    linux_alternative: 'VLC / MPV / Celluloid',
    popularity: 20,
    homepage: 'https://www.divx.com/en/software/divx/',
    alternative_to: ''
  },
  {
    id: 'plex-media-server',
    name: 'Plex Media Server',
    category: 'Audio',
    description: 'Server software that streams music, movies, and photos to client devices.',
    icon: 'plex-media-server-icon',
    linux_alternative: 'Native Linux Version / Jellyfin / Emby',
    popularity: 45,
    homepage: 'https://www.plex.tv/media-server-downloads/',
    alternative_to: ''
  },
  {
    id: 'plex-desktop',
    name: 'Plex Desktop',
    category: 'Audio',
    description: 'Desktop player client for streaming and syncing Plex server media.',
    icon: 'plex-desktop-icon',
    linux_alternative: 'Plex HTPC (Native Linux Version) / Plex Web Client',
    popularity: 45,
    homepage: 'https://www.plex.tv/',
    alternative_to: ''
  },
  {
    id: 'emby-server',
    name: 'Emby Server',
    category: 'Audio',
    description: 'Personal media server alternative to Plex and Jellyfin.',
    icon: 'emby-server-icon',
    linux_alternative: 'Native Linux Version / Jellyfin / Plex',
    popularity: 30,
    homepage: 'https://emby.media/',
    alternative_to: ''
  },
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    category: 'Audio',
    description: 'Free and open-source personal media server system.',
    icon: 'jellyfin-icon',
    linux_alternative: 'Native Linux Version|flathub:org.jellyfin.JellyfinServer / Plex',
    popularity: 45,
    homepage: 'https://jellyfin.org/',
    alternative_to: ''
  },
  {
    id: 'notepadqq',
    name: 'Notepadqq',
    category: 'Development',
    description: 'Notepad++-like source code text editor for Linux desktops.',
    icon: 'notepadqq-icon',
    linux_alternative: 'Native Linux Version|flathub:com.notepadqq.Notepadqq',
    popularity: 35,
    homepage: 'https://notepadqq.github.io/notepadqq/index.html',
    alternative_to: ''
  },
  {
    id: 'geany',
    name: 'Geany',
    category: 'Development',
    description: 'Fast and lightweight programmer text editor and IDE.',
    icon: 'geany-icon',
    linux_alternative: 'Native Linux Version|flathub:org.geany.Geany',
    popularity: 35,
    homepage: 'https://www.geany.org/',
    alternative_to: ''
  },
  {
    id: 'bluefish',
    name: 'Bluefish',
    category: 'Development',
    description: 'Powerful editor targeted towards programmers and web developers.',
    icon: 'bluefish-icon',
    linux_alternative: 'Native Linux Version|flathub:org.bluefish.Bluefish',
    popularity: 25,
    homepage: 'http://bluefish.openoffice.nl/',
    alternative_to: ''
  },
  {
    id: 'syntevo-smartgit',
    name: 'SmartGit',
    category: 'Development',
    description: 'Graphical Git client support for SVN and Mercurial.',
    icon: 'syntevo-smartgit-icon',
    linux_alternative: 'Native Linux Version / GitKraken / lazygit',
    popularity: 30,
    homepage: 'https://www.syntevo.com/smartgit/',
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
