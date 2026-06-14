const fs = require('fs');

const altData = [
  { id: 'libreoffice', alt: 'Microsoft Office, Word, Excel, PowerPoint, MS Office' },
  { id: 'onlyoffice', alt: 'Microsoft Office, Word, Excel, PowerPoint, MS Office' },
  { id: 'gimp', alt: 'Adobe Photoshop, Photoshop' },
  { id: 'krita', alt: 'Adobe Photoshop, Corel Painter, Paint Tool SAI, Procreate' },
  { id: 'inkscape', alt: 'Adobe Illustrator, CorelDRAW' },
  { id: 'darktable', alt: 'Adobe Lightroom' },
  { id: 'rawtherapee', alt: 'Adobe Lightroom' },
  { id: 'blender', alt: 'Autodesk Maya, 3ds Max, Cinema 4D' },
  { id: 'davinci-resolve', alt: 'Adobe Premiere Pro, Final Cut Pro, Sony Vegas' },
  { id: 'kdenlive', alt: 'Adobe Premiere Pro, Sony Vegas' },
  { id: 'audacity', alt: 'Adobe Audition' },
  { id: 'lmms', alt: 'FL Studio, Logic Pro' },
  { id: 'ardour', alt: 'Pro Tools, Ableton Live' },
  { id: 'thunderbird', alt: 'Microsoft Outlook, Outlook' },
  { id: 'mozilla-firefox', alt: 'Internet Explorer, Safari' },
  { id: 'obs-studio', alt: 'XSplit, Streamlabs' },
  { id: 'dbeaver', alt: 'SQL Server Management Studio, SSMS, Navicat' },
  { id: 'freecad', alt: 'AutoCAD, SolidWorks' },
  { id: 'sweethome3d', alt: 'SketchUp' },
  { id: 'scribus', alt: 'Adobe InDesign' },
  { id: 'bitwarden', alt: 'LastPass, Dashlane' }
];

let sql = '';
for (const item of altData) {
  sql += `UPDATE apps SET alternative_to = '${item.alt.replace(/'/g, "''")}' WHERE id = '${item.id}';\n`;
}

fs.writeFileSync('db/seed-alternatives.sql', sql);
console.log('Alternatives SQL generated');
