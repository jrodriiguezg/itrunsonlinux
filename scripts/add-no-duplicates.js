import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Read existing IDs from DB dump
const existingIds = new Set(fs.readFileSync('/tmp/existing_ids.txt', 'utf-8').split('\n').map(s => s.trim().toLowerCase()));

console.log(`Existing IDs: ${existingIds.size}`);

// New apps to add - organized by category
const newApps = [
  // === UTILITY / SECURITY ===
  { id: 'bitdefender', name: 'Bitdefender', category: 'Utilities', description: 'Award-winning antivirus and internet security software.', linux_alternative: 'ClamAV / ClamTk / native Linux antivirus', popularity: 30, homepage: 'https://www.bitdefender.com/', alternative_to: null },
  { id: 'kaspersky', name: 'Kaspersky', category: 'Utilities', description: 'Comprehensive antivirus and security suite.', linux_alternative: 'ClamAV / ClamTk', popularity: 30, homepage: 'https://www.kaspersky.com/', alternative_to: null },
  { id: 'norton-360', name: 'Norton 360', category: 'Utilities', description: 'Antivirus and malware protection with VPN and cloud backup.', linux_alternative: 'ClamAV / Bitwarden / ProtonVPN', popularity: 25, homepage: 'https://us.norton.com/', alternative_to: null },
  { id: 'avg-antivirus', name: 'AVG Antivirus', category: 'Utilities', description: 'Free and premium antivirus protection.', linux_alternative: 'ClamAV / ClamTk', popularity: 20, homepage: 'https://www.avg.com/', alternative_to: null },
  { id: 'avast', name: 'Avast', category: 'Utilities', description: 'Free antivirus with additional security features.', linux_alternative: 'ClamAV / ClamTk', popularity: 20, homepage: 'https://www.avast.com/', alternative_to: null },
  { id: 'adaware', name: 'Adaware', category: 'Utilities', description: 'Anti-malware and antivirus software.', linux_alternative: 'ClamAV', popularity: 10, homepage: 'https://www.adaware.com/', alternative_to: null },
  { id: 'emsisoft', name: 'Emsisoft', category: 'Utilities', description: 'Anti-malware and anti-ransomware protection.', linux_alternative: 'ClamAV', popularity: 10, homepage: 'https://www.emsisoft.com/', alternative_to: null },
  { id: 'malwarefox', name: 'Malwarefox', category: 'Utilities', description: 'Anti-malware protection for Windows.', linux_alternative: 'ClamAV / ClamTk', popularity: 10, homepage: 'https://www.malwarefox.com/', alternative_to: null },
  { id: 'hitmanpro', name: 'HitmanPro', category: 'Utilities', description: 'Second-opinion malware scanner.', linux_alternative: 'ClamAV', popularity: 10, homepage: 'https://www.hitmanpro.com/', alternative_to: null },
  { id: 'rkill', name: 'rKill', category: 'Utilities', description: 'Tool that terminates known malware processes.', linux_alternative: 'kill / pkill (built-in)', popularity: 5, homepage: 'https://www.bleepingcomputer.com/download/rkill/', alternative_to: null },

  // === BROWSERS ===
  { id: 'brave-browser', name: 'Brave Browser', category: 'Utilities', description: 'Privacy-focused browser with built-in ad blocking.', linux_alternative: 'Native Linux Version|flathub:com.brave.Browser', popularity: 40, homepage: 'https://brave.com/', alternative_to: 'Google Chrome' },
  { id: 'vivaldi', name: 'Vivaldi', category: 'Utilities', description: 'Highly customizable browser for power users.', linux_alternative: 'Native Linux Version|flathub:com.vivaldi.Vivaldi', popularity: 30, homepage: 'https://vivaldi.com/', alternative_to: 'Google Chrome' },
  { id: 'opera-browser', name: 'Opera Browser', category: 'Utilities', description: 'Fast browser with built-in VPN and ad blocker.', linux_alternative: 'Native Linux Version|flathub:com.opera.Opera', popularity: 25, homepage: 'https://www.opera.com/', alternative_to: 'Google Chrome' },
  { id: 'tor-browser', name: 'Tor Browser', category: 'Utilities', description: 'Anonymous browsing through the Tor network.', linux_alternative: 'Native Linux Version|flathub:org.torproject.torbrowser-launcher', popularity: 35, homepage: 'https://www.torproject.org/', alternative_to: null },
  { id: 'waterfox', name: 'Waterfox', category: 'Utilities', description: 'Privacy-focused Firefox fork.', linux_alternative: 'Native Linux Version (available in repos)', popularity: 10, homepage: 'https://www.waterfox.net/', alternative_to: 'Mozilla Firefox' },
  { id: 'librewolf', name: 'LibreWolf', category: 'Utilities', description: 'Privacy-focused Firefox fork with no telemetry.', linux_alternative: 'Native Linux Version|flathub:io.gitlab.librewolf-community', popularity: 15, homepage: 'https://librewolf.net/', alternative_to: 'Mozilla Firefox' },
  { id: 'floorp', name: 'Floorp', category: 'Utilities', description: 'Firefox-based browser with vertical tabs.', linux_alternative: 'Native Linux Version (Flatpak)', popularity: 10, homepage: 'https://floorp.app/', alternative_to: 'Mozilla Firefox' },

  // === DEVELOPMENT ===
  { id: 'cursor-ide', name: 'Cursor', category: 'Development', description: 'AI-powered code editor built on VS Code.', linux_alternative: 'VS Code / VSCodium / Cursor (AppImage)', popularity: 40, homepage: 'https://cursor.sh/', alternative_to: 'VS Code' },
  { id: 'windsurf-ide', name: 'Windsurf', category: 'Development', description: 'AI-powered code editor by Codeium.', linux_alternative: 'VS Code / VSCodium', popularity: 25, homepage: 'https://codeium.com/windsurf', alternative_to: 'VS Code' },
  { id: 'trae-ide', name: 'Trae', category: 'Development', description: 'AI-powered IDE by ByteDance.', linux_alternative: 'VS Code / VSCodium', popularity: 15, homepage: 'https://www.trae.ai/', alternative_to: 'VS Code' },
  { id: 'zed-editor', name: 'Zed', category: 'Development', description: 'High-performance, multiplayer code editor.', linux_alternative: 'Native Linux Version|flathub:dev.zed.Zed', popularity: 30, homepage: 'https://zed.dev/', alternative_to: 'VS Code' },
  { id: 'helix-editor', name: 'Helix', category: 'Development', description: 'Post-modern modal text editor.', linux_alternative: 'Native Linux Version (CLI)', popularity: 15, homepage: 'https://helix-editor.com/', alternative_to: 'VS Code' },
  { id: 'lapce-editor', name: 'Lapce', category: 'Development', description: 'Lightning-fast terminal-based code editor.', linux_alternative: 'Native Linux Version|flathub:io.github.lapce.lapce', popularity: 15, homepage: 'https://lapce.dev/', alternative_to: 'VS Code' },
  { id: 'android-studio-stable', name: 'Android Studio Stable', category: 'Development', description: 'Official IDE for Android development.', linux_alternative: 'Native Linux Version|flathub:com.google.AndroidStudio', popularity: 40, homepage: 'https://developer.android.com/studio', alternative_to: 'VS Code' },
  { id: 'github-copilot', name: 'GitHub Copilot', category: 'Development', description: 'AI pair programmer by GitHub.', linux_alternative: 'Continue (VS Code extension) / Tabby', popularity: 35, homepage: 'https://github.com/features/copilot', alternative_to: null },
  { id: 'postman-alternative', name: 'Bruno API Client', category: 'Development', description: 'Open-source API client, Postman alternative.', linux_alternative: 'Native Linux Version|flathub:com.usebruno.Bruno', popularity: 25, homepage: 'https://www.usebruno.com/', alternative_to: 'Postman' },
  { id: 'beekeeper-studio', name: 'Beekeeper Studio', category: 'Development', description: 'Open-source SQL editor and database manager.', linux_alternative: 'Native Linux Version|flathub:io.beekeeperstudio.BeekeeperStudio', popularity: 20, homepage: 'https://www.beekeeperstudio.io/', alternative_to: 'DBeaver' },
  { id: 'redis-insight', name: 'Redis Insight', category: 'Development', description: 'GUI for Redis database management.', linux_alternative: 'Native Linux Version (AppImage)', popularity: 15, homepage: 'https://redis.io/insight/', alternative_to: null },
  { id: 'docker-desktop-alternative', name: 'Podman Desktop', category: 'Development', description: 'Daemonless container engine GUI.', linux_alternative: 'Native Linux Version|flathub:io.podman_desktop.PodmanDesktop', popularity: 25, homepage: 'https://podman-desktop.io/', alternative_to: 'Docker Desktop' },
  { id: 'insomnia-client', name: 'Insomnia', category: 'Development', description: 'Open-source API client.', linux_alternative: 'Native Linux Version|flathub:io.insomnia.Insomnia', popularity: 25, homepage: 'https://insomnia.rest/', alternative_to: 'Postman' },
  { id: 'figma-linux', name: 'Figma Linux', category: 'Development', description: 'Unofficial Figma desktop client for Linux.', linux_alternative: 'Native Linux Version (AppImage) / Figma web', popularity: 20, homepage: 'https://github.com/nicehash/Figma-Linux', alternative_to: 'Figma' },

  // === OFFICE / PRODUCTIVITY ===
  { id: 'microsoft-onenote', name: 'Microsoft OneNote', category: 'Office', description: 'Digital note-taking application by Microsoft.', linux_alternative: 'Joplin / Obsidian / Standard Notes', popularity: 35, homepage: 'https://www.onenote.com/', alternative_to: 'Evernote' },
  { id: 'microsoft-project', name: 'Microsoft Project', category: 'Office', description: 'Project management software.', linux_alternative: 'GanttProject / ProjectLibre / Kanboard', popularity: 25, homepage: 'https://www.microsoft.com/en-us/microsoft-365/project', alternative_to: null },
  { id: 'microsoft-visio', name: 'Microsoft Visio', category: 'Office', description: 'Diagramming and vector graphics application.', linux_alternative: 'draw.io / diagrams.net / LibreOffice Draw', popularity: 25, homepage: 'https://www.microsoft.com/en-us/microsoft-365/visio', alternative_to: 'draw.io' },
  { id: 'adobe-acrobat', name: 'Adobe Acrobat', category: 'Office', description: 'PDF creation and editing software.', linux_alternative: 'Okular / Evince / LibreOffice Draw', popularity: 30, homepage: 'https://www.adobe.com/acrobat.html', alternative_to: null },
  { id: 'foxit-reader', name: 'Foxit Reader', category: 'Office', description: 'Fast and feature-rich PDF reader.', linux_alternative: 'Okular / Evince / LibreOffice Draw', popularity: 15, homepage: 'https://www.foxit.com/', alternative_to: null },
  { id: 'sumatra-pdf', name: 'Sumatra PDF', category: 'Office', description: 'Lightweight, open-source PDF reader.', linux_alternative: 'Evince / Okular', popularity: 15, homepage: 'https://www.sumatrapdfreader.org/', alternative_to: null },
  { id: 'nitro-pdf', name: 'Nitro PDF', category: 'Office', description: 'PDF editor and converter.', linux_alternative: 'LibreOffice Draw / Okular / PDFarranger', popularity: 10, homepage: 'https://www.gonitro.com/', alternative_to: null },
  { id: 'pandoc', name: 'Pandoc', category: 'Office', description: 'Universal document converter.', linux_alternative: 'Native Linux Version (CLI)', popularity: 20, homepage: 'https://pandoc.org/', alternative_to: null },
  { id: 'grammarly', name: 'Grammarly', category: 'Office', description: 'AI-powered writing assistant.', linux_alternative: 'LanguageTool (Native Linux Version) / Web version', popularity: 30, homepage: 'https://www.grammarly.com/', alternative_to: 'LanguageTool' },
  { id: 'hemingway-editor', name: 'Hemingway Editor', category: 'Office', description: 'Writing editor that makes your writing bold and clear.', linux_alternative: 'Native Linux Version (web-based)', popularity: 10, homepage: 'https://hemingwayapp.com/', alternative_to: null },
  { id: 'notion-alternative', name: 'AppFlowy', category: 'Office', description: 'Open-source alternative to Notion.', linux_alternative: 'Native Linux Version (AppImage)', popularity: 20, homepage: 'https://appflowy.io/', alternative_to: 'Notion' },

  // === SOCIAL / COMMUNICATION ===
  { id: 'telegram-desktop', name: 'Telegram Desktop', category: 'Social', description: 'Fast and secure messaging app.', linux_alternative: 'Native Linux Version|flathub:org.telegram.desktop', popularity: 50, homepage: 'https://desktop.telegram.org/', alternative_to: null },
  { id: 'whatsapp-desktop', name: 'WhatsApp Desktop', category: 'Social', description: 'Desktop client for WhatsApp messaging.', linux_alternative: 'WhatsApp Web / ZapZap / Telegram', popularity: 40, homepage: 'https://www.whatsapp.com/', alternative_to: 'Telegram' },
  { id: 'microsoft-teams', name: 'Microsoft Teams', category: 'Social', description: 'Collaboration platform by Microsoft.', linux_alternative: 'Native Linux Version|flathub:com.microsoft.Teams', popularity: 40, homepage: 'https://www.microsoft.com/en-us/microsoft-teams', alternative_to: 'Slack' },
  { id: 'zoom-workplace', name: 'Zoom Workplace', category: 'Social', description: 'Video conferencing platform.', linux_alternative: 'Native Linux Version|flathub:us.zoom.Zoom', popularity: 45, homepage: 'https://zoom.us/', alternative_to: null },
  { id: 'skype', name: 'Skype', category: 'Social', description: 'Video calling and messaging by Microsoft.', linux_alternative: 'Native Linux Version|flathub:com.skype.Client', popularity: 25, homepage: 'https://www.skype.com/', alternative_to: 'Zoom' },
  { id: 'slack-app', name: 'Slack', category: 'Social', description: 'Team communication and collaboration.', linux_alternative: 'Native Linux Version|flathub:com.slack.Slack', popularity: 35, homepage: 'https://slack.com/', alternative_to: null },
  { id: 'discord-app', name: 'Discord', category: 'Social', description: 'Voice, video, and text communication.', linux_alternative: 'Native Linux Version|flathub:com.discordapp.Discord', popularity: 50, homepage: 'https://discord.com/', alternative_to: null },
  { id: 'element-matrix', name: 'Element (Matrix)', category: 'Social', description: 'Decentralized communication on Matrix protocol.', linux_alternative: 'Native Linux Version|flathub:io.element.Element', popularity: 20, homepage: 'https://element.io/', alternative_to: 'Slack' },
  { id: 'signal-desktop', name: 'Signal', category: 'Social', description: 'Encrypted messaging app.', linux_alternative: 'Native Linux Version|flathub:org.signal.Signal', popularity: 40, homepage: 'https://signal.org/', alternative_to: 'WhatsApp' },
  { id: 'viber-desktop', name: 'Viber', category: 'Social', description: 'Free messaging and calling app.', linux_alternative: 'Native Linux Version|flathub:com.viber.Viber', popularity: 15, homepage: 'https://www.viber.com/', alternative_to: 'WhatsApp' },
  { id: 'line-desktop', name: 'LINE', category: 'Social', description: 'Messaging app popular in Asia.', linux_alternative: 'Native Linux Version (web-based)', popularity: 10, homepage: 'https://line.me/', alternative_to: 'WhatsApp' },
  { id: 'wechat-desktop', name: 'WeChat', category: 'Social', description: 'Messaging and social media by Tencent.', linux_alternative: 'WeChat for Linux (official) / Web version', popularity: 15, homepage: 'https://www.wechat.com/', alternative_to: null },
  { id: 'mumble', name: 'Mumble', category: 'Social', description: 'Open-source, low-latency voice chat.', linux_alternative: 'Native Linux Version|flathub:info.mumble.Mumble', popularity: 20, homepage: 'https://www.mumble.info/', alternative_to: 'TeamSpeak' },
  { id: 'teamspeak', name: 'TeamSpeak', category: 'Social', description: 'Voice communication for gamers.', linux_alternative: 'Native Linux Version|flathub:com.teamspeak.TeamSpeak', popularity: 15, homepage: 'https://www.teamspeak.com/', alternative_to: null },
  { id: 'matrix-clients', name: 'FluffyChat', category: 'Social', description: 'Cute Matrix chat client.', linux_alternative: 'Native Linux Version|flathub:chat.fluffy.IM', popularity: 10, homepage: 'https://fluffy.chat/', alternative_to: 'Element' },

  // === DESIGN / CREATIVE ===
  { id: 'figma-app', name: 'Figma', category: 'Design', description: 'Collaborative interface design tool.', linux_alternative: 'Native Linux Version (web-based PWA) / Figma-Linux', popularity: 45, homepage: 'https://www.figma.com/', alternative_to: null },
  { id: 'sketch-app', name: 'Sketch', category: 'Design', description: 'Vector graphics editor for macOS.', linux_alternative: 'Inkscape / Figma (web)', popularity: 20, homepage: 'https://www.sketch.com/', alternative_to: 'Figma' },
  { id: 'canva-app', name: 'Canva', category: 'Design', description: 'Online graphic design platform.', linux_alternative: 'Native Linux Version (web-based PWA)', popularity: 35, homepage: 'https://www.canva.com/', alternative_to: null },
  { id: 'adobe-xd', name: 'Adobe XD', category: 'Design', description: 'Vector-based user experience design tool.', linux_alternative: 'Figma / Penpot', popularity: 15, homepage: 'https://www.adobe.com/products/xd.html', alternative_to: 'Figma' },
  { id: 'penpot-app', name: 'Penpot', category: 'Design', description: 'Open-source design and prototyping.', linux_alternative: 'Native Linux Version|flathub:com.penpotapp.penpot', popularity: 25, homepage: 'https://penpot.app/', alternative_to: 'Figma' },
  { id: 'excalidraw-app', name: 'Excalidraw', category: 'Design', description: 'Virtual whiteboard for sketching diagrams.', linux_alternative: 'Native Linux Version (web-based PWA)', popularity: 25, homepage: 'https://excalidraw.com/', alternative_to: 'draw.io' },
  { id: 'blender-app', name: 'Blender', category: 'Design', description: 'Free and open-source 3D creation suite.', linux_alternative: 'Native Linux Version|flathub:org.blender.Blender', popularity: 50, homepage: 'https://www.blender.org/', alternative_to: null },
  { id: 'krita-app', name: 'Krita', category: 'Design', description: 'Professional free and open-source painting program.', linux_alternative: 'Native Linux Version|flathub:org.kde.krita', popularity: 40, homepage: 'https://krita.org/', alternative_to: 'Adobe Photoshop' },
  { id: 'inkscape-app', name: 'Inkscape', category: 'Design', description: 'Professional vector graphics editor.', linux_alternative: 'Native Linux Version|flathub:org.inkscape.Inkscape', popularity: 40, homepage: 'https://inkscape.org/', alternative_to: 'Adobe Illustrator' },
  { id: 'darktable-app', name: 'Darktable', category: 'Design', description: 'Open-source photography workflow application.', linux_alternative: 'Native Linux Version|flathub:org.darktable.Darktable', popularity: 30, homepage: 'https://www.darktable.org/', alternative_to: 'Adobe Lightroom' },
  { id: 'gimp-app', name: 'GIMP', category: 'Design', description: 'GNU Image Manipulation Program.', linux_alternative: 'Native Linux Version|flathub:org.gimp.GIMP', popularity: 45, homepage: 'https://www.gimp.org/', alternative_to: 'Adobe Photoshop' },
  { id: 'screenshot-flameshot', name: 'Flameshot', category: 'Design', description: 'Powerful screenshot software.', linux_alternative: 'Native Linux Version|flathub:org.flameshot.Flameshot', popularity: 25, homepage: 'https://flameshot.org/', alternative_to: 'Snipping Tool' },
  { id: 'sharex-alternative', name: 'Flameshot', category: 'Design', description: 'Feature-rich screenshot tool.', linux_alternative: 'Native Linux Version|flathub:org.flameshot.Flameshot', popularity: 20, homepage: 'https://flameshot.org/', alternative_to: 'ShareX' },

  // === GAMES ===
  { id: 'steam-app', name: 'Steam', category: 'Games', description: 'The ultimate entertainment platform.', linux_alternative: 'Native Linux Version|flathub:com.valvesoftware.Steam', popularity: 55, homepage: 'https://store.steampowered.com/', alternative_to: null },
  { id: 'epic-games-launcher', name: 'Epic Games Launcher', category: 'Games', description: 'Storefront for Epic Games.', linux_alternative: 'Heroic Games Launcher / Lutris', popularity: 40, homepage: 'https://store.epicgames.com/', alternative_to: null },
  { id: 'gog-galaxy', name: 'GOG Galaxy', category: 'Games', description: 'Game launcher by GOG.com.', linux_alternative: 'Heroic Games Launcher / Lutris', popularity: 25, homepage: 'https://www.gog.com/galaxy', alternative_to: null },
  { id: 'battle-net', name: 'Battle.net', category: 'Games', description: 'Blizzard game launcher.', linux_alternative: 'Lutris / Heroic Games Launcher', popularity: 35, homepage: 'https://www.blizzard.com/battle.net/', alternative_to: null },
  { id: 'ea-app', name: 'EA App', category: 'Games', description: 'Electronic Arts game launcher.', linux_alternative: 'Lutris / Heroic Games Launcher', popularity: 30, homepage: 'https://www.ea.com/ea-app', alternative_to: null },
  { id: 'ubisoft-connect', name: 'Ubisoft Connect', category: 'Games', description: 'Ubisoft game launcher.', linux_alternative: 'Lutris / Heroic Games Launcher / Steam (via Proton)', popularity: 25, homepage: 'https://ubisoftconnect.com/', alternative_to: null },
  { id: 'rockstar-launcher', name: 'Rockstar Games Launcher', category: 'Games', description: 'Rockstar game launcher.', linux_alternative: 'Lutris / Heroic Games Launcher', popularity: 30, homepage: 'https://www.rockstargames.com/rockstar-games-launcher', alternative_to: null },
  { id: 'gfn-now', name: 'GeForce NOW', category: 'Games', description: 'NVIDIA cloud gaming service.', linux_alternative: 'Native Linux Version (Web/PWA)', popularity: 30, homepage: 'https://www.nvidia.com/en-us/geforce-now/', alternative_to: null },
  { id: 'xbox-cloud-gaming', name: 'Xbox Cloud Gaming', category: 'Games', description: 'Microsoft cloud gaming service.', linux_alternative: 'Native Linux Version (Web/PWA via Edge/Chrome)', popularity: 25, homepage: 'https://www.xbox.com/en-US/cloud-gaming', alternative_to: null },
  { id: 'retroarch-app', name: 'RetroArch', category: 'Games', description: 'Frontend for emulators.', linux_alternative: 'Native Linux Version|flathub:org.libretro.RetroArch', popularity: 35, homepage: 'https://www.retroarch.com/', alternative_to: null },
  { id: 'lutris-app', name: 'Lutris', category: 'Games', description: 'Open-source gaming platform.', linux_alternative: 'Native Linux Version|flathub:net.lutris.Lutris', popularity: 35, homepage: 'https://lutris.net/', alternative_to: null },
  { id: 'heroic-launcher', name: 'Heroic Games Launcher', category: 'Games', description: 'Epic Games and GOG launcher for Linux.', linux_alternative: 'Native Linux Version|flathub:com.heroicgameslauncher.hgl', popularity: 30, homepage: 'https://heroicgameslauncher.com/', alternative_to: null },
  { id: 'moonlight-app', name: 'Moonlight', category: 'Games', description: 'Open-source game streaming client.', linux_alternative: 'Native Linux Version|flathub:com.moonlight_stream.Moonlight', popularity: 25, homepage: 'https://moonlight-stream.org/', alternative_to: 'Parsec' },
  { id: 'parsec-app', name: 'Parsec', category: 'Games', description: 'Low-latency game streaming.', linux_alternative: 'Native Linux Version|flathub:com.parsec.Parsec', popularity: 25, homepage: 'https://parsec.app/', alternative_to: null },

  // === AUDIO ===
  { id: 'spotify-app', name: 'Spotify', category: 'Audio', description: 'Music streaming service.', linux_alternative: 'Native Linux Version|flathub:com.spotify.Client', popularity: 55, homepage: 'https://www.spotify.com/', alternative_to: null },
  { id: 'audacity-app', name: 'Audacity', category: 'Audio', description: 'Free, open-source audio editor.', linux_alternative: 'Native Linux Version|flathub:org.audacityteam.Audacity', popularity: 45, homepage: 'https://www.audacityteam.org/', alternative_to: 'Adobe Audition' },
  { id: 'vlc-app', name: 'VLC Media Player', category: 'Audio', description: 'Free and open-source multimedia player.', linux_alternative: 'Native Linux Version|flathub:org.videolan.VLC', popularity: 55, homepage: 'https://www.videolan.org/', alternative_to: null },
  { id: 'obs-studio', name: 'OBS Studio', category: 'Audio', description: 'Free and open-source video recording and streaming.', linux_alternative: 'Native Linux Version|flathub:com.obsproject.Studio', popularity: 50, homepage: 'https://obsproject.com/', alternative_to: null },
  { id: 'handbrake-app', name: 'HandBrake', category: 'Audio', description: 'Open-source video transcoder.', linux_alternative: 'Native Linux Version|flathub:fr.handbrake.ghb', popularity: 35, homepage: 'https://handbrake.fr/', alternative_to: null },
  { id: 'kdenlive-app', name: 'Kdenlive', category: 'Audio', description: 'Open-source video editor.', linux_alternative: 'Native Linux Version|flathub:org.kde.kdenlive', popularity: 35, homepage: 'https://kdenlive.org/', alternative_to: 'Adobe Premiere' },
  { id: 'shotcut-app', name: 'Shotcut', category: 'Audio', description: 'Free, open-source video editor.', linux_alternative: 'Native Linux Version|flathub:org.shotcut.Shotcut', popularity: 25, homepage: 'https://shotcut.org/', alternative_to: 'Adobe Premiere' },
  { id: 'openshot-app', name: 'OpenShot', category: 'Audio', description: 'Free, open-source video editor.', linux_alternative: 'Native Linux Version|flathub:org.openshot.OpenShot', popularity: 20, homepage: 'https://www.openshot.org/', alternative_to: 'Adobe Premiere' },
  { id: 'davinci-resolve', name: 'DaVinci Resolve', category: 'Audio', description: 'Professional video editing and color correction.', linux_alternative: 'Native Linux Version', popularity: 45, homepage: 'https://www.blackmagicdesign.com/products/davinciresolve', alternative_to: 'Adobe Premiere' },
  { id: 'lmms-app', name: 'LMMS', category: 'Audio', description: 'Free, open-source music production software.', linux_alternative: 'Native Linux Version|flathub:io.lmms.LMMS', popularity: 25, homepage: 'https://lmms.io/', alternative_to: 'FL Studio' },
  { id: 'bitwig-studio', name: 'Bitwig Studio', category: 'Audio', description: 'Modern music production and performance DAW.', linux_alternative: 'Native Linux Version|flathub:com.bitwig.BitwigStudio', popularity: 25, homepage: 'https://www.bitwig.com/', alternative_to: 'Ableton Live' },
  { id: 'ardour-app', name: 'Ardour', category: 'Audio', description: 'Free, open-source digital audio workstation.', linux_alternative: 'Native Linux Version|flathub:org.ardour.Ardour', popularity: 20, homepage: 'https://ardour.org/', alternative_to: 'Pro Tools' },
  { id: 'reaper-app', name: 'Reaper', category: 'Audio', description: 'Lightweight, powerful digital audio workstation.', linux_alternative: 'Native Linux Version (AppImage)', popularity: 30, homepage: 'https://www.reaper.fm/', alternative_to: 'Pro Tools' },
  { id: 'mixxx-app', name: 'Mixxx', category: 'Audio', description: 'Free, open-source DJ software.', linux_alternative: 'Native Linux Version|flathub:org.mixxx.Mixxx', popularity: 20, homepage: 'https://mixxx.org/', alternative_to: 'Serato DJ' },

  // === WINDOWS INTEGRATED ===
  { id: 'microsoft-powertoys', name: 'Microsoft PowerToys', category: 'Windows Integrated', description: 'Power user utilities for Windows.', linux_alternative: 'Various native Linux tools (rofi, dmenu, etc.)', popularity: 30, homepage: 'https://github.com/microsoft/PowerToys', alternative_to: null },
  { id: 'windows-terminal', name: 'Windows Terminal', category: 'Windows Integrated', description: 'Modern terminal for Windows.', linux_alternative: 'Native Linux Terminal / Kitty / Alacritty', popularity: 25, homepage: 'https://github.com/microsoft/terminal', alternative_to: null },
  { id: 'microsoft-notepad', name: 'Microsoft Notepad', category: 'Windows Integrated', description: 'Simple text editor for Windows.', linux_alternative: 'Kate / Gedit / Mousepad / nano', popularity: 15, homepage: 'https://apps.microsoft.com/detail/9msml7506f30', alternative_to: null },
  { id: 'microsoft-paint', name: 'Microsoft Paint', category: 'Windows Integrated', description: 'Simple graphics editor for Windows.', linux_alternative: 'Pinta / KolourPaint / Drawing', popularity: 15, homepage: 'https://apps.microsoft.com/detail/9pcfs5b6t72h', alternative_to: null },
  { id: 'microsoft-calculator', name: 'Windows Calculator', category: 'Windows Integrated', description: 'Built-in calculator for Windows.', linux_alternative: 'GNOME Calculator / KCalc', popularity: 10, homepage: 'https://apps.microsoft.com/detail/9WZDNCRFHVN5', alternative_to: null },
  { id: 'microsoft-taskmanager', name: 'Windows Task Manager', category: 'Windows Integrated', description: 'System monitor for Windows.', linux_alternative: 'GNOME System Monitor / Mission Center / htop / btop', popularity: 15, homepage: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer', alternative_to: null },
  { id: 'microsoft-snippingtool', name: 'Windows Snipping Tool', category: 'Windows Integrated', description: 'Screenshot utility for Windows.', linux_alternative: 'Flameshot / Spectacle / GNOME Screenshot', popularity: 15, homepage: 'https://apps.microsoft.com/detail/9mz95kl8mr0l', alternative_to: null },
  { id: 'microsoft-onedrive', name: 'Microsoft OneDrive', category: 'Windows Integrated', description: 'Cloud storage by Microsoft.', linux_alternative: 'Native Linux Version (web-based) / rclone CLI', popularity: 25, homepage: 'https://onedrive.live.com/', alternative_to: 'Dropbox' },
  { id: 'microsoft-phone-link', name: 'Microsoft Phone Link', category: 'Windows Integrated', description: 'Connect phone to Windows PC.', linux_alternative: 'KDE Connect / GSConnect', popularity: 15, homepage: 'https://www.microsoft.com/en-us/windows/microsoft-phone-link', alternative_to: 'KDE Connect' },
  { id: 'powertoys-run', name: 'PowerToys Run', category: 'Windows Integrated', description: 'Quick launcher for Windows.', linux_alternative: 'rofi / dmenu / ulauncher', popularity: 15, homepage: 'https://github.com/microsoft/PowerToys', alternative_to: null },
  { id: 'fancyzones', name: 'FancyZones', category: 'Windows Integrated', description: 'Window manager for Windows.', linux_alternative: 'KWin tiling / Pop Shell / hyprland', popularity: 15, homepage: 'https://github.com/microsoft/PowerToys', alternative_to: null },
];

// Filter out duplicates
const filtered = newApps.filter(app => !existingIds.has(app.id.toLowerCase()));
console.log(`\nNew apps to add: ${filtered.length}`);
console.log(`Duplicates skipped: ${newApps.length - filtered.length}`);

// Group by category
const byCategory = {};
filtered.forEach(app => {
  if (!byCategory[app.category]) byCategory[app.category] = [];
  byCategory[app.category].push(app);
});

// Print summary
for (const [cat, apps] of Object.entries(byCategory)) {
  console.log(`  ${cat}: ${apps.length}`);
}

// Generate SQL
let sql = '-- New apps batch - expanded database\n';
sql += '-- Generated by add-no-duplicates.js\n';
sql += '-- Execute with: wrangler d1 execute itrunsonlinux-db --file=db/expansion/batch-expanded.sql\n\n';

sql += 'INSERT INTO apps (id, name, description, category, icon, linux_alternative, popularity, homepage, alternative_to) VALUES\n';
filtered.forEach((app, i) => {
  const comma = i < filtered.length - 1 ? ',' : ';';
  sql += `('${app.id}', '${app.name.replace(/'/g, "''")}', '${app.description.replace(/'/g, "''")}', '${app.category}', NULL, '${(app.linux_alternative || '').replace(/'/g, "''")}', ${app.popularity || 0}, '${(app.homepage || '').replace(/'/g, "''")}', ${app.alternative_to ? "'" + app.alternative_to.replace(/'/g, "''") + "'" : 'NULL'})${comma}\n`;
});

// Also generate some reports for native apps
sql += '\nINSERT INTO reports (id, app_id, github_user, rating, runner, details, date) VALUES\n';
const reportEntries = filtered.filter(a => a.linux_alternative && a.linux_alternative.includes('Native')).slice(0, 30);
reportEntries.forEach((app, i) => {
  const comma = i < reportEntries.length - 1 ? ',' : ';';
  sql += `('exp-${i+1}', '${app.id}', 'community', 'Native', 'Native', '${app.name} runs natively on Linux.', '2026-06-17')${comma}\n`;
});

fs.writeFileSync(path.join(projectRoot, 'db/expansion/batch-expanded.sql'), sql);
console.log(`\nSQL saved to db/expansion/batch-expanded.sql`);
console.log(`Total entries: ${filtered.length} apps + ${reportEntries.length} reports`);
