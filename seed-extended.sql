-- Extended Seed Data Generated on 2026-06-14T14:05:01.667Z
DELETE FROM reports;
DELETE FROM apps;

INSERT INTO apps (id, name, description, category, icon, linux_alternative) VALUES
('adobe-photoshop', 'Adobe Photoshop 2024', 'The most popular professional image editing and raster graphics software in the world.', 'Design', 'adobe-photoshop-icon', 'GIMP / Krita'),
('microsoft-excel', 'Microsoft Excel', 'Industry standard spreadsheet editor developed by Microsoft.', 'Office', 'microsoft-excel-icon', 'LibreOffice Calc / ONLYOFFICE'),
('autocad', 'AutoCAD 2024', 'Computer-aided design (CAD) software for architecture, engineering, and construction.', 'Engineering', 'autocad-icon', 'FreeCAD / BricsCAD'),
('fl-studio', 'FL Studio', 'Complete software music production environment and digital audio workstation (DAW).', 'Audio', 'fl-studio-icon', 'LMMS / Bitwig Studio / Reaper'),
('epic-games', 'Epic Games Launcher', 'Storefront launcher for Epic Games, Unreal Engine, and PC gaming.', 'Games', 'epic-games-icon', 'Heroic Games Launcher / Lutris'),
('steam', 'Steam', 'The ultimate entertainment platform. Play, connect, create, and more.', 'Games', 'steam-icon', 'Steam (Native Linux Version)'),
('discord', 'Discord Canary', 'Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.', 'Social', 'discord-icon', 'Discord (Native Linux Version)'),
('spotify', 'Spotify', 'Digital music service that gives you access to millions of songs.', 'Audio', 'spotify-icon', 'Spotify (Native Linux Version)'),
('chrome', 'Google Chrome Beta', 'Try new features with Chrome Beta', 'Utilities', 'chrome-icon', 'Firefox / Chromium / Brave'),
('notepadplusplus', 'Notepad++', 'Free source code editor and Notepad replacement that supports several languages.', 'Development', 'notepadplusplus-icon', 'Notepadqq / VS Code / VSCodium'),
('winrar', 'WinRAR', 'Powerful archive manager that can backup data and reduce size of email attachments.', 'Utilities', 'winrar-icon', 'PeaZip / Ark / File Roller'),
('utorrent', 'uTorrent', 'Lightweight BitTorrent client designed for Windows desktop.', 'Utilities', 'utorrent-icon', 'qBittorrent / Transmission'),
('slack', 'Slack', 'Team communication tool providing real-time messaging, archiving, and search.', 'Social', 'slack-icon', 'Slack (Native Linux Version)'),
('zoom', 'Zoom', 'Video conferencing, web conferencing, and webinar service.', 'Social', 'zoom-icon', 'Zoom (Native Linux Version)'),
('vscode', 'Microsoft Visual Studio Code Insiders', 'Microsoft Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications. Microsoft Visual Studio Code is free and available on your favorite platform - Linux, macOS, and Windows.', 'Development', 'vscode-icon', 'VS Code (Native Linux Version) / VSCodium'),
('adobe-premiere', 'Adobe Premiere Pro', 'Timeline-based video editing software application developed by Adobe.', 'Design', 'adobe-premiere-icon', 'DaVinci Resolve / Kdenlive'),
('adobe-illustrator', 'Adobe Illustrator', 'Vector graphics editor and design program developed and marketed by Adobe.', 'Design', 'adobe-illustrator-icon', 'Inkscape'),
('ccleaner', 'CCleaner Professional Trial', 'CCleaner is a utility used to clean potentially unwanted files and invalid Windows Registry entries from a computer.', 'Utilities', 'ccleaner-icon', 'BleachBit'),
('rufus', 'Rufus', 'Utility that helps format and create bootable USB flash drives.', 'Utilities', 'rufus-icon', 'Ventoy / BalenaEtcher'),
('paint-net', 'Paint.NET', 'Free image and photo editing software for PCs that run Windows.', 'Design', 'paint-net-icon', 'Pinta');

INSERT INTO reports (id, app_id, github_user, rating, runner, details, date) VALUES
('1', 'adobe-photoshop', 'jrodriiguezg', 'Silver', 'Bottles', 'Works using the Soda runner in Bottles. The installation fails on the first try, so you must use the offline installer. Decent performance.', '2026-06-14'),
('2', 'microsoft-excel', 'jrodriiguezg', 'Bronze', 'Wine', 'Opens basic files, but advanced macros and VBA plugins crash the application.', '2026-06-14'),
('3', 'autocad', 'jrodriiguezg', 'Garbage', 'CrossOver', 'Impossible to install. Fails at the licensing service and does not render the viewport canvas.', '2026-06-14'),
('4', 'fl-studio', 'jrodriiguezg', 'Platinum', 'Lutris', 'Using the latest Lutris-GE version. Audio works perfectly with Pipewire-ALSA. Loads all VSTs with no issues.', '2026-06-14'),
('5', 'epic-games', 'linux-refugee', 'Native', 'Native', 'I use Heroic Games Launcher, which is a native client for Linux. Everything runs extremely fast.', '2026-06-14'),
('6', 'steam', 'linux-refugee', 'Native', 'Native', 'Steam runs natively on Linux. Valve Proton compatibility runs most Windows games flawlessly.', '2026-06-14'),
('7', 'discord', 'linux-refugee', 'Native', 'Native', 'Native Flatpak client works perfectly. Screen sharing might require Wayland workarounds depending on your distro.', '2026-06-14'),
('8', 'spotify', 'linux-refugee', 'Native', 'Native', 'Official Flatpak/snap works great. Seamless audio integration.', '2026-06-14'),
('9', 'chrome', 'linux-refugee', 'Native', 'Native', 'Chrome runs natively on all Linux distributions. Installed via flatpak or official deb/rpm repos.', '2026-06-14'),
('10', 'notepadplusplus', 'jrodriiguezg', 'Gold', 'Wine', 'Runs incredibly fast via Wine. Almost 100% stable, but using native Notepadqq or VS Code is smoother.', '2026-06-14'),
('11', 'winrar', 'jrodriiguezg', 'Gold', 'Wine', 'Runs perfectly fine in Wine, but PeaZip is a beautiful native alternative you should use instead.', '2026-06-14'),
('12', 'utorrent', 'jrodriiguezg', 'Silver', 'Wine', 'Runs in Wine but contains ads. qBittorrent is native, open-source, and has no ads. Avoid using uTorrent on Linux.', '2026-06-14'),
('13', 'slack', 'linux-refugee', 'Native', 'Native', 'Native app works perfectly. Audio/video calls are fully stable.', '2026-06-14'),
('14', 'zoom', 'linux-refugee', 'Native', 'Native', 'Native client available via Flatpak. Screen sharing on Wayland is supported in recent versions.', '2026-06-14'),
('15', 'vscode', 'linux-refugee', 'Native', 'Native', 'Runs natively and beautifully. Full support for extensions and terminal integrations.', '2026-06-14'),
('16', 'adobe-premiere', 'jrodriiguezg', 'Garbage', 'Bottles', 'Crashing on startup. Fails to initialize GPU drivers and timeline rendering is broken. Use DaVinci Resolve instead.', '2026-06-14'),
('17', 'adobe-illustrator', 'jrodriiguezg', 'Silver', 'Wine', 'Can be run via older Wine versions, but has noticeable lag and missing menu renderers. Inkscape is a solid native alternative.', '2026-06-14'),
('18', 'ccleaner', 'jrodriiguezg', 'Garbage', 'Wine', 'No sense to run this on Linux as there is no Windows registry. Use BleachBit to clean up cache files natively.', '2026-06-14'),
('19', 'rufus', 'jrodriiguezg', 'Garbage', 'Wine', 'Cannot access low-level raw USB drives in Wine. Use Ventoy or BalenaEtcher, they are native and much better.', '2026-06-14'),
('20', 'paint-net', 'jrodriiguezg', 'Bronze', 'Wine', 'Requires .NET framework installation which is very tricky in Wine. Pinta is a native Linux clone of Paint.NET.', '2026-06-14');
