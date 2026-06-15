import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const alternativesMap = {
  '1ic-bpmn-rpastudio': 'Native Linux Version',
  '1mhz-knotes': 'Obsidian / Joplin / Logseq',
  '1zilc-fishingfunds': 'GNOME Shell Extension / Kicker Applet',
  '2brightsparks-syncbackfree': 'FreeFileSync / Deja Dup / Rsync',
  '2brightsparks-syncbackpro': 'FreeFileSync / Deja Dup / Rsync',
  '2brightsparks-syncbackse': 'FreeFileSync / Deja Dup / Rsync',
  '360-360zip': 'PeaZip / File Roller / Ark',
  '3cx-callflowdesigner': 'Linphone / Ekiga / Jami',
  '3cx-softphone': 'Linphone / Jami',
  '3dconnexion-3dxware-10': 'spacenavd (Open-source driver)',
  '3t-robo3t': 'Native Linux Version|flathub:com.3t.robo3t',
  '3ll3d00d-beqdesigner': 'REW (Room EQ Wizard) / BEQDesigner (Java)',
  '4gray-iptvnator': 'Native Linux Version|flathub:com.github.4gray.iptvnator',
  '4tniagarasoftware-4ttrayminimizer': 'Natively integrated in KDE / GNOME',
  '720kb-ndm': 'Native Linux Version',
  '7s2p-effie': 'Obsidian / Typora / MarkText',
  '7s2p-effie-cn': 'Obsidian / Typora / MarkText',
  '7room-aya': 'Czkawka / FSlint',
  '7zip-7zip': 'Native Linux Version|flathub:org.7zip.7zip',
  '7zip-7zip-alpha-exe': 'Native Linux Version|flathub:org.7zip.7zip',
  '7zip-7zip-alpha-msi': 'Native Linux Version|flathub:org.7zip.7zip',
  '8x8-virtualofficedesktop': 'Native Linux Version (PWA / Web Client)',
  'a-sit-pdf-over': 'Okular / LibreOffice Draw / Xournal++',
  'aaainternetpublishing-wtfast': 'ProtonVPN / Mudfish (Standard VPNs)',
  'aas-worldwidetelescope': 'Stellarium / KStars',
  'acrossecurity-0patch': 'Natively handled by system Package Manager',
  'agfeo-agfeodashboard': 'Linphone / Jami',
  'agsprojectteam-adventuregamestudio': 'Native Linux Version',
  'aimp-aimp': 'Audacious / Strawberry / Clementine',
  'alcpu-coretemp': 'Psensor / lm-sensors / Hardinfo',
  'alvr-alvr': 'Native Linux Version|github:alvr-org/ALVR',
  'amd-ocat': 'MangoHud',
  'amssoftware-businesscardmaker': 'gLabels / Inkscape',
  'amssoftware-clipify': 'Kdenlive / Shotcut / OpenShot',
  'amssoftware-interiordesign3d': 'Sweet Home 3D',
  'amssoftware-passportphotomaker': 'gLabels / GIMP',
  'amssoftware-phoenixfilerescue': 'TestDisk / PhotoRec',
  'amssoftware-photocalendarcreator': 'gLabels / GIMP',
  'amssoftware-photodiva': 'Krita / GIMP / Darktable',
  'amssoftware-photoglory': 'GIMP / Krita',
  'amssoftware-photoworks': 'GIMP / Darktable / RawTherapee',
  'antorg-inc-asciiengine': 'ncurses / libcaca',
  'aomei-backupper': 'Timeshift / Deja Dup / Rescuezilla',
  'aomei-partitionassistant': 'GParted / KDE Partition Manager',
  'asgardexmaintainers-asgardex': 'Native Linux Version',
  'atlauncher-atlauncher': 'Native Linux Version (Java Jar)',
  'atnsoft-keymanager': 'Input Remapper / Keyd',
  'atnsoft-keyremapper': 'Input Remapper / Keyd',
  'atnsoft-textpaster': 'Espanso / AutoKey',
  'avs-installpackcomplete': 'HandBrake / Kdenlive / Audacity',
  'aardappel-cube': 'Native Linux Version',
  'abacus-abaclient': 'Native Linux Version (Java / Web Client)',
  'abdelrahmanbayoumi-azkar': 'Sabily / Minbar / Web/PWA',
  'ability-abilityoffice-10-professional': 'LibreOffice / ONLYOFFICE',
  'ability-abilityoffice-10-standard': 'LibreOffice / ONLYOFFICE',
  'ability-abilityoffice-8-professional': 'LibreOffice / ONLYOFFICE',
  'ability-abilityoffice-8-standard': 'LibreOffice / ONLYOFFICE',
  'abyss-abyssoverlay': 'MangoHud',
  'acfun-arliveforacfunlive': 'VSeeFace (Wine) / OpenVTuber / Inochi2D',
  'acestream-acestream': 'Native Linux Version',
  'acrosoftware-cutepdfwriter': 'Natively integrated in GNOME / KDE (Print to PDF)',
  'acronis-cyberprotecthomeoffice': 'Timeshift / UrBackup / BorgBackup',
  'actifile-actifileagent': 'Lynis / OpenSCAP',
  'activestate-komodoedit': 'Native Linux Version',
  'activestate-komodoide': 'Native Linux Version',
  'activitywatch-activitywatch': 'Native Linux Version|flathub:net.activitywatch.ActivityWatch',
  'adguard-adguard': 'AdGuard Home / Pi-hole / Brave / uBlock Origin',
  'adguard-adguardhome': 'Native Linux Version',
  'adguard-adguardvpn': 'Native Linux Version (WireGuard / OpenVPN)',
  'adammiskiewicz-graphiql': 'Native Linux Version (Web / PWA)',
  'adamant-messenger': 'Native Linux Version (Web / PWA)',
  'aderitoneto-afterlife': 'Ansible / Custom Shell Scripts',
  'admobilize-admobilize-desktopui': 'Natively cross-platform (Node/Python)',
  'admobilize-admobilize-malosvision': 'Natively cross-platform (Node/Python)',
  'admobilize-admobilize-visionservice': 'Natively cross-platform (Node/Python)',
  'admobilize-admprovider': 'Natively cross-platform (Node/Python)',
  'adobe-acrobat-reader-32-bit': 'Okular / Evince / Foxit PDF Reader',
  'adobe-acrobat-reader-64-bit': 'Okular / Evince / Foxit PDF Reader',
  'adobe-adobeconnect': 'Native Linux Version (Web Client / PWA)',
  'adobe-brackets': 'Native Linux Version',
  'adobe-dngconverter': 'DigiKam / Darktable',
  'adoptopenjdk-openjdk-11': 'Native Linux Version',
  'adoptopenjdk-openjdk-14': 'Native Linux Version',
  'adoptopenjdk-openjdk-15': 'Native Linux Version',
  'adoptopenjdk-openjdk-16': 'Native Linux Version',
  'adoptopenjdk-openjdk-17': 'Native Linux Version',
  'adoptopenjdk-openjdk-8': 'Native Linux Version',
  'adrienallard-fileconverter': 'HandBrake / FFmpeg / Converseen',
  'advice-myadvice-auftragsverwaltung': 'Akaunting / Invoice Ninja',
  'aegisub-aegisub-dev': 'Native Linux Version|flathub:org.aegisub.Aegisub',
  'aether-aether': 'Native Linux Version',
  'agilent-labadvisor': 'OpenChrom',
  'ahlyab-udemycouponfetcher': 'Native Linux Version (Python)',
  'airdroid-airdroid': 'KDE Connect / GSConnect / Web client',
  'airexplorer-airexplorer': 'Rclone / Rclone-browser',
  'airvpn-eddie': 'Native Linux Version',
  'airsquared-blobsaver': 'Native Linux Version|github:airsquared/blobsaver',
  'airytec-switchoff': 'Natively integrated in GNOME / KDE (cron / power managers)',
  'aiursoft-kahla': 'Native Linux Version (Web Client / PWA)',
  'akelpad-akelpad': 'FeatherPad / Kate / Gedit',
  'alacritty-alacritty': 'Native Linux Version',
  'aleab-toastify': 'Natively integrated in Linux desktops (MPRIS notifications)',
  'alekseyhoffman-sigma-file-manager': 'Native Linux Version|github:aleksey-hoffman/sigma-file-manager',
  'alexkaul-freeter': 'Native Linux Version',
  'alexredden-g14controlv2': 'asusctl / supergfxctl',
  'alexthuering-dvdstyler': 'Native Linux Version',
  'alexandrsubbotin-cerebro': 'Native Linux Version|github:cerebroapp/cerebro',
  'algoryx-algodoo': 'Phun (Older Native Version)',
  'alibaba-alibabacloudcli': 'Native Linux Version',
  'alibaba-dingtalk-lite': 'Native Linux Version',
  'alibaba-teambition': 'Native Linux Version (Web Client / PWA)',
  'alist-alist': 'Native Linux Version',
  'allmapsoft-microsoftvirtualearthsatellite': 'QMapShack',
  'allen&heath-ahmsystemmanager': 'Native Linux Version (Web Control)',
  'allen&heath-avantisdirector': 'Native Linux Version (Web Control)',
  'allen&heath-customcontroleditor': 'Native Linux Version (Web Control)',
  'allen&heath-dlivedirector': 'Native Linux Version (Web Control)',
  'amazon-kindle': 'Calibre / Bookworm / FBReader',
  'amazon-nosqlworkbench': 'Native Linux Version',
  'amazon-opensearch-odbc': 'Native OpenSearch SQL JDBC Driver',
  'amazon-sam-cli': 'Native Linux Version',
  'amazon-sendtokindle': 'Calibre',
  'amazon-sessionmanagerplugin': 'Native Linux Version',
  'amazon-workspacesclient': 'Amazon WorkSpaces Client (Native Linux Version)',
  'aminemouafik-ferdi': 'Native Linux Version|flathub:com.github.getferdi.ferdi',
  'anaconda-anaconda3': 'Native Linux Version',
  'anaconda-miniconda3': 'Native Linux Version',
  'andrewiethoff-exactaudiocopy': 'K3b / Whipper',
  'andreaswascher-repoz': 'Gitg / lazygit',
  'andresmorelos-invoncify': 'Native Linux Version',
  'andrewzhezherun-windjview': 'Evince / Okular / DjView',
  'angusjohnson-pdftkbuilder': 'PDFArranger / PDFChain',
  'angusjohnson-resourcehacker': 'GResource / wxMEdit',
  'anjok07-ultimatevocalremover': 'Native Linux Version|github:Anjok07/ultimatevocalremovergui',
};

const dbDir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject/';
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.sqlite') && f !== 'metadata.sqlite');

if (files.length === 0) {
  console.error('No SQLite database found.');
  process.exit(1);
}

const dbPath = path.join(dbDir, files[0]);
const db = new Database(dbPath);

const stmt = db.prepare('UPDATE apps SET linux_alternative = ? WHERE id = ?');

let updatedCount = 0;
const transaction = db.transaction((data) => {
  for (const [id, alt] of Object.entries(data)) {
    const info = stmt.run(alt, id);
    if (info.changes > 0) {
      updatedCount++;
    }
  }
});

transaction(alternativesMap);

console.log(`Successfully updated ${updatedCount} apps with their Linux alternatives locally!`);
db.close();
