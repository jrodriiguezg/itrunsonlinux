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
  // User Requested Missing Apps
  {
    id: 'nitro-pdf-pro',
    name: 'Nitro PDF Pro',
    category: 'Office',
    description: 'Professional PDF editor, creator, and signer tool for business and team collaboration.',
    icon: 'nitro-pdf-pro-icon',
    linux_alternative: 'Okular / Master PDF Editor / PDFArranger / LibreOffice Draw',
    popularity: 35,
    homepage: 'https://www.gonitro.com/',
    alternative_to: ''
  },
  {
    id: 'canva-desktop',
    name: 'Canva Desktop',
    category: 'Design',
    description: 'Desktop client wrapper for the popular Canva graphic design and publishing platform.',
    icon: 'canva-desktop-icon',
    linux_alternative: 'Canva Web App / Penpot / Inkscape',
    popularity: 45,
    homepage: 'https://www.canva.com/download/windows/',
    alternative_to: ''
  },
  {
    id: 'capcut-desktop',
    name: 'CapCut',
    category: 'Design',
    description: 'Easy-to-use video editor with smart features, templates, and text-to-speech.',
    icon: 'capcut-desktop-icon',
    linux_alternative: 'CapCut Web Client / Kdenlive / Shotcut',
    popularity: 45,
    homepage: 'https://www.capcut.com/',
    alternative_to: ''
  },
  {
    id: 'microsoft-onedrive',
    name: 'Microsoft OneDrive',
    category: 'Utilities',
    description: "Microsoft's cloud storage desktop client for syncing files and folders.",
    icon: 'microsoft-onedrive-icon',
    linux_alternative: 'OneDrive Client for Linux (abraunegg) / Celestia / KIO-OneDrive / rclone',
    popularity: 45,
    homepage: 'https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage',
    alternative_to: ''
  },
  {
    id: 'google-drive-desktop',
    name: 'Google Drive for Desktop',
    category: 'Utilities',
    description: "Google's official desktop client to sync files, photos, and virtual drives.",
    icon: 'google-drive-desktop-icon',
    linux_alternative: 'KIO-GDrive / GNOME Online Accounts / Insync / rclone',
    popularity: 45,
    homepage: 'https://www.google.com/drive/download/',
    alternative_to: ''
  },
  {
    id: 'dropbox-desktop',
    name: 'Dropbox',
    category: 'Utilities',
    description: 'Cloud storage and smart file synchronization service client.',
    icon: 'dropbox-desktop-icon',
    linux_alternative: 'Native Linux Version|flathub:com.dropbox.Client / rclone',
    popularity: 45,
    homepage: 'https://www.dropbox.com/',
    alternative_to: ''
  },
  {
    id: 'mysql-workbench',
    name: 'MySQL Workbench',
    category: 'Development',
    description: 'Visual database design, modeling, creation and management tool for MySQL.',
    icon: 'mysql-workbench-icon',
    linux_alternative: 'Native Linux Version / DBeaver / Beekeeper Studio',
    popularity: 40,
    homepage: 'https://www.mysql.com/products/workbench/',
    alternative_to: ''
  },
  {
    id: 'vmware-workstation',
    name: 'VMware Workstation Pro',
    category: 'Development',
    description: 'Industry-standard virtual machine monitor and hypervisor software.',
    icon: 'vmware-workstation-icon',
    linux_alternative: 'Native Linux Version / Virt-Manager (KVM/QEMU) / VirtualBox',
    popularity: 40,
    homepage: 'https://www.vmware.com/products/workstation-pro.html',
    alternative_to: ''
  },
  {
    id: 'zerotier-one',
    name: 'ZeroTier One',
    category: 'Utilities',
    description: 'Software-defined networking client that creates secure virtual private networks.',
    icon: 'zerotier-one-icon',
    linux_alternative: 'Native Linux Version / Tailscale / OpenVPN',
    popularity: 35,
    homepage: 'https://www.zerotier.com/',
    alternative_to: ''
  },
  {
    id: 'termius-ssh',
    name: 'Termius',
    category: 'Development',
    description: 'Modern SSH client and terminal workspace for desktop and mobile.',
    icon: 'termius-ssh-icon',
    linux_alternative: 'Native Linux Version|flathub:com.termius.Termius / Remmina / GNOME Terminal',
    popularity: 40,
    homepage: 'https://termius.com/',
    alternative_to: ''
  },
  {
    id: 'powershell-core',
    name: 'PowerShell',
    category: 'Development',
    description: "Microsoft's task automation and configuration management framework.",
    icon: 'powershell-core-icon',
    linux_alternative: 'Native Linux Version|flathub:org.powershell.PowerShell / Bash / Zsh',
    popularity: 40,
    homepage: 'https://github.com/PowerShell/PowerShell',
    alternative_to: ''
  },
  {
    id: 'ollama-llm',
    name: 'Ollama',
    category: 'Development',
    description: 'Run open-source large language models (Llama 3, Mistral) locally.',
    icon: 'ollama-llm-icon',
    linux_alternative: 'Native Linux Version / Llama.cpp (CLI) / LocalAI',
    popularity: 45,
    homepage: 'https://ollama.com/',
    alternative_to: ''
  },
  {
    id: 'lm-studio',
    name: 'LM Studio',
    category: 'Development',
    description: 'Desktop interface to discover, download, and run LLMs locally.',
    icon: 'lm-studio-icon',
    linux_alternative: 'Native Linux Version (AppImage) / AnythingLLM / KoboldCPP',
    popularity: 45,
    homepage: 'https://lmstudio.ai/',
    alternative_to: ''
  },
  {
    id: 'nvidia-cuda-toolkit',
    name: 'NVIDIA CUDA Toolkit',
    category: 'Development',
    description: 'Development environment for creating high-performance GPU-accelerated applications.',
    icon: 'nvidia-cuda-toolkit-icon',
    linux_alternative: 'Native Linux Version (CUDA is fully supported on Linux with proprietary drivers)',
    popularity: 40,
    homepage: 'https://developer.nvidia.com/cuda-toolkit',
    alternative_to: ''
  },
  {
    id: 'anything-llm',
    name: 'AnythingLLM',
    category: 'Development',
    description: 'Full-stack local AI chat application with RAG and multiple LLM provider support.',
    icon: 'anything-llm-icon',
    linux_alternative: 'Native Linux Version (AppImage) / LM Studio',
    popularity: 45,
    homepage: 'https://anythingllm.com/',
    alternative_to: ''
  },
  {
    id: 'fritzing-pcb',
    name: 'Fritzing',
    category: 'Engineering',
    description: 'Open-source CAD tool for designing electronics and PCB layouts.',
    icon: 'fritzing-pcb-icon',
    linux_alternative: 'Native Linux Version|flathub:org.fritzing.Fritzing / KiCad',
    popularity: 35,
    homepage: 'https://fritzing.org/',
    alternative_to: ''
  },
  {
    id: 'fusion-360',
    name: 'Autodesk Fusion 360',
    category: 'Engineering',
    description: 'Cloud-based 3D CAD, CAM, CAE, and PCB design platform.',
    icon: 'fusion-360-icon',
    linux_alternative: 'FreeCAD / Onshape (Web) / Fusion 360 via Wine',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/fusion-360/overview',
    alternative_to: ''
  },
  {
    id: 'prism-launcher',
    name: 'Prism Launcher',
    category: 'Games',
    description: 'Custom open-source Minecraft launcher with multiple instances management.',
    icon: 'prism-launcher-icon',
    linux_alternative: 'Native Linux Version|flathub:org.prismlauncher.PrismLauncher',
    popularity: 45,
    homepage: 'https://prismlauncher.org/',
    alternative_to: ''
  },
  {
    id: 'overwolf-client',
    name: 'Overwolf',
    category: 'Games',
    description: 'Software platform that allows developers to build extensions and overlays for PC games.',
    icon: 'overwolf-client-icon',
    linux_alternative: 'Steam overlay / Custom Linux overlays (MangoHud) / Decky Loader',
    popularity: 40,
    homepage: 'https://www.overwolf.com/',
    alternative_to: ''
  },
  {
    id: 'microsoft-phone-link',
    name: 'Microsoft Phone Link',
    category: 'Utilities',
    description: 'Sync your Android or iOS device notifications, texts, and photos with Windows.',
    icon: 'microsoft-phone-link-icon',
    linux_alternative: 'KDE Connect / GSConnect',
    popularity: 40,
    homepage: 'https://www.microsoft.com/en-us/windows/sync-across-your-devices',
    alternative_to: ''
  },

  // Workspace/Messaging
  {
    id: 'rambox',
    name: 'Rambox',
    category: 'Social',
    description: 'Workspace organizer that combines common web applications into one interface.',
    icon: 'rambox-icon',
    linux_alternative: 'Franz / Ferdium / Hamsket',
    popularity: 40,
    homepage: 'https://rambox.app/',
    alternative_to: ''
  },
  {
    id: 'franz',
    name: 'Franz',
    category: 'Social',
    description: 'Messaging app that bundles database-less chat and messaging services into one application.',
    icon: 'franz-icon',
    linux_alternative: 'Ferdium / Rambox / Hamsket',
    popularity: 35,
    homepage: 'https://meetfranz.com/',
    alternative_to: ''
  },
  {
    id: 'ferdium',
    name: 'Ferdium',
    category: 'Social',
    description: 'Open-source desktop app that compiles various chat and messaging apps.',
    icon: 'ferdium-icon',
    linux_alternative: 'Native Linux Version|flathub:org.ferdium.Ferdium / Franz',
    popularity: 40,
    homepage: 'https://ferdium.org/',
    alternative_to: ''
  },
  {
    id: 'wavebox',
    name: 'Wavebox',
    category: 'Office',
    description: 'Web-based workspace browser built for SaaS and productivity.',
    icon: 'wavebox-icon',
    linux_alternative: 'Native Linux Version|flathub:co.wavebox.Wavebox / Ferdium',
    popularity: 35,
    homepage: 'https://wavebox.io/',
    alternative_to: ''
  },
  {
    id: 'session-messenger',
    name: 'Session',
    category: 'Social',
    description: 'End-to-end encrypted messaging application focused on user privacy.',
    icon: 'session-messenger-icon',
    linux_alternative: 'Native Linux Version|flathub:io.getsession.Session',
    popularity: 45,
    homepage: 'https://getsession.org/',
    alternative_to: ''
  },
  {
    id: 'zoiper',
    name: 'Zoiper',
    category: 'Social',
    description: 'VoIP softphone application with SIP and IAX support.',
    icon: 'zoiper-icon',
    linux_alternative: 'Native Linux Version / Linphone',
    popularity: 35,
    homepage: 'https://www.zoiper.com/',
    alternative_to: ''
  },
  {
    id: 'microsip',
    name: 'MicroSIP',
    category: 'Social',
    description: 'Lightweight portable SIP softphone for Windows.',
    icon: 'microsip-icon',
    linux_alternative: 'Linphone / Ekiga / Jitsi',
    popularity: 30,
    homepage: 'https://www.microsip.org/',
    alternative_to: ''
  },

  // Emulators
  {
    id: 'citra-emu',
    name: 'Citra',
    category: 'Games',
    description: 'Open-source Nintendo 3DS console emulator.',
    icon: 'citra-emu-icon',
    linux_alternative: 'Native Linux Version / Lime3DS',
    popularity: 40,
    homepage: 'https://citra-emulator.com/',
    alternative_to: ''
  },
  {
    id: 'desmume-emu',
    name: 'DeSmuME',
    category: 'Games',
    description: 'Nintendo DS emulator for running commercial ROMs.',
    icon: 'desmume-emu-icon',
    linux_alternative: 'Native Linux Version / MelonDS',
    popularity: 35,
    homepage: 'http://desmume.org/',
    alternative_to: ''
  },
  {
    id: 'melonds-emu',
    name: 'MelonDS',
    category: 'Games',
    description: 'Fast, accurate Nintendo DS and DSi emulator.',
    icon: 'melonds-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:net.kuribo64.melonDS / DeSmuME',
    popularity: 40,
    homepage: 'http://melonds.kuribo64.net/',
    alternative_to: ''
  },
  {
    id: 'mgba-emu',
    name: 'mGBA',
    category: 'Games',
    description: 'Fast and accurate Game Boy Advance emulator.',
    icon: 'mgba-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:com.endrift.mGBA',
    popularity: 45,
    homepage: 'https://mgba.io/',
    alternative_to: ''
  },
  {
    id: 'snes9x-emu',
    name: 'Snes9x',
    category: 'Games',
    description: 'Portable, freeware Super Nintendo Entertainment System (SNES) emulator.',
    icon: 'snes9x-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:com.snes9x.Snes9x / Higan',
    popularity: 40,
    homepage: 'https://github.com/snes9xgit/snes9x',
    alternative_to: ''
  },
  {
    id: 'project64-emu',
    name: 'Project64',
    category: 'Games',
    description: 'Popular Nintendo 64 emulator using a plugins system.',
    icon: 'project64-emu-icon',
    linux_alternative: 'Simple64 / Mupen64Plus (with m64py frontend)',
    popularity: 35,
    homepage: 'https://www.pj64-emu.com/',
    alternative_to: ''
  },
  {
    id: 'epsxe-emu',
    name: 'ePSXe',
    category: 'Games',
    description: 'Closed-source emulator of the PlayStation video game console.',
    icon: 'epsxe-emu-icon',
    linux_alternative: 'DuckStation / PCSX-Rearmed',
    popularity: 35,
    homepage: 'https://www.epsxe.com/',
    alternative_to: ''
  },
  {
    id: 'flycast-emu',
    name: 'Flycast',
    category: 'Games',
    description: 'Multiplatform Sega Dreamcast, Naomi, and Atomiswave emulator.',
    icon: 'flycast-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:org.flycast.Flycast / Redream',
    popularity: 35,
    homepage: 'https://github.com/flyinghead/flycast',
    alternative_to: ''
  },
  {
    id: 'redream-emu',
    name: 'Redream',
    category: 'Games',
    description: 'High-definition Sega Dreamcast emulator with simple configuration.',
    icon: 'redream-emu-icon',
    linux_alternative: 'Native Linux Version / Flycast',
    popularity: 40,
    homepage: 'https://redream.io/',
    alternative_to: ''
  },
  {
    id: 'xenia-emu',
    name: 'Xenia',
    category: 'Games',
    description: 'Experimental emulator for the Xbox 360 console.',
    icon: 'xenia-emu-icon',
    linux_alternative: 'Xenia under Wine / Proton',
    popularity: 35,
    homepage: 'https://xenia.jp/',
    alternative_to: ''
  },
  {
    id: 'vita3k-emu',
    name: 'Vita3K',
    category: 'Games',
    description: 'First functional experimental open-source PlayStation Vita emulator.',
    icon: 'vita3k-emu-icon',
    linux_alternative: 'Native Linux Version / Vita3K (AppImage)',
    popularity: 40,
    homepage: 'https://vita3k.org/',
    alternative_to: ''
  },
  {
    id: 'visualboyadvance-m',
    name: 'VisualBoyAdvance-M',
    category: 'Games',
    description: 'Emulator for Game Boy and Game Boy Advance console systems.',
    icon: 'visualboyadvance-m-icon',
    linux_alternative: 'Native Linux Version|flathub:info.vbam.VBA-M / mGBA',
    popularity: 40,
    homepage: 'https://vba-m.com/',
    alternative_to: ''
  },
  {
    id: 'nestopia-ue',
    name: 'Nestopia UE',
    category: 'Games',
    description: 'Nestopia Undead Edition is a fork of the high-accuracy NES emulator.',
    icon: 'nestopia-ue-icon',
    linux_alternative: 'Native Linux Version / FCEUX',
    popularity: 40,
    homepage: 'https://0b5vr.github.io/nestopia/',
    alternative_to: ''
  },
  {
    id: 'fceux-emu',
    name: 'FCEUX',
    category: 'Games',
    description: 'All-in-one NES and Famicom Emulator with debugging support.',
    icon: 'fceux-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:com.fceux.FCEUX',
    popularity: 35,
    homepage: 'http://fceux.com/',
    alternative_to: ''
  },
  {
    id: 'blastem-emu',
    name: 'BlastEm',
    category: 'Games',
    description: 'High-performance, highly accurate Sega Genesis/Mega Drive emulator.',
    icon: 'blastem-emu-icon',
    linux_alternative: 'Native Linux Version / Kega Fusion',
    popularity: 35,
    homepage: 'https://www.retrodev.com/blastem/',
    alternative_to: ''
  },
  {
    id: 'play-emu',
    name: 'Play!',
    category: 'Games',
    description: 'Portable PlayStation 2 console emulator.',
    icon: 'play-emu-icon',
    linux_alternative: 'Native Linux Version / PCSX2',
    popularity: 30,
    homepage: 'https://purei.org/',
    alternative_to: ''
  },
  {
    id: 'winuae-emu',
    name: 'WinUAE',
    category: 'Games',
    description: 'Amiga hardware emulator designed for Windows OS.',
    icon: 'winuae-emu-icon',
    linux_alternative: 'FS-UAE / Amiberry',
    popularity: 35,
    homepage: 'http://www.winuae.net/',
    alternative_to: ''
  },
  {
    id: 'vice-emu',
    name: 'VICE',
    category: 'Games',
    description: 'Versatile Commodore Emulator for retro C64/C128 computers.',
    icon: 'vice-emu-icon',
    linux_alternative: 'Native Linux Version / Vice (Flatpak)',
    popularity: 35,
    homepage: 'https://vice-emu.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'stella-emu',
    name: 'Stella',
    category: 'Games',
    description: 'Multi-platform Atari 2600 VCS emulator.',
    icon: 'stella-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:src.stella.Stella',
    popularity: 35,
    homepage: 'https://stephena.github.io/stella/',
    alternative_to: ''
  },
  {
    id: 'scummvm-emu',
    name: 'ScummVM',
    category: 'Games',
    description: 'Runs classic point-and-click adventure games on modern hardware.',
    icon: 'scummvm-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:org.scummvm.ScummVM',
    popularity: 45,
    homepage: 'https://www.scummvm.org/',
    alternative_to: ''
  },
  {
    id: 'dosbox-staging',
    name: 'DOSBox Staging',
    category: 'Games',
    description: 'Modernized fork of the classic DOSBox emulator for retro games.',
    icon: 'dosbox-staging-icon',
    linux_alternative: 'Native Linux Version|flathub:org.dosbox.Dosbox-staging',
    popularity: 40,
    homepage: 'https://dosbox-staging.github.io/',
    alternative_to: ''
  },
  {
    id: 'dosbox-x',
    name: 'DOSBox-X',
    category: 'Games',
    description: 'Advanced cross-platform DOS emulator with focus on accuracy and preservation.',
    icon: 'dosbox-x-icon',
    linux_alternative: 'Native Linux Version|flathub:com.dosbox_x.DOSBox-X',
    popularity: 40,
    homepage: 'https://dosbox-x.com/',
    alternative_to: ''
  },
  {
    id: 'pcem-emulator',
    name: 'PCem',
    category: 'Games',
    description: 'Emulator for IBM PC XT/AT and compatible hardware configurations.',
    icon: 'pcem-emulator-icon',
    linux_alternative: '86Box / PCem (via Wine or compiling on Linux)',
    popularity: 30,
    homepage: 'https://pcem-emulator.co.uk/',
    alternative_to: ''
  },
  {
    id: '86box-emulator',
    name: '86Box',
    category: 'Games',
    description: 'Low-level x86 emulator that runs vintage operating systems and games.',
    icon: '86box-emulator-icon',
    linux_alternative: 'Native Linux Version / 86Box AppImage',
    popularity: 40,
    homepage: 'https://86box.net/',
    alternative_to: ''
  },
  {
    id: 'openmsx-emu',
    name: 'openMSX',
    category: 'Games',
    description: 'Highly accurate emulator for the MSX home computer standard.',
    icon: 'openmsx-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:org.openmsx.openMSX',
    popularity: 30,
    homepage: 'http://openmsx.org/',
    alternative_to: ''
  },
  {
    id: 'mame-emu',
    name: 'MAME',
    category: 'Games',
    description: 'Arcade machine and vintage computer emulator designed for preservation.',
    icon: 'mame-emu-icon',
    linux_alternative: 'Native Linux Version|flathub:org.mamedev.mame',
    popularity: 45,
    homepage: 'https://www.mamedev.org/',
    alternative_to: ''
  },
  {
    id: 'fightcade-app',
    name: 'Fightcade',
    category: 'Games',
    description: 'Retro matchmaking platform featuring built-in netplay emulators.',
    icon: 'fightcade-app-icon',
    linux_alternative: 'Native Linux Version (unofficial Flatpak/AppImage)',
    popularity: 40,
    homepage: 'https://www.fightcade.com/',
    alternative_to: ''
  },
  {
    id: 'launchbox-launcher',
    name: 'LaunchBox',
    category: 'Games',
    description: 'Box-art database, launcher, and frontend for DOSBox, emulators, and games.',
    icon: 'launchbox-launcher-icon',
    linux_alternative: 'Lutris / Pegasus Frontend / EmulationStation DE',
    popularity: 40,
    homepage: 'https://www.launchbox-app.com/',
    alternative_to: ''
  },
  {
    id: 'playnite-launcher',
    name: 'Playnite',
    category: 'Games',
    description: 'Open source video game library manager and launcher with support for third party libraries.',
    icon: 'playnite-launcher-icon',
    linux_alternative: 'Lutris / GameHub / Steam (Non-Steam shortcuts)',
    popularity: 40,
    homepage: 'https://playnite.link/',
    alternative_to: ''
  },
  {
    id: 'emulationstation-de',
    name: 'EmulationStation Desktop Edition',
    category: 'Games',
    description: 'Frontend for emulator cores and retro game folders.',
    icon: 'emulationstation-de-icon',
    linux_alternative: 'Native Linux Version|flathub:org.es_de.ES-DE',
    popularity: 40,
    homepage: 'https://es-de.org/',
    alternative_to: ''
  },
  {
    id: 'pegasus-frontend',
    name: 'Pegasus',
    category: 'Games',
    description: 'Cross-platform graphical frontend for launching emulators and games.',
    icon: 'pegasus-frontend-icon',
    linux_alternative: 'Native Linux Version / Pegasus Flatpak',
    popularity: 35,
    homepage: 'https://pegasus-frontend.org/',
    alternative_to: ''
  },

  // Game Utilities
  {
    id: 'flawless-widescreen',
    name: 'Flawless Widescreen',
    category: 'Games',
    description: 'Program designed to fix widescreen aspect ratio issues in popular games.',
    icon: 'flawless-widescreen-icon',
    linux_alternative: 'Proton fixes / gamescope / custom DLL overrides',
    popularity: 40,
    homepage: 'https://www.flawlesswidescreen.org/',
    alternative_to: ''
  },
  {
    id: 'borderless-gaming',
    name: 'Borderless Gaming',
    category: 'Games',
    description: 'Forces windowed games into borderless fullscreen modes.',
    icon: 'borderless-gaming-icon',
    linux_alternative: 'gamescope / KDE Plasma native window rules / GNOME extensions',
    popularity: 40,
    homepage: 'https://github.com/Codeusa/Borderless-Gaming',
    alternative_to: ''
  },
  {
    id: 'special-k',
    name: 'Special K',
    category: 'Games',
    description: 'Extensive game modding tool offering custom framerate limits, HDR retrofit, and input latency improvements.',
    icon: 'special-k-icon',
    linux_alternative: 'vkBasalt / MangoHud / Steam Proton',
    popularity: 40,
    homepage: 'https://special-k.info/',
    alternative_to: ''
  },
  {
    id: 'modorganizer-2',
    name: 'Mod Organizer 2',
    category: 'Games',
    description: 'Advanced mod manager for Bethesda RPG titles using virtual filesystems.',
    icon: 'modorganizer-2-icon',
    linux_alternative: 'Mod Organizer 2 under Wine (using Linux MO2 installer)',
    popularity: 40,
    homepage: 'https://github.com/ModOrganizer2/modorganizer',
    alternative_to: ''
  },
  {
    id: 'wrye-bash',
    name: 'Wrye Bash',
    category: 'Games',
    description: 'Tool for modding Bethesda games, managing load order, and creating Bashed Patches.',
    icon: 'wrye-bash-icon',
    linux_alternative: 'Wrye Bash (Native Linux Python Version)',
    popularity: 35,
    homepage: 'https://github.com/wrye-bash/wrye-bash',
    alternative_to: ''
  },
  {
    id: 'loot-mod',
    name: 'LOOT',
    category: 'Games',
    description: 'Load Order Optimisation Tool for Elder Scrolls and Fallout mods.',
    icon: 'loot-mod-icon',
    linux_alternative: 'LOOT (Native Linux Version)',
    popularity: 40,
    homepage: 'https://loot.github.io/',
    alternative_to: ''
  },
  {
    id: 'tes5edit-xedit',
    name: 'xEdit (TES5Edit/FO4Edit)',
    category: 'Games',
    description: 'Advanced graphical editor for Elder Scrolls and Fallout plugin files.',
    icon: 'tes5edit-xedit-icon',
    linux_alternative: 'xEdit under Wine',
    popularity: 40,
    homepage: 'https://www.nexusmods.com/skyrimspecialedition/mods/164',
    alternative_to: ''
  },
  {
    id: 'nifskope',
    name: 'NifSkope',
    category: 'Games',
    description: 'Graphical program for analyzing and editing NetImmerse/Gamebryo 3D format (.nif) files.',
    icon: 'nifskope-icon',
    linux_alternative: 'NifSkope (Native Linux Version / AppImage)',
    popularity: 35,
    homepage: 'https://niftools.github.io/nifskope/',
    alternative_to: ''
  },
  {
    id: 'mcedit-minecraft',
    name: 'MCEdit',
    category: 'Games',
    description: 'Classic third-party world editor for Minecraft.',
    icon: 'mcedit-minecraft-icon',
    linux_alternative: 'Amulet Map Editor (Native Linux Version)',
    popularity: 35,
    homepage: 'https://www.mcedit.net/',
    alternative_to: ''
  },
  {
    id: 'amulet-map-editor',
    name: 'Amulet Map Editor',
    category: 'Games',
    description: 'Modern Minecraft map editor and world converter.',
    icon: 'amulet-map-editor-icon',
    linux_alternative: 'Native Linux Version / Amulet (via pip)',
    popularity: 35,
    homepage: 'https://www.amuletmc.com/',
    alternative_to: ''
  },
  {
    id: 'worldpainter-minecraft',
    name: 'WorldPainter',
    category: 'Games',
    description: 'Interactive map generator and painter for Minecraft worlds.',
    icon: 'worldpainter-minecraft-icon',
    linux_alternative: 'Native Linux Version (Java Jar package)',
    popularity: 35,
    homepage: 'https://www.worldpainter.net/',
    alternative_to: ''
  },
  {
    id: 'gdlauncher-minecraft',
    name: 'GDLauncher',
    category: 'Games',
    description: 'Custom Java-based Minecraft launcher with automatic modpack installs.',
    icon: 'gdlauncher-minecraft-icon',
    linux_alternative: 'GDLauncher Carbon (Native Linux Version) / Prism Launcher',
    popularity: 35,
    homepage: 'https://gdlauncher.com/',
    alternative_to: ''
  },
  {
    id: 'wowup-addon',
    name: 'WowUp',
    category: 'Games',
    description: 'Addon updater and manager for World of Warcraft players.',
    icon: 'wowup-addon-icon',
    linux_alternative: 'WowUp (Native Linux Version / Flatpak)',
    popularity: 35,
    homepage: 'https://wowup.io/',
    alternative_to: ''
  },

  // Developer & Database Tools
  {
    id: 'jetbrains-clion',
    name: 'CLion',
    category: 'Development',
    description: 'Professional cross-platform C/C++ IDE by JetBrains.',
    icon: 'jetbrains-clion-icon',
    linux_alternative: 'Native Linux Version / VS Code / Qt Creator',
    popularity: 45,
    homepage: 'https://www.jetbrains.com/clion/',
    alternative_to: ''
  },
  {
    id: 'jetbrains-rider',
    name: 'JetBrains Rider',
    category: 'Development',
    description: 'Fast, cross-platform .NET IDE by JetBrains.',
    icon: 'jetbrains-rider-icon',
    linux_alternative: 'Native Linux Version / VS Code',
    popularity: 45,
    homepage: 'https://www.jetbrains.com/rider/',
    alternative_to: ''
  },
  {
    id: 'jetbrains-rubymine',
    name: 'RubyMine',
    category: 'Development',
    description: 'Dedicated IDE for Ruby and Ruby on Rails development by JetBrains.',
    icon: 'jetbrains-rubymine-icon',
    linux_alternative: 'Native Linux Version / VS Code',
    popularity: 40,
    homepage: 'https://www.jetbrains.com/rubymine/',
    alternative_to: ''
  },
  {
    id: 'jetbrains-goland',
    name: 'GoLand',
    category: 'Development',
    description: 'Ergonomic Go programming language IDE by JetBrains.',
    icon: 'jetbrains-goland-icon',
    linux_alternative: 'Native Linux Version / VS Code',
    popularity: 40,
    homepage: 'https://www.jetbrains.com/go/',
    alternative_to: ''
  },
  {
    id: 'sourcetree-git',
    name: 'SourceTree',
    category: 'Development',
    description: 'Free Git and Mercurial client wrapper for Windows and macOS.',
    icon: 'sourcetree-git-icon',
    linux_alternative: 'GitKraken / SmartGit / lazygit / GNOME Gitg',
    popularity: 45,
    homepage: 'https://www.sourcetreeapp.com/',
    alternative_to: ''
  },
  {
    id: 'gitextensions',
    name: 'Git Extensions',
    category: 'Development',
    description: 'Standalone UI tool for managing Git repositories.',
    icon: 'gitextensions-icon',
    linux_alternative: 'Git Extensions via Mono / GitKraken / lazygit / QGit',
    popularity: 35,
    homepage: 'https://gitextensions.github.io/',
    alternative_to: ''
  },
  {
    id: 'fork-git',
    name: 'Fork',
    category: 'Development',
    description: 'Fast and friendly Git client for Windows and macOS.',
    icon: 'fork-git-icon',
    linux_alternative: 'GitKraken / SmartGit / lazygit',
    popularity: 40,
    homepage: 'https://git-fork.com/',
    alternative_to: ''
  },
  {
    id: 'tower-git',
    name: 'Tower',
    category: 'Development',
    description: 'Powerful Git client for macOS and Windows.',
    icon: 'tower-git-icon',
    linux_alternative: 'GitKraken / SmartGit / lazygit',
    popularity: 35,
    homepage: 'https://www.git-tower.com/',
    alternative_to: ''
  },
  {
    id: 'toad-oracle',
    name: 'Toad for Oracle',
    category: 'Development',
    description: 'Database management and development tool for Oracle DB.',
    icon: 'toad-oracle-icon',
    linux_alternative: 'DBeaver / Oracle SQL Developer',
    popularity: 35,
    homepage: 'https://www.quest.com/products/toad-for-oracle/',
    alternative_to: ''
  },
  {
    id: 'oracle-sql-developer',
    name: 'Oracle SQL Developer',
    category: 'Development',
    description: 'Free graphical tool for database development on Oracle Database.',
    icon: 'oracle-sql-developer-icon',
    linux_alternative: 'Native Linux Version / DBeaver',
    popularity: 40,
    homepage: 'https://www.oracle.com/database/technologies/appdev/sql-developer.html',
    alternative_to: ''
  },
  {
    id: 'navicat-premium',
    name: 'Navicat Premium',
    category: 'Development',
    description: 'Multi-connection database development and administration tool.',
    icon: 'navicat-premium-icon',
    linux_alternative: 'Native Linux Version / DBeaver / Beekeeper Studio',
    popularity: 40,
    homepage: 'https://www.navicat.com/en/products/navicat-premium',
    alternative_to: ''
  },
  {
    id: 'heidisql-db',
    name: 'HeidiSQL',
    category: 'Development',
    description: 'Lightweight open source database client for MariaDB, MySQL, MS SQL, and PostgreSQL.',
    icon: 'heidisql-db-icon',
    linux_alternative: 'HeidiSQL (via Wine) / DBeaver / Beekeeper Studio',
    popularity: 40,
    homepage: 'https://www.heidisql.com/',
    alternative_to: ''
  },
  {
    id: 'sqlite-expert-pro',
    name: 'SQLite Expert',
    category: 'Development',
    description: 'Visual tool for database administration and SQLite development.',
    icon: 'sqlite-expert-pro-icon',
    linux_alternative: 'DB Browser for SQLite / DBeaver',
    popularity: 35,
    homepage: 'http://www.sqliteexpert.com/',
    alternative_to: ''
  },
  {
    id: 'db-browser-sqlite',
    name: 'DB Browser for SQLite',
    category: 'Development',
    description: 'High quality, visual, open source tool to create, design, and edit SQLite database files.',
    icon: 'db-browser-sqlite-icon',
    linux_alternative: 'Native Linux Version|flathub:org.sqlitebrowser.sqlitebrowser',
    popularity: 45,
    homepage: 'https://sqlitebrowser.org/',
    alternative_to: ''
  },
  {
    id: 'sqlyog-mysql',
    name: 'SQLyog',
    category: 'Development',
    description: 'Powerful MySQL GUI administration tool for database administrators.',
    icon: 'sqlyog-mysql-icon',
    linux_alternative: 'DBeaver / Beekeeper Studio / MySQL Workbench',
    popularity: 35,
    homepage: 'https://webyog.com/product/sqlyog/',
    alternative_to: ''
  },
  {
    id: 'datagrip-db',
    name: 'DataGrip',
    category: 'Development',
    description: 'Multi-engine database IDE by JetBrains.',
    icon: 'datagrip-db-icon',
    linux_alternative: 'Native Linux Version / DBeaver / Beekeeper Studio',
    popularity: 40,
    homepage: 'https://www.jetbrains.com/datagrip/',
    alternative_to: ''
  },
  {
    id: 'tableplus-db',
    name: 'TablePlus',
    category: 'Development',
    description: 'Modern, native, and friendly GUI client for relational databases.',
    icon: 'tableplus-db-icon',
    linux_alternative: 'Native Linux Version / DBeaver / Beekeeper Studio',
    popularity: 40,
    homepage: 'https://tableplus.com/',
    alternative_to: ''
  },
  {
    id: 'dbvisualizer-db',
    name: 'DbVisualizer',
    category: 'Development',
    description: 'Universal database tool for developers, DBAs, and analysts.',
    icon: 'dbvisualizer-db-icon',
    linux_alternative: 'Native Linux Version / DBeaver',
    popularity: 35,
    homepage: 'https://www.dbvis.com/',
    alternative_to: ''
  },

  // Utility and Storage Sync
  {
    id: 'directory-opus',
    name: 'Directory Opus',
    category: 'Utilities',
    description: 'Advanced file manager replacement for Windows Explorer.',
    icon: 'directory-opus-icon',
    linux_alternative: 'Dolphin / Krusader / Double Commander',
    popularity: 40,
    homepage: 'https://www.gpsoft.com.au/',
    alternative_to: ''
  },
  {
    id: 'xyplorer-manager',
    name: 'XYplorer',
    category: 'Utilities',
    description: 'Tabbed file manager for Windows featuring powerful search and preview.',
    icon: 'xyplorer-manager-icon',
    linux_alternative: 'Dolphin / Double Commander / Thunar',
    popularity: 40,
    homepage: 'https://www.xyplorer.com/',
    alternative_to: ''
  },
  {
    id: 'total-commander',
    name: 'Total Commander',
    category: 'Utilities',
    description: 'Shareware orthostichous dual-panel file manager for Windows.',
    icon: 'total-commander-icon',
    linux_alternative: 'Double Commander / Krusader',
    popularity: 45,
    homepage: 'https://www.ghisler.com/',
    alternative_to: ''
  },
  {
    id: 'double-commander',
    name: 'Double Commander',
    category: 'Utilities',
    description: 'Cross-platform open source dual-panel file manager.',
    icon: 'double-commander-icon',
    linux_alternative: 'Native Linux Version|flathub:org.doublecmd.DoubleCmd / Krusader',
    popularity: 40,
    homepage: 'https://doublecmd.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'acronis-cyber-protect',
    name: 'Acronis Cyber Protect Home Office',
    category: 'Utilities',
    description: 'Full-system backup, disk cloning, and cybersecurity software.',
    icon: 'acronis-cyber-protect-icon',
    linux_alternative: 'Rescuezilla / Clonezilla',
    popularity: 40,
    homepage: 'https://www.acronis.com/',
    alternative_to: ''
  },
  {
    id: 'macrium-reflect-backup',
    name: 'Macrium Reflect',
    category: 'Utilities',
    description: 'Image-based backup and cloning software for Windows disks.',
    icon: 'macrium-reflect-backup-icon',
    linux_alternative: 'Rescuezilla / Clonezilla / Timeshift',
    popularity: 40,
    homepage: 'https://www.macrium.com/reflectfree',
    alternative_to: ''
  },
  {
    id: 'yumi-multiboot',
    name: 'YUMI',
    category: 'Utilities',
    description: 'Tool to create a Multiboot USB Flash Drive containing multiple ISO files.',
    icon: 'yumi-multiboot-icon',
    linux_alternative: 'Ventoy / Rufus',
    popularity: 40,
    homepage: 'https://www.pendrivelinux.com/yumi-multiboot-usb-creator/',
    alternative_to: ''
  },
  {
    id: 'universal-usb-installer',
    name: 'Universal USB Installer',
    category: 'Utilities',
    description: 'Bootable USB creator for installing Linux or Windows from ISOs.',
    icon: 'universal-usb-installer-icon',
    linux_alternative: 'Ventoy / BalenaEtcher / Rufus',
    popularity: 40,
    homepage: 'https://www.pendrivelinux.com/universal-usb-installer-easy-as-1-2-3/',
    alternative_to: ''
  },
  {
    id: 'windows-usb-dvd-tool',
    name: 'Windows USB/DVD Download Tool',
    category: 'Utilities',
    description: 'Legacy Microsoft tool to write Windows installation ISOs to USB/DVDs.',
    icon: 'windows-usb-dvd-tool-icon',
    linux_alternative: 'WoeUSB / Ventoy',
    popularity: 35,
    homepage: 'https://www.microsoft.com/en-us/download/details.aspx?id=56485',
    alternative_to: ''
  },
  {
    id: 'wintousb-tool',
    name: 'WinToUSB',
    category: 'Utilities',
    description: 'Creator of portable Windows (Windows To Go) USB drives.',
    icon: 'wintousb-tool-icon',
    linux_alternative: 'WoeUSB / Rufus',
    popularity: 35,
    homepage: 'https://www.easyuefi.com/wintousb/',
    alternative_to: ''
  },
  {
    id: 'cdburnerxp-burning',
    name: 'CDBurnerXP',
    category: 'Utilities',
    description: 'Free application to burn CDs and DVDs, including Blu-Ray and HD-DVDs.',
    icon: 'cdburnerxp-burning-icon',
    linux_alternative: 'K3b / Brasero',
    popularity: 40,
    homepage: 'https://cdburnerxp.se/',
    alternative_to: ''
  },
  {
    id: 'imgburn-tool',
    name: 'ImgBurn',
    category: 'Utilities',
    description: 'Lightweight CD/DVD/HD DVD/Blu-ray burning application.',
    icon: 'imgburn-tool-icon',
    linux_alternative: 'K3b',
    popularity: 45,
    homepage: 'https://www.imgburn.com/',
    alternative_to: ''
  },
  {
    id: 'nero-burning-rom',
    name: 'Nero Burning ROM',
    category: 'Utilities',
    description: 'Time-tested optical disc authoring and burning program.',
    icon: 'nero-burning-rom-icon',
    linux_alternative: 'K3b / Brasero',
    popularity: 40,
    homepage: 'https://www.nero.com/',
    alternative_to: ''
  },
  {
    id: 'ultraiso-tool',
    name: 'UltraISO',
    category: 'Utilities',
    description: 'Tool to create, edit, convert, and burn ISO CD/DVD image files.',
    icon: 'ultraiso-tool-icon',
    linux_alternative: 'AcetoneISO / Furius ISO Mount',
    popularity: 40,
    homepage: 'https://www.ezbsystems.com/ultraiso/',
    alternative_to: ''
  },
  {
    id: 'poweriso-tool',
    name: 'PowerISO',
    category: 'Utilities',
    description: 'CD/DVD/BD image file processing tool with mounting support.',
    icon: 'poweriso-tool-icon',
    linux_alternative: 'AcetoneISO / CDemu',
    popularity: 40,
    homepage: 'https://www.poweriso.com/',
    alternative_to: ''
  },
  {
    id: 'daemon-tools-lite',
    name: 'DAEMON Tools Lite',
    category: 'Utilities',
    description: 'Popular disk image emulation and virtual drive mounting software.',
    icon: 'daemon-tools-lite-icon',
    linux_alternative: 'AcetoneISO / CDemu / Furius ISO Mount',
    popularity: 45,
    homepage: 'https://www.daemon-tools.cc/',
    alternative_to: ''
  },
  {
    id: 'teracopy-tool',
    name: 'TeraCopy',
    category: 'Utilities',
    description: 'File copy utility designed to copy files faster and more securely.',
    icon: 'teracopy-tool-icon',
    linux_alternative: 'Ultracopier / Native file copy managers in Dolphin/Nautilus',
    popularity: 40,
    homepage: 'https://www.codesector.com/teracopy',
    alternative_to: ''
  },
  {
    id: 'fastcopy-tool',
    name: 'FastCopy',
    category: 'Utilities',
    description: 'Fast copy and delete software for Windows.',
    icon: 'fastcopy-tool-icon',
    linux_alternative: 'Ultracopier / rsync (CLI)',
    popularity: 40,
    homepage: 'https://fastcopy.jp/',
    alternative_to: ''
  },
  {
    id: 'goodsync-tool',
    name: 'GoodSync',
    category: 'Utilities',
    description: 'Backup and file synchronization software for computers and servers.',
    icon: 'goodsync-tool-icon',
    linux_alternative: 'FreeFileSync / rclone / Syncthing',
    popularity: 40,
    homepage: 'https://www.goodsync.com/',
    alternative_to: ''
  },
  {
    id: 'syncback-free',
    name: 'SyncBack',
    category: 'Utilities',
    description: 'Local backup and restore synchronization utility.',
    icon: 'syncback-free-icon',
    linux_alternative: 'FreeFileSync / BorgBackup / rsync',
    popularity: 40,
    homepage: 'https://www.2brightsparks.com/freeware/freeware-hub.html',
    alternative_to: ''
  },
  {
    id: 'resilio-sync-app',
    name: 'Resilio Sync',
    category: 'Utilities',
    description: 'Peer-to-peer file synchronization tool based on the BitTorrent protocol.',
    icon: 'resilio-sync-app-icon',
    linux_alternative: 'Syncthing',
    popularity: 40,
    homepage: 'https://www.resilio.com/',
    alternative_to: ''
  },
  {
    id: 'utorrent-client',
    name: 'µTorrent',
    category: 'Utilities',
    description: 'Closed-source, lightweight BitTorrent client with global popularity.',
    icon: 'utorrent-client-icon',
    linux_alternative: 'qBittorrent / Transmission / Deluge',
    popularity: 45,
    homepage: 'https://www.utorrent.com/',
    alternative_to: ''
  },
  {
    id: 'bittorrent-classic',
    name: 'BitTorrent Classic',
    category: 'Utilities',
    description: 'Original desktop BitTorrent client program.',
    icon: 'bittorrent-classic-icon',
    linux_alternative: 'qBittorrent / Transmission / Deluge',
    popularity: 40,
    homepage: 'https://www.bittorrent.com/',
    alternative_to: ''
  },
  {
    id: 'vuze-bittorrent',
    name: 'Vuze',
    category: 'Utilities',
    description: 'Java-based media-rich BitTorrent client (formerly Azureus).',
    icon: 'vuze-bittorrent-icon',
    linux_alternative: 'qBittorrent / Deluge',
    popularity: 40,
    homepage: 'http://www.vuze.com/',
    alternative_to: ''
  },
  {
    id: 'tixati-bittorrent',
    name: 'Tixati',
    category: 'Utilities',
    description: 'Closed-source detailed peer-to-peer file sharing client.',
    icon: 'tixati-bittorrent-icon',
    linux_alternative: 'qBittorrent / Transmission',
    popularity: 40,
    homepage: 'https://www.tixati.com/',
    alternative_to: ''
  },
  {
    id: 'internet-download-manager',
    name: 'Internet Download Manager (IDM)',
    category: 'Utilities',
    description: 'Shareware download accelerator and manager with browser integrations.',
    icon: 'internet-download-manager-icon',
    linux_alternative: 'Xtreme Download Manager (XDM) / Persepolis / aria2',
    popularity: 45,
    homepage: 'https://www.internetdownloadmanager.com/',
    alternative_to: ''
  },
  {
    id: 'free-download-manager',
    name: 'Free Download Manager (FDM)',
    category: 'Utilities',
    description: 'Download manager featuring bandwidth control and torrent support.',
    icon: 'free-download-manager-icon',
    linux_alternative: 'Free Download Manager (Linux native version) / Motrix / XDM',
    popularity: 40,
    homepage: 'https://www.freedownloadmanager.org/',
    alternative_to: ''
  },
  {
    id: 'eagleget-download',
    name: 'EagleGet',
    category: 'Utilities',
    description: 'Lightweight download manager for Windows with media grabbing features.',
    icon: 'eagleget-download-icon',
    linux_alternative: 'XDM / Motrix',
    popularity: 35,
    homepage: 'http://www.eagleget.com/',
    alternative_to: ''
  },
  {
    id: 'clipgrab-downloader',
    name: 'ClipGrab',
    category: 'Utilities',
    description: 'YouTube downloader and video converter utility.',
    icon: 'clipgrab-downloader-icon',
    linux_alternative: 'ClipGrab (Linux native version) / yt-dlp (CLI)',
    popularity: 40,
    homepage: 'https://clipgrab.org/',
    alternative_to: ''
  },
  {
    id: 'four-k-video-downloader',
    name: '4K Video Downloader',
    category: 'Utilities',
    description: 'Multi-source high quality video downloading utility.',
    icon: 'four-k-video-downloader-icon',
    linux_alternative: '4K Video Downloader (Linux native version) / yt-dlp',
    popularity: 45,
    homepage: 'https://www.4kdownload.com/products/videodownloader-42',
    alternative_to: ''
  },

  // Editors
  {
    id: 'editplus-editor',
    name: 'EditPlus',
    category: 'Development',
    description: 'Text editor with built-in FTP, FTPS, and sftp capabilities.',
    icon: 'editplus-editor-icon',
    linux_alternative: 'VS Code / Geany',
    popularity: 40,
    homepage: 'https://www.editplus.com/',
    alternative_to: ''
  },
  {
    id: 'emeditor-text',
    name: 'EmEditor',
    category: 'Development',
    description: 'Fast, lightweight text editor designed to handle large file sizes.',
    icon: 'emeditor-text-icon',
    linux_alternative: 'Kate / VS Code',
    popularity: 40,
    homepage: 'https://www.emeditor.com/',
    alternative_to: ''
  },
  {
    id: 'brackets-editor',
    name: 'Brackets',
    category: 'Development',
    description: 'Modern open-source text editor with focus on web design.',
    icon: 'brackets-editor-icon',
    linux_alternative: 'VS Code / Pulsar',
    popularity: 40,
    homepage: 'http://brackets.io/',
    alternative_to: ''
  },
  {
    id: 'adobe-dreamweaver',
    name: 'Adobe Dreamweaver',
    category: 'Design',
    description: 'Proprietary web development tool and HTML editor.',
    icon: 'adobe-dreamweaver-icon',
    linux_alternative: 'VS Code / Bluefish / Pinegrow',
    popularity: 40,
    homepage: 'https://www.adobe.com/products/dreamweaver.html',
    alternative_to: ''
  },
  {
    id: 'microsoft-frontpage',
    name: 'Microsoft FrontPage',
    category: 'Development',
    description: 'Legacy WYSIWYG HTML editor and website administration tool.',
    icon: 'microsoft-frontpage-icon',
    linux_alternative: 'Bluefish / KompoZer (legacy)',
    popularity: 30,
    homepage: 'https://www.microsoft.com/',
    alternative_to: ''
  },
  {
    id: 'expression-web',
    name: 'Expression Web',
    category: 'Development',
    description: 'HTML editor and web design software product by Microsoft.',
    icon: 'expression-web-icon',
    linux_alternative: 'VS Code / Bluefish',
    popularity: 35,
    homepage: 'https://www.microsoft.com/',
    alternative_to: ''
  },
  {
    id: 'komodo-edit',
    name: 'Komodo Edit',
    category: 'Development',
    description: 'Free and open-source text editor for dynamic programming languages.',
    icon: 'komodo-edit-icon',
    linux_alternative: 'VS Code / Geany',
    popularity: 40,
    homepage: 'https://github.com/Komodo/KomodoEdit',
    alternative_to: ''
  },

  // Multimedia & Conversions
  {
    id: 'super-encoder',
    name: 'SUPER',
    category: 'Utilities',
    description: 'Graphic frontend encoder for converting media files.',
    icon: 'super-encoder-icon',
    linux_alternative: 'HandBrake / WinFF / Ciano',
    popularity: 40,
    homepage: 'http://www.erightsoft.com/SUPER.html',
    alternative_to: ''
  },
  {
    id: 'ciano-converter',
    name: 'Ciano',
    category: 'Utilities',
    description: 'Simple multimedia transcoder converter.',
    icon: 'ciano-converter-icon',
    linux_alternative: 'Native Linux Version|flathub:com.github.robertsanseries.ciano / HandBrake',
    popularity: 40,
    homepage: 'https://github.com/robertsanseries/ciano',
    alternative_to: ''
  },
  {
    id: 'winff-ffmpeg',
    name: 'WinFF',
    category: 'Utilities',
    description: 'Video converter GUI tool for FFmpeg.',
    icon: 'winff-ffmpeg-icon',
    linux_alternative: 'Native Linux Version / HandBrake',
    popularity: 40,
    homepage: 'https://github.com/WinFF/winff',
    alternative_to: ''
  },
  {
    id: 'xmedia-recode-tool',
    name: 'XMedia Recode',
    category: 'Utilities',
    description: 'Free video converter and audio transcoder.',
    icon: 'xmedia-recode-tool-icon',
    linux_alternative: 'HandBrake / Ciano',
    popularity: 40,
    homepage: 'https://xmedia-recode.de/en/',
    alternative_to: ''
  },
  {
    id: 'staxrip-tool',
    name: 'StaxRip Video Encoder',
    category: 'Utilities',
    description: 'Powerful video transcoding program.',
    icon: 'staxrip-tool-icon',
    linux_alternative: 'HandBrake / Avidemux',
    popularity: 40,
    homepage: 'https://github.com/staxrip/staxrip',
    alternative_to: ''
  },
  {
    id: 'megui-tool',
    name: 'MeGUI Audio/Video transcoder',
    category: 'Utilities',
    description: 'Specialized video encoding software supporting MPEG-4.',
    icon: 'megui-tool-icon',
    linux_alternative: 'HandBrake / Avidemux',
    popularity: 40,
    homepage: 'https://sourceforge.net/projects/megui/',
    alternative_to: ''
  },
  {
    id: 'lamexp-tool',
    name: 'LameXP Audio Encoder',
    category: 'Audio',
    description: 'Graphical user interface for LAME, Ogg Vorbis, and FLAC encoders.',
    icon: 'lamexp-tool-icon',
    linux_alternative: 'SoundKonverter / Audacity',
    popularity: 40,
    homepage: 'https://lamexp.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'dbpoweramp-tool',
    name: 'dBpoweramp Music Converter',
    category: 'Audio',
    description: 'Premium secure ripping and audio conversion utility.',
    icon: 'dbpoweramp-tool-icon',
    linux_alternative: 'SoundKonverter / Asunder',
    popularity: 40,
    homepage: 'https://www.dbpoweramp.com/',
    alternative_to: ''
  },
  {
    id: 'mediamonkey-player-app',
    name: 'MediaMonkey Media Organizer',
    category: 'Audio',
    description: 'Serious collector organizer for music and movie files.',
    icon: 'mediamonkey-player-app-icon',
    linux_alternative: 'MediaMonkey under Wine / Strawberry / Rhythmbox',
    popularity: 40,
    homepage: 'https://www.mediamonkey.com/',
    alternative_to: ''
  },

  // Design assets
  {
    id: 'adobe-bridge',
    name: 'Adobe Bridge',
    category: 'Design',
    description: 'Creative asset manager for previewing, organizing, and editing metadata.',
    icon: 'adobe-bridge-icon',
    linux_alternative: 'Digikam / Darktable / Rapid Photo Downloader',
    popularity: 40,
    homepage: 'https://www.adobe.com/products/bridge.html',
    alternative_to: ''
  },
  {
    id: 'adobe-xd',
    name: 'Adobe XD',
    category: 'Design',
    description: 'Vector-based user experience design tool for web and mobile apps.',
    icon: 'adobe-xd-icon',
    linux_alternative: 'Penpot / Figma (Web) / Adobe XD via Wine',
    popularity: 40,
    homepage: 'https://www.adobe.com/products/xd.html',
    alternative_to: ''
  },
  {
    id: 'adobe-fresco',
    name: 'Adobe Fresco',
    category: 'Design',
    description: 'Digital drawing and painting app designed for stylus and touch devices.',
    icon: 'adobe-fresco-icon',
    linux_alternative: 'Krita / MyPaint',
    popularity: 40,
    homepage: 'https://www.adobe.com/products/fresco.html',
    alternative_to: ''
  },
  {
    id: 'adobe-character-animator',
    name: 'Adobe Character Animator',
    category: 'Design',
    description: 'Desktop application software that combines live motion-capture with a multi-track recording system.',
    icon: 'adobe-character-animator-icon',
    linux_alternative: 'Blender / Synfig Studio',
    popularity: 40,
    homepage: 'https://www.adobe.com/products/character-animator.html',
    alternative_to: ''
  },

  // Archivers & Interior Design
  {
    id: 'peazip-archiver',
    name: 'PeaZip',
    category: 'Utilities',
    description: 'Free file archiver utility and rar extractor.',
    icon: 'peazip-archiver-icon',
    linux_alternative: 'Native Linux Version|flathub:io.github.peazip.PeaZip / Ark',
    popularity: 45,
    homepage: 'https://peazip.github.io/',
    alternative_to: ''
  },
  {
    id: 'bandizip-archiver',
    name: 'Bandizip',
    category: 'Utilities',
    description: 'Fast archiver utility supporting zip, rar, 7z, and iso formats.',
    icon: 'bandizip-archiver-icon',
    linux_alternative: 'PeaZip / Ark / File Roller',
    popularity: 40,
    homepage: 'https://www.bandisoft.com/bandizip/',
    alternative_to: ''
  },
  {
    id: 'b1-free-archiver',
    name: 'B1 Free Archiver',
    category: 'Utilities',
    description: 'Multi-platform archive creator and manager.',
    icon: 'b1-free-archiver-icon',
    linux_alternative: 'PeaZip / Ark',
    popularity: 35,
    homepage: 'http://b1.org/',
    alternative_to: ''
  },
  {
    id: 'winzip-archiver',
    name: 'WinZip',
    category: 'Utilities',
    description: 'Classic trialware file archiver and compressor.',
    icon: 'winzip-archiver-icon',
    linux_alternative: 'Ark / PeaZip / File Roller',
    popularity: 45,
    homepage: 'https://www.winzip.com/',
    alternative_to: ''
  },
  {
    id: 'sweet-home-3d',
    name: 'Sweet Home 3D',
    category: 'Design',
    description: 'Free interior design application that helps you draw the plan of your house.',
    icon: 'sweet-home-3d-icon',
    linux_alternative: 'Native Linux Version|flathub:net.sourceforge.Sweethome3d',
    popularity: 45,
    homepage: 'http://www.sweethomed3d.com/',
    alternative_to: ''
  },
  {
    id: 'lumion-architect',
    name: 'Lumion 3D',
    category: 'Design',
    description: '3D architectural rendering software for designers.',
    icon: 'lumion-architect-icon',
    linux_alternative: 'Blender / Unreal Engine / Twinmotion',
    popularity: 40,
    homepage: 'https://lumion.com/',
    alternative_to: ''
  },
  {
    id: 'microstation-bentley',
    name: 'Bentley MicroStation',
    category: 'Engineering',
    description: 'Infrastructure design software platform.',
    icon: 'microstation-bentley-icon',
    linux_alternative: 'FreeCAD / QCad',
    popularity: 40,
    homepage: 'https://www.bentley.com/software/microstation/',
    alternative_to: ''
  },
  {
    id: 'mcedit-world',
    name: 'MCEdit Minecraft Editor',
    category: 'Games',
    description: 'World editor for Minecraft maps.',
    icon: 'mcedit-world-icon',
    linux_alternative: 'Amulet Map Editor',
    popularity: 35,
    homepage: 'https://www.mcedit.net/',
    alternative_to: ''
  },
  {
    id: 'worldpainter-map',
    name: 'WorldPainter Minecraft Map Generator',
    category: 'Games',
    description: 'Map generator painter for Minecraft game maps.',
    icon: 'worldpainter-map-icon',
    linux_alternative: 'Native Linux Version (Java Jar)',
    popularity: 35,
    homepage: 'https://www.worldpainter.net/',
    alternative_to: ''
  },
  {
    id: 'singularity-addon',
    name: 'Singularity Addon Manager',
    category: 'Games',
    description: 'Addon manager client for World of Warcraft.',
    icon: 'singularity-addon-icon',
    linux_alternative: 'Native Linux Version / WowUp',
    popularity: 35,
    homepage: 'https://singularitymods.com/',
    alternative_to: ''
  },
  {
    id: 'ajour-wow',
    name: 'Ajour WoW Addon Manager',
    category: 'Games',
    description: 'World of Warcraft addon manager and updater.',
    icon: 'ajour-wow-icon',
    linux_alternative: 'Native Linux Version / CurseForge',
    popularity: 35,
    homepage: 'https://github.com/ajour/ajour',
    alternative_to: ''
  },

  // 20 Extra unique apps to exceed 100 limit easily
  {
    id: 'xmplay-audio',
    name: 'XMPlay',
    category: 'Audio',
    description: 'Ultra-lightweight audio player supporting a wide variety of audio formats and skins.',
    icon: 'xmplay-audio-icon',
    linux_alternative: 'Audacious / DeaDBeeF',
    popularity: 35,
    homepage: 'https://www.un4seen.com/xmplay.html',
    alternative_to: ''
  },
  {
    id: 'alsong-lyrics',
    name: 'ALSong',
    category: 'Audio',
    description: 'Music player that displays synchronized lyrics for playing audio files.',
    icon: 'alsong-lyrics-icon',
    linux_alternative: 'Audacious (with lyrics plugins) / OpenLyrics',
    popularity: 30,
    homepage: 'https://www.altools.com/',
    alternative_to: ''
  },
  {
    id: 'gom-audio-player',
    name: 'GOM Audio',
    category: 'Audio',
    description: 'High-quality music player designed to play audio tracks with sync lyrics.',
    icon: 'gom-audio-player-icon',
    linux_alternative: 'Audacious / Strawberry',
    popularity: 35,
    homepage: 'https://www.gomlab.com/gomaudio-music-player/',
    alternative_to: ''
  },
  {
    id: 'nopaystation-client',
    name: 'NoPayStation Desktop',
    category: 'Utilities',
    description: 'Utility to download game packages and updates from PlayStation CDN.',
    icon: 'nopaystation-client-icon',
    linux_alternative: 'PKGi / NoPayStation Web Client',
    popularity: 35,
    homepage: 'https://nopaystation.com/',
    alternative_to: ''
  },
  {
    id: 'hakuneko-manga',
    name: 'HakuNeko',
    category: 'Utilities',
    description: 'Multi-source downloader for manga and anime from various websites.',
    icon: 'hakuneko-manga-icon',
    linux_alternative: 'Native Linux Version|flathub:io.github.manga_download.HakuNeko / Tachiyomi',
    popularity: 40,
    homepage: 'https://hakuneko.github.io/',
    alternative_to: ''
  },
  {
    id: 'free-manga-downloader-2',
    name: 'Free Manga Downloader 2 (FMD2)',
    category: 'Utilities',
    description: 'Open-source manga downloader client supporting dozens of sites.',
    icon: 'free-manga-downloader-2-icon',
    linux_alternative: 'HakuNeko / Manga Downloader',
    popularity: 35,
    homepage: 'https://github.com/riderkick/FMD2',
    alternative_to: ''
  },
  {
    id: 'manga-downloader-app',
    name: 'Manga Downloader',
    category: 'Utilities',
    description: "Tool to search, view and download manga chapters.",
    icon: 'manga-downloader-app-icon',
    linux_alternative: 'HakuNeko / FMD2',
    popularity: 35,
    homepage: 'https://github.com/manga-download/manga-downloader',
    alternative_to: ''
  },
  {
    id: 'hard-disk-sentinel',
    name: 'Hard Disk Sentinel',
    category: 'Utilities',
    description: 'Multi-OS SSD and HDD monitoring and analysis software.',
    icon: 'hard-disk-sentinel-icon',
    linux_alternative: 'GNOME Disks / GSmartControl / smartctl',
    popularity: 40,
    homepage: 'https://www.hdsentinel.com/',
    alternative_to: ''
  },
  {
    id: 'atto-disk-benchmark',
    name: 'ATTO Disk Benchmark',
    category: 'Utilities',
    description: 'Popular disk performance and transfer speed measurement tool.',
    icon: 'atto-disk-benchmark-icon',
    linux_alternative: 'KDiskMark / GNOME Disks benchmark',
    popularity: 35,
    homepage: 'https://www.atto.com/disk-benchmark/',
    alternative_to: ''
  },
  {
    id: 'nvidia-inspector',
    name: 'NVIDIA Inspector',
    category: 'Utilities',
    description: 'Lightweight utility that provides detailed hardware information and overclocking for NVIDIA GPUs.',
    icon: 'nvidia-inspector-icon',
    linux_alternative: 'GreenWithEnvy (GWE) / nvidia-settings',
    popularity: 35,
    homepage: 'https://www.guru3d.com/files-details/nvidia-inspector-download.html',
    alternative_to: ''
  },
  {
    id: 'green-with-envy-gwe',
    name: 'GreenWithEnvy',
    category: 'Utilities',
    description: 'Linux utility to manage and overclock NVIDIA graphics cards.',
    icon: 'green-with-envy-gwe-icon',
    linux_alternative: 'Native Linux Version|flathub:com.leinardi.gwe',
    popularity: 40,
    homepage: 'https://gitlab.com/leinardi/gwe',
    alternative_to: ''
  },
  {
    id: 'nicehash-quickminer',
    name: 'NiceHash QuickMiner',
    category: 'Utilities',
    description: 'One-click cryptocurrency mining software for NVIDIA and AMD cards.',
    icon: 'nicehash-quickminer-icon',
    linux_alternative: 'Kryptex / Native Linux miners (XMRig, lolminer)',
    popularity: 30,
    homepage: 'https://www.nicehash.com/quickminer',
    alternative_to: ''
  },
  {
    id: 'kryptex-miner',
    name: 'Kryptex',
    category: 'Utilities',
    description: "Crypto mining software that pays you bitcoins for your computer's processing power.",
    icon: 'kryptex-miner-icon',
    linux_alternative: 'Kryptex Web client / XMRig / lolMiner',
    popularity: 35,
    homepage: 'https://www.kryptex.com/',
    alternative_to: ''
  },
  {
    id: 'claymore-dual-miner',
    name: 'Claymore Dual Miner',
    category: 'Utilities',
    description: 'High performance Ethereum and Altcoin GPU miner tool.',
    icon: 'claymore-dual-miner-icon',
    linux_alternative: 'lolMiner / TeamRedMiner / PhoenixMiner',
    popularity: 30,
    homepage: 'https://github.com/claymore-dual/claymore',
    alternative_to: ''
  },
  {
    id: 'team-red-miner',
    name: 'TeamRedMiner',
    category: 'Utilities',
    description: 'Optimized AMD GPU cryptocurrency mining client.',
    icon: 'team-red-miner-icon',
    linux_alternative: 'Native Linux Version / lolMiner',
    popularity: 35,
    homepage: 'https://github.com/todxx/teamredminer',
    alternative_to: ''
  },
  {
    id: 'phoenix-miner-tool',
    name: 'PhoenixMiner',
    category: 'Utilities',
    description: 'Highly optimized Ethereum/Ethash GPU miner.',
    icon: 'phoenix-miner-tool-icon',
    linux_alternative: 'Native Linux Version / lolMiner',
    popularity: 35,
    homepage: 'https://phoenixminer.info/',
    alternative_to: ''
  },
  {
    id: 'lolminer-tool',
    name: 'lolMiner',
    category: 'Utilities',
    description: 'Multi-algorithm GPU cryptocurrency miner with Focus on AMD/NVIDIA.',
    icon: 'lolminer-tool-icon',
    linux_alternative: 'Native Linux Version',
    popularity: 40,
    homepage: 'https://github.com/Lolliedieb/lolMiner-releases',
    alternative_to: ''
  },
  {
    id: 'xmrig-miner-app',
    name: 'XMRig',
    category: 'Utilities',
    description: 'High performance, open source CPU/GPU miner for RandomX and other algorithms.',
    icon: 'xmrig-miner-app-icon',
    linux_alternative: 'Native Linux Version|flathub:com.xmrig.XMRig',
    popularity: 45,
    homepage: 'https://xmrig.com/',
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
