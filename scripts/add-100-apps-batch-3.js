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
    id: 'curseforge-app',
    name: 'CurseForge Desktop App',
    category: 'Games',
    description: 'Mod and addon manager for Minecraft, WoW, and other titles.',
    icon: 'curseforge-app-icon',
    linux_alternative: 'Prism Launcher / WowUp / CurseForge (Linux native app)',
    popularity: 45,
    homepage: 'https://www.curseforge.com/',
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
  {
    id: 'raidrive-mount',
    name: 'RaiDrive',
    category: 'Utilities',
    description: 'Mounts cloud drives (Google Drive, OneDrive, Dropbox, SFTP) as local Windows drives.',
    icon: 'raidrive-mount-icon',
    linux_alternative: 'Rclone (rclone mount) / KIO GDrive',
    popularity: 35,
    homepage: 'https://www.raidrive.com/',
    alternative_to: ''
  },
  {
    id: 'mountain-duck',
    name: 'Mountain Duck',
    category: 'Utilities',
    description: 'Disk mounting tool for cloud storage resources on Windows and macOS.',
    icon: 'mountain-duck-icon',
    linux_alternative: 'Rclone / FileZilla',
    popularity: 35,
    homepage: 'https://mountainduck.io/',
    alternative_to: ''
  },
  {
    id: 'cyberduck-ftp',
    name: 'Cyberduck',
    category: 'Utilities',
    description: 'Libre FTP, SFTP, WebDAV, Amazon S3 and Cloud Files browser.',
    icon: 'cyberduck-ftp-icon',
    linux_alternative: 'FileZilla / Cyberduck (CLI version on Linux)',
    popularity: 40,
    homepage: 'https://cyberduck.io/',
    alternative_to: ''
  },
  {
    id: 'winscp-ftp',
    name: 'WinSCP',
    category: 'Utilities',
    description: 'Popular SFTP, FTP, WebDAV and S3 client for file transfers.',
    icon: 'winscp-ftp-icon',
    linux_alternative: 'FileZilla / Krusader / Dolphin (SFTP integrated)',
    popularity: 45,
    homepage: 'https://winscp.net/',
    alternative_to: ''
  },
  {
    id: 'flashfxp-ftp',
    name: 'FlashFXP',
    category: 'Utilities',
    description: 'Shareware FTP client featuring site-to-site file transfer capabilities.',
    icon: 'flashfxp-ftp-icon',
    linux_alternative: 'FileZilla / gFTP',
    popularity: 30,
    homepage: 'https://www.flashfxp.com/',
    alternative_to: ''
  },
  {
    id: 'smartftp-client',
    name: 'SmartFTP',
    category: 'Utilities',
    description: 'FTP, SFTP, WebDAV and cloud file transfer program.',
    icon: 'smartftp-client-icon',
    linux_alternative: 'FileZilla',
    popularity: 30,
    homepage: 'https://www.smartftp.com/',
    alternative_to: ''
  },
  {
    id: 'cuteftp-client',
    name: 'CuteFTP',
    category: 'Utilities',
    description: 'Commercial FTP client for transferring files securely.',
    icon: 'cuteftp-client-icon',
    linux_alternative: 'FileZilla',
    popularity: 30,
    homepage: 'https://www.globalscape.com/cuteftp',
    alternative_to: ''
  },
  {
    id: 'coreftp-client',
    name: 'Core FTP',
    category: 'Utilities',
    description: 'Free and commercial SSL/TLS FTP client program.',
    icon: 'coreftp-client-icon',
    linux_alternative: 'FileZilla',
    popularity: 30,
    homepage: 'http://www.coreftp.com/',
    alternative_to: ''
  },
  {
    id: 'opentrack-headtrack',
    name: 'Opentrack',
    category: 'Utilities',
    description: 'Real-time head tracking software for simulator games.',
    icon: 'opentrack-headtrack-icon',
    linux_alternative: 'Native Linux Version (Opentrack has official Linux builds)',
    popularity: 35,
    homepage: 'https://github.com/opentrack/opentrack',
    alternative_to: ''
  },
  {
    id: 'voiceattack-games',
    name: 'VoiceAttack',
    category: 'Utilities',
    description: 'Control game actions and inputs with your voice.',
    icon: 'voiceattack-games-icon',
    linux_alternative: 'Taz / Craven / Lovo',
    popularity: 35,
    homepage: 'https://voiceattack.com/',
    alternative_to: ''
  },
  {
    id: 'voicemeeter-potato',
    name: 'VoiceMeeter Potato',
    category: 'Audio',
    description: 'Virtual Audio Mixer with 5 physical inputs/outputs and 3 virtual audio cards.',
    icon: 'voicemeeter-potato-icon',
    linux_alternative: 'PipeWire / qpwgraph / Helvum',
    popularity: 40,
    homepage: 'https://vb-audio.com/Voicemeeter/potato.htm',
    alternative_to: ''
  },
  {
    id: 'vb-audio-cable',
    name: 'VB-Audio Virtual Cable',
    category: 'Audio',
    description: 'Audio driver that acts as virtual audio cable for transferring streams.',
    icon: 'vb-audio-cable-icon',
    linux_alternative: 'PipeWire virtual sinks / Loopback modules',
    popularity: 45,
    homepage: 'https://vb-audio.com/Cable/',
    alternative_to: ''
  },
  {
    id: 'virtual-audio-cable',
    name: 'Virtual Audio Cable (VAC)',
    category: 'Audio',
    description: 'Audio driver creating virtual loopback devices to transfer audio streams.',
    icon: 'virtual-audio-cable-icon',
    linux_alternative: 'PipeWire virtual loopback devices',
    popularity: 40,
    homepage: 'https://vac.muromec.org.ua/',
    alternative_to: ''
  },
  {
    id: 'equalizer-apo',
    name: 'Equalizer APO',
    category: 'Audio',
    description: 'System-wide parametric equalizer for Windows audio streams.',
    icon: 'equalizer-apo-icon',
    linux_alternative: 'EasyEffects / JamesDSP',
    popularity: 45,
    homepage: 'https://sourceforge.net/projects/equalizerapo/',
    alternative_to: ''
  },
  {
    id: 'peace-equalizer',
    name: 'Peace Equalizer',
    category: 'Audio',
    description: 'Graphical interface wrapper for Equalizer APO settings.',
    icon: 'peace-equalizer-icon',
    linux_alternative: 'EasyEffects / JamesDSP',
    popularity: 45,
    homepage: 'https://sourceforge.net/projects/peace-equalizer-apo-extension/',
    alternative_to: ''
  },
  {
    id: 'sonarworks-soundid',
    name: 'SoundID Reference',
    category: 'Audio',
    description: 'Sound calibration software that measures and calibrates studio monitors and headphones.',
    icon: 'sonarworks-soundid-icon',
    linux_alternative: 'EasyEffects (convolver with AutoEq impulse files)',
    popularity: 40,
    homepage: 'https://www.sonarworks.com/soundid-reference',
    alternative_to: ''
  },
  {
    id: 'room-eq-wizard',
    name: 'Room EQ Wizard (REW)',
    category: 'Audio',
    description: 'Room acoustics measurement and analysis software.',
    icon: 'room-eq-wizard-icon',
    linux_alternative: 'Native Linux Version / Room EQ Wizard (Java)',
    popularity: 45,
    homepage: 'https://www.roomeqwizard.com/',
    alternative_to: ''
  },
  {
    id: 'dirac-live',
    name: 'Dirac Live',
    category: 'Audio',
    description: 'Professional acoustic room correction software.',
    icon: 'dirac-live-icon',
    linux_alternative: 'Dirac Live via Wine / EasyEffects convolver',
    popularity: 40,
    homepage: 'https://www.dirac.com/live/',
    alternative_to: ''
  },
  {
    id: 'dolby-access',
    name: 'Dolby Access',
    category: 'Audio',
    description: 'Spatial audio software enabling Dolby Atmos sound.',
    icon: 'dolby-access-icon',
    linux_alternative: 'EasyEffects (spatializer plugins)',
    popularity: 45,
    homepage: 'https://apps.microsoft.com/detail/9n0866fs04w8',
    alternative_to: ''
  },
  {
    id: 'dts-sound-unbound',
    name: 'DTS Sound Unbound',
    category: 'Audio',
    description: 'Spatial audio headphone plugin for games and movie tracks.',
    icon: 'dts-sound-unbound-icon',
    linux_alternative: 'EasyEffects (spatializer plugins)',
    popularity: 45,
    homepage: 'https://apps.microsoft.com/detail/9pj0nkl8mcsj',
    alternative_to: ''
  },
  {
    id: 'voicemod-changer',
    name: 'Voicemod',
    category: 'Audio',
    description: 'Real-time voice changer software with soundboard capabilities.',
    icon: 'voicemod-changer-icon',
    linux_alternative: 'Lyrebird / Clownfish via Wine / EasyEffects voice mods',
    popularity: 45,
    homepage: 'https://www.voicemod.net/',
    alternative_to: ''
  },
  {
    id: 'clownfish-voice',
    name: 'Clownfish Voice Changer',
    category: 'Audio',
    description: 'System-wide simple voice changer utility.',
    icon: 'clownfish-voice-icon',
    linux_alternative: 'Lyrebird / EasyEffects',
    popularity: 35,
    homepage: 'https://clownfish-translator.com/voicechanger/',
    alternative_to: ''
  },
  {
    id: 'morphvox-pro',
    name: 'MorphVOX Pro',
    category: 'Audio',
    description: 'Premium voice changing software tool for online gaming.',
    icon: 'morphvox-pro-icon',
    linux_alternative: 'Lyrebird / EasyEffects',
    popularity: 35,
    homepage: 'https://screamingbee.com/morphvox-voice-changer/',
    alternative_to: ''
  },
  {
    id: 'soundpad-voice',
    name: 'Soundpad',
    category: 'Audio',
    description: 'Media player that lets you play sounds through audio inputs and voice chats.',
    icon: 'soundpad-voice-icon',
    linux_alternative: 'Soundux / Lyrebird',
    popularity: 45,
    homepage: 'https://www.leppsoft.com/soundpad/',
    alternative_to: ''
  },
  {
    id: 'soundux-soundboard',
    name: 'Soundux',
    category: 'Audio',
    description: 'Open source soundboard application for playing sound clips.',
    icon: 'soundux-soundboard-icon',
    linux_alternative: 'Native Linux Version|flathub:io.github.soundux.Soundux',
    popularity: 45,
    homepage: 'https://soundux.rocks/',
    alternative_to: ''
  },
  {
    id: 'serato-dj-pro',
    name: 'Serato DJ Pro',
    category: 'Audio',
    description: 'Professional DJ software with multi-deck mixing and library management.',
    icon: 'serato-dj-pro-icon',
    linux_alternative: 'Mixxx / Serato DJ under Wine',
    popularity: 45,
    homepage: 'https://serato.com/dj/pro',
    alternative_to: ''
  },
  {
    id: 'traktor-pro-dj',
    name: 'Traktor Pro',
    category: 'Audio',
    description: 'Four-deck DJ software developed by Native Instruments.',
    icon: 'traktor-pro-dj-icon',
    linux_alternative: 'Mixxx / Traktor Pro under Wine',
    popularity: 45,
    homepage: 'https://www.native-instruments.com/en/products/traktor/dj-software/traktor-pro-3/',
    alternative_to: ''
  },
  {
    id: 'rekordbox-dj',
    name: 'Rekordbox',
    category: 'Audio',
    description: 'DJ performance and music library management system by Pioneer DJ.',
    icon: 'rekordbox-dj-icon',
    linux_alternative: 'Mixxx / Rekordbox under Wine',
    popularity: 45,
    homepage: 'https://rekordbox.com/',
    alternative_to: ''
  },
  {
    id: 'ableton-live-suite',
    name: 'Ableton Live',
    category: 'Audio',
    description: 'Professional DAW focused on music production, live performance, and sequencing.',
    icon: 'ableton-live-suite-icon',
    linux_alternative: 'Ableton via Wine / Bitwig Studio / Reaper',
    popularity: 45,
    homepage: 'https://www.ableton.com/',
    alternative_to: ''
  },
  {
    id: 'reason-studios-daw',
    name: 'Reason Studios',
    category: 'Audio',
    description: 'Modular synthesizer rack and DAW workspace.',
    icon: 'reason-studios-daw-icon',
    linux_alternative: 'Reason via Wine / Bitwig Studio',
    popularity: 45,
    homepage: 'https://www.reasonstudios.com/',
    alternative_to: ''
  },
  {
    id: 'cubase-daw',
    name: 'Cubase',
    category: 'Audio',
    description: 'Advanced digital audio workstation for composition, sequencing, and mixing.',
    icon: 'cubase-daw-icon',
    linux_alternative: 'Bitwig Studio / Reaper / Ardour',
    popularity: 45,
    homepage: 'https://www.steinberg.net/cubase/',
    alternative_to: ''
  },
  {
    id: 'pro-tools-daw',
    name: 'Pro Tools',
    category: 'Audio',
    description: 'Industry standard audio post-production workstation and editor.',
    icon: 'pro-tools-daw-icon',
    linux_alternative: 'Reaper / Ardour / Harrison Mixbus',
    popularity: 45,
    homepage: 'https://www.avid.com/pro-tools',
    alternative_to: ''
  },
  {
    id: 'cakewalk-daw',
    name: 'Cakewalk by BandLab',
    category: 'Audio',
    description: 'Complete digital audio workstation featuring advanced midi editing.',
    icon: 'cakewalk-daw-icon',
    linux_alternative: 'Reaper / Ardour / LMMS',
    popularity: 45,
    homepage: 'https://www.bandlab.com/products/cakewalk',
    alternative_to: ''
  },
  {
    id: 'studio-one-daw',
    name: 'Studio One',
    category: 'Audio',
    description: 'Modern DAW designed for fast workflow and drag-and-drop actions.',
    icon: 'studio-one-daw-icon',
    linux_alternative: 'Native Linux Version (Beta) / Reaper / Bitwig Studio',
    popularity: 45,
    homepage: 'https://www.presonus.com/en/studio-one.html',
    alternative_to: ''
  },
  {
    id: 'sound-forge-pro',
    name: 'Sound Forge',
    category: 'Audio',
    description: 'Professional digital audio editor and recording suite.',
    icon: 'sound-forge-pro-icon',
    linux_alternative: 'Audacity / Tenacity / Ocenaudio',
    popularity: 45,
    homepage: 'https://www.magix.com/us/music/sound-forge/',
    alternative_to: ''
  },
  {
    id: 'goldwave-audio',
    name: 'GoldWave',
    category: 'Audio',
    description: 'Comprehensive digital audio editor and recording program.',
    icon: 'goldwave-audio-icon',
    linux_alternative: 'Audacity / Tenacity',
    popularity: 45,
    homepage: 'https://www.goldwave.com/',
    alternative_to: ''
  },
  {
    id: 'wavosaur-editor',
    name: 'Wavosaur',
    category: 'Audio',
    description: 'Free audio editor and VST host for editing sound files.',
    icon: 'wavosaur-editor-icon',
    linux_alternative: 'Audacity',
    popularity: 45,
    homepage: 'https://www.wavosaur.com/',
    alternative_to: ''
  },
  {
    id: 'ocenaudio-editor',
    name: 'Ocenaudio',
    category: 'Audio',
    description: 'Easy, fast, and powerful cross-platform audio editor.',
    icon: 'ocenaudio-editor-icon',
    linux_alternative: 'Native Linux Version|flathub:br.com.ocenaudio.Ocenaudio',
    popularity: 45,
    homepage: 'https://www.ocenaudio.com/',
    alternative_to: ''
  },
  {
    id: 'guitar-rig-fx',
    name: 'Guitar Rig',
    category: 'Audio',
    description: 'Multi-effects rack and amp simulator for guitarists.',
    icon: 'guitar-rig-fx-icon',
    linux_alternative: 'Guitar Rig under Wine / Guitarix / ToneLib GFX',
    popularity: 45,
    homepage: 'https://www.native-instruments.com/en/products/komplete/guitar/guitar-rig-7-pro/',
    alternative_to: ''
  },
  {
    id: 'amplitube-fx',
    name: 'AmpliTube',
    category: 'Audio',
    description: 'Guitar and bass tone studio mimicking real amp rigs.',
    icon: 'amplitube-fx-icon',
    linux_alternative: 'AmpliTube under Wine / Guitarix / ToneLib GFX',
    popularity: 45,
    homepage: 'https://www.ikmultimedia.com/products/amplitube5/',
    alternative_to: ''
  },
  {
    id: 'tonelib-gfx',
    name: 'ToneLib GFX',
    category: 'Audio',
    description: 'Multi-effects processor and cabinet simulator for guitar and bass.',
    icon: 'tonelib-gfx-icon',
    linux_alternative: 'Native Linux Version (Deb/Rpm/AppImage)',
    popularity: 45,
    homepage: 'https://tonelib.net/',
    alternative_to: ''
  },
  {
    id: 'guitarix-amp',
    name: 'Guitarix',
    category: 'Audio',
    description: 'Virtual guitar amplifier for Linux, running through JACK/PipeWire.',
    icon: 'guitarix-amp-icon',
    linux_alternative: 'Native Linux Version / ToneLib GFX',
    popularity: 45,
    homepage: 'https://guitarix.org/',
    alternative_to: ''
  },
  {
    id: 'sibelius-notation',
    name: 'Sibelius',
    category: 'Audio',
    description: 'Sheet music editor and music notation program by Avid.',
    icon: 'sibelius-notation-icon',
    linux_alternative: 'MuseScore / LilyPond',
    popularity: 45,
    homepage: 'https://www.avid.com/sibelius',
    alternative_to: ''
  },
  {
    id: 'finale-notation',
    name: 'Finale',
    category: 'Audio',
    description: 'Professional music notation software for composers.',
    icon: 'finale-notation-icon',
    linux_alternative: 'MuseScore / LilyPond',
    popularity: 45,
    homepage: 'https://www.finalemusic.com/',
    alternative_to: ''
  },
  {
    id: 'dorico-notation',
    name: 'Dorico',
    category: 'Audio',
    description: 'Modern sheet music engraving and scoring application.',
    icon: 'dorico-notation-icon',
    linux_alternative: 'MuseScore',
    popularity: 45,
    homepage: 'https://www.steinberg.net/dorico/',
    alternative_to: ''
  },
  {
    id: 'tuxguitar-app',
    name: 'TuxGuitar',
    category: 'Audio',
    description: 'Open-source multitrack guitar tablature editor.',
    icon: 'tuxguitar-app-icon',
    linux_alternative: 'Native Linux Version|flathub:ar.com.hernan.TuxGuitar',
    popularity: 45,
    homepage: 'http://www.tuxguitar.com.ar/',
    alternative_to: ''
  },
  {
    id: 'guitar-pro-app',
    name: 'Guitar Pro',
    category: 'Audio',
    description: 'Professional sheet music and guitar tablature editor.',
    icon: 'guitar-pro-app-icon',
    linux_alternative: 'Guitar Pro (Native Linux Version) / TuxGuitar',
    popularity: 45,
    homepage: 'https://www.guitar-pro.com/',
    alternative_to: ''
  },
  {
    id: 'synthesia-game',
    name: 'Synthesia',
    category: 'Games',
    description: 'Piano keyboard trainer game that plays MIDI files on screen.',
    icon: 'synthesia-game-icon',
    linux_alternative: 'Synthesia (Native Linux Version) / PianoBooster',
    popularity: 40,
    homepage: 'https://synthesiagame.com/',
    alternative_to: ''
  },
  {
    id: 'pianobooster-app',
    name: 'PianoBooster',
    category: 'Games',
    description: 'Open-source MIDI piano practice trainer game.',
    icon: 'pianobooster-app-icon',
    linux_alternative: 'Native Linux Version / Synthesia',
    popularity: 40,
    homepage: 'https://github.com/pianobooster/PianoBooster',
    alternative_to: ''
  },
  {
    id: 'earmaster-pro',
    name: 'EarMaster',
    category: 'Audio',
    description: 'Ear training, sight-singing, and music theory tool.',
    icon: 'earmaster-pro-icon',
    linux_alternative: 'Solfege / GNU Solfege',
    popularity: 40,
    homepage: 'https://www.earmaster.com/',
    alternative_to: ''
  },
  {
    id: 'gnu-solfege',
    name: 'GNU Solfege',
    category: 'Audio',
    description: 'Free ear training software written in Python.',
    icon: 'gnu-solfege-icon',
    linux_alternative: 'Native Linux Version',
    popularity: 40,
    homepage: 'https://www.gnu.org/software/solfege/',
    alternative_to: ''
  },
  {
    id: 'autodesk-inventor',
    name: 'Autodesk Inventor',
    category: 'Engineering',
    description: '3D CAD modeling software for mechanical design and simulation.',
    icon: 'autodesk-inventor-icon',
    linux_alternative: 'FreeCAD / Onshape (Web)',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/inventor/overview',
    alternative_to: ''
  },
  {
    id: 'altium-designer',
    name: 'Altium Designer',
    category: 'Engineering',
    description: 'Professional PCB and electronic design automation software.',
    icon: 'altium-designer-icon',
    linux_alternative: 'KiCad / LibrePCB',
    popularity: 45,
    homepage: 'https://www.altium.com/altium-designer',
    alternative_to: ''
  },
  {
    id: 'orcad-pcb',
    name: 'OrCAD',
    category: 'Engineering',
    description: 'Suite of programs for schematic capture and PCB design layout.',
    icon: 'orcad-pcb-icon',
    linux_alternative: 'KiCad / gEDA',
    popularity: 40,
    homepage: 'https://www.orcad.com/',
    alternative_to: ''
  },
  {
    id: 'draftsight-cad',
    name: 'DraftSight',
    category: 'Engineering',
    description: 'Professional 2D CAD drafting and editing system.',
    icon: 'draftsight-cad-icon',
    linux_alternative: 'LibreCAD / QCad',
    popularity: 40,
    homepage: 'https://www.3ds.com/products-services/draftsight-cad-software/',
    alternative_to: ''
  },
  {
    id: 'lumion-render',
    name: 'Lumion',
    category: 'Design',
    description: 'Real-time architectural visualization and 3D rendering tool.',
    icon: 'lumion-render-icon',
    linux_alternative: 'Blender / Unreal Engine / Twinmotion',
    popularity: 40,
    homepage: 'https://lumion.com/',
    alternative_to: ''
  },
  {
    id: 'revit-bim',
    name: 'Revit',
    category: 'Engineering',
    description: 'Building information modeling (BIM) software for architectural design.',
    icon: 'revit-bim-icon',
    linux_alternative: 'FreeCAD (BIM Workbench) / Blender BIM',
    popularity: 45,
    homepage: 'https://www.autodesk.com/products/revit/overview',
    alternative_to: ''
  },
  {
    id: 'microstation-cad',
    name: 'MicroStation',
    category: 'Engineering',
    description: 'CAD software for 2D/3D design and drafting of infrastructure.',
    icon: 'microstation-cad-icon',
    linux_alternative: 'FreeCAD / QCad',
    popularity: 40,
    homepage: 'https://www.bentley.com/software/microstation/',
    alternative_to: ''
  },
  {
    id: 'tinkercad-web',
    name: 'Tinkercad',
    category: 'Design',
    description: '3D modeling web app designed for beginners and educators.',
    icon: 'tinkercad-web-icon',
    linux_alternative: 'Tinkercad Web App / FreeCAD / BlockSCAD',
    popularity: 40,
    homepage: 'https://www.tinkercad.com/',
    alternative_to: ''
  },
  {
    id: 'format-factory',
    name: 'Format Factory',
    category: 'Utilities',
    description: 'Ad-supported ad-hoc converter for audio, video, and image files.',
    icon: 'format-factory-icon',
    linux_alternative: 'HandBrake / Ciano / FFmpeg',
    popularity: 40,
    homepage: 'http://www.pcfreetime.com/formatfactory/',
    alternative_to: ''
  },
  {
    id: 'winff-encoder',
    name: 'WinFF',
    category: 'Utilities',
    description: 'Graphic user interface for FFmpeg encoder commands.',
    icon: 'winff-encoder-icon',
    linux_alternative: 'Native Linux Version / Ciano',
    popularity: 40,
    homepage: 'https://github.com/WinFF/winff',
    alternative_to: ''
  },
  {
    id: 'xmedia-recode',
    name: 'XMedia Recode',
    category: 'Utilities',
    description: 'Audio and video transcoding converter tool.',
    icon: 'xmedia-recode-icon',
    linux_alternative: 'HandBrake / Ciano',
    popularity: 40,
    homepage: 'https://xmedia-recode.de/en/',
    alternative_to: ''
  },
  {
    id: 'staxrip-encoder',
    name: 'StaxRip',
    category: 'Utilities',
    description: 'Multi-format video encoding frontend for Windows.',
    icon: 'staxrip-encoder-icon',
    linux_alternative: 'HandBrake / Avidemux',
    popularity: 40,
    homepage: 'https://github.com/staxrip/staxrip',
    alternative_to: ''
  },
  {
    id: 'megui-encoder',
    name: 'MeGUI',
    category: 'Utilities',
    description: 'ISO/MPEG-4 video transcoder tool with support for AviSynth scripts.',
    icon: 'megui-encoder-icon',
    linux_alternative: 'HandBrake / Avidemux',
    popularity: 40,
    homepage: 'https://sourceforge.net/projects/megui/',
    alternative_to: ''
  },
  {
    id: 'lamexp-encoder',
    name: 'LameXP',
    category: 'Audio',
    description: 'Audio converter supporting MP3, Ogg Vorbis, AAC, and FLAC.',
    icon: 'lamexp-encoder-icon',
    linux_alternative: 'SoundKonverter / Audacity',
    popularity: 40,
    homepage: 'https://lamexp.sourceforge.io/',
    alternative_to: ''
  },
  {
    id: 'dbpoweramp-ripper',
    name: 'dBpoweramp',
    category: 'Audio',
    description: 'Audio converter and CD ripper focusing on accuracy and metadata lookup.',
    icon: 'dbpoweramp-ripper-icon',
    linux_alternative: 'SoundKonverter / Asunder',
    popularity: 40,
    homepage: 'https://www.dbpoweramp.com/',
    alternative_to: ''
  },
  {
    id: 'mediamonkey-player',
    name: 'MediaMonkey',
    category: 'Audio',
    description: 'Music organizer and player for large collections of audio files.',
    icon: 'mediamonkey-player-icon',
    linux_alternative: 'MediaMonkey under Wine / Strawberry / Rhythmbox',
    popularity: 40,
    homepage: 'https://www.mediamonkey.com/',
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
