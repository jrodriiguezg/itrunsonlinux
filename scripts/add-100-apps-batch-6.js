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
  // Missing DAWs
  {
    id: 'avid-pro-tools',
    name: 'Avid Pro Tools',
    category: 'Audio',
    description: 'Industry-standard digital audio workstation for music and post-production.',
    icon: 'avid-pro-tools-icon',
    linux_alternative: 'Reaper / Ardour / Harrison Mixbus',
    popularity: 45,
    homepage: 'https://www.avid.com/pro-tools',
    alternative_to: ''
  },
  {
    id: 'steinberg-cubase',
    name: 'Steinberg Cubase',
    category: 'Audio',
    description: 'Professional music production software for MIDI sequencing, audio editing and mixing.',
    icon: 'steinberg-cubase-icon',
    linux_alternative: 'Bitwig Studio / Reaper / Ardour',
    popularity: 45,
    homepage: 'https://www.steinberg.net/cubase/',
    alternative_to: ''
  },

  // 3D, Animación y VFX
  {
    id: 'maxon-cinema-4d',
    name: 'Maxon Cinema 4D',
    category: 'Design',
    description: 'Professional 3D modeling, animation, simulation and rendering software.',
    icon: 'maxon-cinema-4d-icon',
    linux_alternative: 'Blender / Houdini (Native Linux Version)',
    popularity: 45,
    homepage: 'https://www.maxon.net/en/cinema-4d',
    alternative_to: ''
  },
  {
    id: 'pixologic-zbrush',
    name: 'Pixologic ZBrush',
    category: 'Design',
    description: 'Digital sculpting tool that combines 3D/2D modeling, texturing and painting.',
    icon: 'pixologic-zbrush-icon',
    linux_alternative: 'Blender / ZBrush via Wine',
    popularity: 45,
    homepage: 'https://www.maxon.net/en/zbrush',
    alternative_to: ''
  },
  {
    id: 'sidefx-houdini',
    name: 'SideFX Houdini',
    category: 'Design',
    description: '3D animation and VFX software with a node-based procedural workflow.',
    icon: 'sidefx-houdini-icon',
    linux_alternative: 'Native Linux Version|flathub:com.sidefx.Houdini / Blender',
    popularity: 45,
    homepage: 'https://www.sidefx.com/',
    alternative_to: ''
  },
  {
    id: 'foundry-nuke',
    name: 'Foundry Nuke',
    category: 'Design',
    description: 'Node-based digital compositing and visual effects application.',
    icon: 'foundry-nuke-icon',
    linux_alternative: 'Native Linux Version / Natron / Blender',
    popularity: 45,
    homepage: 'https://www.foundry.com/products/nuke-family/nuke',
    alternative_to: ''
  },
  {
    id: 'marvelous-designer',
    name: 'Marvelous Designer',
    category: 'Design',
    description: '3D computer graphics program for creating dynamic 3D clothing.',
    icon: 'marvelous-designer-icon',
    linux_alternative: 'Blender (with cloth physics) / Marvelous Designer via Wine',
    popularity: 40,
    homepage: 'https://www.marvelousdesigner.com/',
    alternative_to: ''
  },
  {
    id: 'subsubstance-3d-painter',
    name: 'Adobe Substance 3D Painter',
    category: 'Design',
    description: '3D painting software allowing you to texture and render 3D models.',
    icon: 'subsubstance-3d-painter-icon',
    linux_alternative: 'Native Linux Version / Blender / ArmorPaint / Material Maker',
    popularity: 45,
    homepage: 'https://www.adobe.com/products/substance3d-painter.html',
    alternative_to: ''
  },
  {
    id: 'unreal-engine-editor',
    name: 'Unreal Engine',
    category: 'Development',
    description: 'State-of-the-art real-time 3D creation tool for game development.',
    icon: 'unreal-engine-editor-icon',
    linux_alternative: 'Native Linux Version (official source build) / Godot Engine',
    popularity: 50,
    homepage: 'https://www.unrealengine.com/',
    alternative_to: ''
  },

  // Redes y Seguridad
  {
    id: 'cisco-packet-tracer-app',
    name: 'Cisco Packet Tracer',
    category: 'Development',
    description: 'Visual simulation tool designed by Cisco to practice networking configurations.',
    icon: 'cisco-packet-tracer-app-icon',
    linux_alternative: 'Native Linux Version (official Ubuntu deb package) / GNS3',
    popularity: 45,
    homepage: 'https://www.netacad.com/courses/packet-tracer',
    alternative_to: ''
  },
  {
    id: 'gns3-network-sim',
    name: 'GNS3',
    category: 'Development',
    description: 'Graphical Network Simulator that emulates real network hardware.',
    icon: 'gns3-network-sim-icon',
    linux_alternative: 'Native Linux Version|flathub:net.gns3.GNS3',
    popularity: 45,
    homepage: 'https://www.gns3.com/',
    alternative_to: ''
  },
  {
    id: 'prtg-network-monitor-app',
    name: 'PRTG Network Monitor',
    category: 'Utilities',
    description: 'Network monitoring software for infrastructure, traffic and device analysis.',
    icon: 'prtg-network-monitor-app-icon',
    linux_alternative: 'Zabbix / Nagios / Prometheus / Grafana',
    popularity: 40,
    homepage: 'https://www.paessler.com/prtg',
    alternative_to: ''
  },
  {
    id: 'fiddler-classic-web',
    name: 'Fiddler Classic',
    category: 'Development',
    description: 'Web debugging proxy tool that logs all HTTP(S) traffic between your computer and the Internet.',
    icon: 'fiddler-classic-web-icon',
    linux_alternative: 'Fiddler Everywhere (Native Linux Version) / Wireshark / Mitmproxy',
    popularity: 40,
    homepage: 'https://www.telerik.com/fiddler/fiddler-classic',
    alternative_to: ''
  },
  {
    id: 'burp-suite-scanner',
    name: 'Burp Suite',
    category: 'Development',
    description: 'Leading software security testing and web vulnerability scanner tool.',
    icon: 'burp-suite-scanner-icon',
    linux_alternative: 'Native Linux Version / OWASP ZAP',
    popularity: 45,
    homepage: 'https://portswigger.net/burp',
    alternative_to: ''
  },
  {
    id: 'metasploit-framework-kit',
    name: 'Metasploit Framework',
    category: 'Development',
    description: 'Penetration testing platform that enables finding, exploiting, and validating vulnerabilities.',
    icon: 'metasploit-framework-kit-icon',
    linux_alternative: 'Native Linux Version (Metasploit is native to Linux)',
    popularity: 45,
    homepage: 'https://www.metasploit.com/',
    alternative_to: ''
  },
  {
    id: 'nessus-vulnerability',
    name: 'Nessus',
    category: 'Development',
    description: 'Proprietary vulnerability scanner developed by Tenable Network Security.',
    icon: 'nessus-vulnerability-icon',
    linux_alternative: 'Native Linux Version / OpenVAS (Greenbone)',
    popularity: 40,
    homepage: 'https://www.tenable.com/products/nessus',
    alternative_to: ''
  },

  // Databases & Server stacks
  {
    id: 'wampserver-stack',
    name: 'WampServer',
    category: 'Development',
    description: 'Windows web development environment allowing you to create web applications with Apache2, PHP and MySQL.',
    icon: 'wampserver-stack-icon',
    linux_alternative: 'XAMPP (Linux native) / Docker / Local LAMP stack',
    popularity: 40,
    homepage: 'https://www.wampserver.com/en/',
    alternative_to: ''
  },
  {
    id: 'laragon-dev-stack',
    name: 'Laragon',
    category: 'Development',
    description: 'Portable, fast, and lightweight local development environment for PHP, Node.js, Python, and Go.',
    icon: 'laragon-dev-stack-icon',
    linux_alternative: 'Docker / Lando / Local LAMP / XAMPP',
    popularity: 40,
    homepage: 'https://laragon.org/',
    alternative_to: ''
  },
  {
    id: 'pgadmin-postgresql',
    name: 'pgAdmin',
    category: 'Development',
    description: 'Popular open source administration and development platform for PostgreSQL.',
    icon: 'pgadmin-postgresql-icon',
    linux_alternative: 'Native Linux Version / pgAdmin Web / DBeaver',
    popularity: 45,
    homepage: 'https://www.pgadmin.org/',
    alternative_to: ''
  },
  {
    id: 'mongodb-compass-gui',
    name: 'MongoDB Compass',
    category: 'Development',
    description: 'Official GUI client for querying, optimizing, and analyzing MongoDB databases.',
    icon: 'mongodb-compass-gui-icon',
    linux_alternative: 'Native Linux Version|flathub:com.mongodb.Compass / Studio 3T',
    popularity: 45,
    homepage: 'https://www.mongodb.com/products/compass',
    alternative_to: ''
  },
  {
    id: 'redis-desktop-manager-resp',
    name: 'Redis Desktop Manager',
    category: 'Development',
    description: 'Fast open-source Redis database GUI management tool.',
    icon: 'redis-desktop-manager-resp-icon',
    linux_alternative: 'Native Linux Version|flathub:app.resp.RESP / RedisInsight / Another Redis Desktop Manager',
    popularity: 45,
    homepage: 'https://resp.app/',
    alternative_to: ''
  },

  // Diagnostics & utilities
  {
    id: 'hwinfo64-spec-tool',
    name: 'HWiNFO64',
    category: 'Utilities',
    description: 'Professional hardware information and diagnostic tool for 64-bit systems.',
    icon: 'hwinfo64-spec-tool-icon',
    linux_alternative: 'Hardinfo / CPU-X / HWiNFO via Wine',
    popularity: 45,
    homepage: 'https://www.hwinfo.com/',
    alternative_to: ''
  },
  {
    id: 'victoria-hdd-tool',
    name: 'Victoria HDD/SSD',
    category: 'Utilities',
    description: 'Powerful hard drive diagnostics and bad sectors recovery tool.',
    icon: 'victoria-hdd-tool-icon',
    linux_alternative: 'GNOME Disks / GSmartControl / ddrescue',
    popularity: 35,
    homepage: 'http://hdd.by/',
    alternative_to: ''
  },
  {
    id: 'thaiphoon-burner-ram',
    name: 'Thaiphoon Burner',
    category: 'Utilities',
    description: 'Utility that reads and programs SPD EEPROM chips of RAM modules.',
    icon: 'thaiphoon-burner-ram-icon',
    linux_alternative: 'i2cdump (CLI) / Thaiphoon Burner via Wine',
    popularity: 35,
    homepage: 'http://www.softnology.biz/',
    alternative_to: ''
  },
  {
    id: 'veracrypt-disk-encryption',
    name: 'VeraCrypt',
    category: 'Utilities',
    description: 'Free open-source disk encryption software based on TrueCrypt.',
    icon: 'veracrypt-disk-encryption-icon',
    linux_alternative: 'Native Linux Version|flathub:fr.tuxfamily.VeraCrypt / LUKS (native Linux encryption)',
    popularity: 45,
    homepage: 'https://www.veracrypt.fr/',
    alternative_to: ''
  },

  // Android Emulators
  {
    id: 'noxplayer-android-emu',
    name: 'NoxPlayer',
    category: 'Games',
    description: 'Android emulator designed for playing mobile games on PC.',
    icon: 'noxplayer-android-emu-icon',
    linux_alternative: 'Waydroid / Genymotion / Anbox',
    popularity: 40,
    homepage: 'https://www.bignox.com/',
    alternative_to: ''
  },
  {
    id: 'ldplayer-android-emu',
    name: 'LDPlayer',
    category: 'Games',
    description: 'Lightweight Android emulator optimized for running mobile games on Windows.',
    icon: 'ldplayer-android-emu-icon',
    linux_alternative: 'Waydroid / Genymotion',
    popularity: 40,
    homepage: 'https://www.ldplayer.net/',
    alternative_to: ''
  },

  // Sysadmin & System Utilities
  {
    id: 'q-dir-quad-manager',
    name: 'Q-Dir',
    category: 'Utilities',
    description: 'Quad-panel file explorer manager for Windows.',
    icon: 'q-dir-quad-manager-icon',
    linux_alternative: 'Dolphin / Krusader / Double Commander',
    popularity: 40,
    homepage: 'http://www.softwareok.com/?seite=Freeware/Q-Dir',
    alternative_to: ''
  },
  {
    id: 'eartrumpet-mixer',
    name: 'EarTrumpet',
    category: 'Utilities',
    description: 'Modern volume control app wrapper for Windows providing individual app volume control.',
    icon: 'eartrumpet-mixer-icon',
    linux_alternative: 'PipeWire / PulseAudio Volume Control (pavucontrol) / GNOME volume control',
    popularity: 40,
    homepage: 'https://eartrumpet.app/',
    alternative_to: ''
  },
  {
    id: 'fan-control-system-app',
    name: 'Fan Control',
    category: 'Utilities',
    description: 'Highly customizable GPU and CPU fan speed control software for Windows.',
    icon: 'fan-control-system-app-icon',
    linux_alternative: 'Coolero / fancontrol (CLI) / Thinkfan',
    popularity: 40,
    homepage: 'https://getfancontrol.com/',
    alternative_to: ''
  },
  {
    id: 'pdq-deploy-software',
    name: 'PDQ Deploy',
    category: 'Utilities',
    description: 'Automated software deployment tool that silently installs applications to multiple computers.',
    icon: 'pdq-deploy-software-icon',
    linux_alternative: 'Ansible / Puppet / SaltStack / Chef',
    popularity: 40,
    homepage: 'https://www.pdq.com/pdq-deploy/',
    alternative_to: ''
  },
  {
    id: 'pdq-inventory-sys',
    name: 'PDQ Inventory',
    category: 'Utilities',
    description: 'Systems management tool that scans, tracks, and audits computer hardware and software.',
    icon: 'pdq-inventory-sys-icon',
    linux_alternative: 'OCS Inventory / GLPI / Ansible',
    popularity: 40,
    homepage: 'https://www.pdq.com/pdq-inventory/',
    alternative_to: ''
  },
  {
    id: 'veeam-backup-replication-server',
    name: 'Veeam Backup & Replication',
    category: 'Utilities',
    description: 'Enterprise-grade backup, restore and replication solution for virtual, physical and cloud workloads.',
    icon: 'veeam-backup-replication-server-icon',
    linux_alternative: 'UrBackup / BorgBackup / Veeam Agent for Linux (Native version)',
    popularity: 45,
    homepage: 'https://www.veeam.com/',
    alternative_to: ''
  },
  {
    id: 'mremoteng-client',
    name: 'mRemoteNG',
    category: 'Utilities',
    description: 'Open-source, tabbed, multi-protocol remote connections manager.',
    icon: 'mremoteng-client-icon',
    linux_alternative: 'Remmina / Asbru Connection Manager',
    popularity: 40,
    homepage: 'https://mremoteng.org/',
    alternative_to: ''
  },
  {
    id: 'royal-ts-win',
    name: 'Royal TS',
    category: 'Utilities',
    description: 'Professional tool for managing remote connections and credentials.',
    icon: 'royal-ts-win-icon',
    linux_alternative: 'Remmina / Royal TS (Web) / Asbru Connection Manager',
    popularity: 40,
    homepage: 'https://www.royalapps.com/ts/win/features',
    alternative_to: ''
  },
  {
    id: 'lansweeper-asset-scan',
    name: 'Lansweeper',
    category: 'Utilities',
    description: 'IT asset management and network inventory software that automatically scans systems.',
    icon: 'lansweeper-asset-scan-icon',
    linux_alternative: 'OCS Inventory / Open-AudIT / GLPI',
    popularity: 40,
    homepage: 'https://www.lansweeper.com/',
    alternative_to: ''
  },
  {
    id: 'dameware-remote-control',
    name: 'DameWare Remote Support',
    category: 'Utilities',
    description: 'Enterprise remote control and systems management software tool.',
    icon: 'dameware-remote-control-icon',
    linux_alternative: 'Remmina / RustDesk / MeshCentral',
    popularity: 40,
    homepage: 'https://www.solarwinds.com/dameware-remote-support',
    alternative_to: ''
  },
  {
    id: 'netwrix-auditor-compliance',
    name: 'Netwrix Auditor',
    category: 'Utilities',
    description: 'IT auditing and security compliance software for change tracking.',
    icon: 'netwrix-auditor-compliance-icon',
    linux_alternative: 'Osquery / Auditd / Wazuh',
    popularity: 35,
    homepage: 'https://www.netwrix.com/auditor.html',
    alternative_to: ''
  },

  // Classroom Management & Educational Tools
  {
    id: 'veyon-classroom-manager',
    name: 'Veyon',
    category: 'Utilities',
    description: 'Computer monitoring and classroom management software for teacher computers.',
    icon: 'veyon-classroom-manager-icon',
    linux_alternative: 'Native Linux Version|flathub:io.github.veyon.Veyon / Epoptes',
    popularity: 45,
    homepage: 'https://veyon.io/',
    alternative_to: ''
  },
  {
    id: 'netsupport-school-classroom',
    name: 'NetSupport School',
    category: 'Utilities',
    description: 'Classroom management and instruction software solution.',
    icon: 'netsupport-school-classroom-icon',
    linux_alternative: 'Veyon / Epoptes',
    popularity: 40,
    homepage: 'https://www.netsupportschool.com/',
    alternative_to: ''
  },
  {
    id: 'smart-notebook-edu',
    name: 'Smart Notebook',
    category: 'Office',
    description: 'Interactive whiteboard software for lesson planning and delivery.',
    icon: 'smart-notebook-edu-icon',
    linux_alternative: 'OpenBoard / Open-Sankore',
    popularity: 40,
    homepage: 'https://www.smarttech.com/products/education-software/smart-notebook',
    alternative_to: ''
  },
  {
    id: 'activinspire-board',
    name: 'ActivInspire',
    category: 'Office',
    description: 'Collaborative lesson delivery software for interactive whiteboards.',
    icon: 'activinspire-board-icon',
    linux_alternative: 'OpenBoard / Open-Sankore',
    popularity: 40,
    homepage: 'https://support.prometheanworld.com/product/activinspire',
    alternative_to: ''
  },
  {
    id: 'flowgorithm-chart',
    name: 'Flowgorithm',
    category: 'Development',
    description: 'Graphical authoring tool which allows students to write and execute programs using flowcharts.',
    icon: 'flowgorithm-chart-icon',
    linux_alternative: 'Flowgorithm (via Wine) / Scratch / Blockly',
    popularity: 45,
    homepage: 'http://www.flowgorithm.org/',
    alternative_to: ''
  },
  {
    id: 'logger-pro-analysis',
    name: 'Logger Pro',
    category: 'Development',
    description: 'Data-collection and analysis software for science and math education.',
    icon: 'logger-pro-analysis-icon',
    linux_alternative: 'Logger Pro via Wine / Kst / SciDAVis',
    popularity: 40,
    homepage: 'https://www.vernier.com/product/logger-pro-3/',
    alternative_to: ''
  },

  // ERP & Enterprise Project Management
  {
    id: 'sap-gui-desktop',
    name: 'SAP GUI',
    category: 'Office',
    description: 'Client software to access SAP Central Component applications.',
    icon: 'sap-gui-desktop-icon',
    linux_alternative: 'SAP GUI for Java (Native Linux Version) / SAP Fiori (Web)',
    popularity: 45,
    homepage: 'https://support.sap.com/',
    alternative_to: ''
  },
  {
    id: 'sage-50-accounting-software',
    name: 'Sage 50',
    category: 'Office',
    description: 'Market-leading desktop accounting and business management software.',
    icon: 'sage-50-accounting-software-icon',
    linux_alternative: 'Sage 50 via Wine / GnuCash / Odoo',
    popularity: 40,
    homepage: 'https://www.sage.com/',
    alternative_to: ''
  },
  {
    id: 'sage-200-cloud-erp',
    name: 'Sage 200',
    category: 'Office',
    description: 'Enterprise resource planning and financial management solution for mid-sized companies.',
    icon: 'sage-200-cloud-erp-icon',
    linux_alternative: 'Odoo / ERPNext / Tryton',
    popularity: 40,
    homepage: 'https://www.sage.com/en-gb/products/sage-200/',
    alternative_to: ''
  },
  {
    id: 'a3asesor-tax',
    name: 'A3asesor',
    category: 'Office',
    description: 'Comprehensive business management and tax calculation suite for professional advisors.',
    icon: 'a3asesor-tax-icon',
    linux_alternative: 'a3innuva (Web browser version) / Odoo',
    popularity: 40,
    homepage: 'https://www.wolterskluwer.com/es-es/solutions/a3/a3asesor',
    alternative_to: ''
  },
  {
    id: 'a3innuva-hr-payroll',
    name: 'A3innuva',
    category: 'Office',
    description: 'Cloud-based human resources and employee payroll software by Wolters Kluwer.',
    icon: 'a3innuva-hr-payroll-icon',
    linux_alternative: 'Web-based app running natively in any browser',
    popularity: 40,
    homepage: 'https://www.wolterskluwer.com/es-es/solutions/a3/a3innuva',
    alternative_to: ''
  },
  {
    id: 'ganttproject-scheduler',
    name: 'GanttProject',
    category: 'Office',
    description: 'Free desktop project management tool using Gantt chart, resource load charts and MS Project formats.',
    icon: 'ganttproject-scheduler-icon',
    linux_alternative: 'Native Linux Version|flathub:biz.ganttproject.GanttProject / ProjectLibre',
    popularity: 45,
    homepage: 'https://www.ganttproject.org/',
    alternative_to: ''
  },
  {
    id: 'projectlibre-desktop-planner',
    name: 'ProjectLibre',
    category: 'Office',
    description: 'Open-source desktop alternative to Microsoft Project.',
    icon: 'projectlibre-desktop-planner-icon',
    linux_alternative: 'Native Linux Version / GanttProject',
    popularity: 45,
    homepage: 'https://www.projectlibre.com/',
    alternative_to: ''
  },

  // GIS / Science / Data
  {
    id: 'arcgis-pro-gis',
    name: 'ArcGIS Pro',
    category: 'Engineering',
    description: 'Professional 64-bit desktop GIS application by Esri.',
    icon: 'arcgis-pro-gis-icon',
    linux_alternative: 'QGIS / ArcGIS Pro via Wine / ArcGIS Web client',
    popularity: 45,
    homepage: 'https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview',
    alternative_to: ''
  },
  {
    id: 'qgis-desktop-gis',
    name: 'QGIS',
    category: 'Engineering',
    description: 'Free and open-source Geographic Information System (GIS) application.',
    icon: 'qgis-desktop-gis-icon',
    linux_alternative: 'Native Linux Version|flathub:org.qgis.qgis',
    popularity: 45,
    homepage: 'https://www.qgis.org/',
    alternative_to: ''
  },
  {
    id: 'ibm-spss-statistics-app',
    name: 'IBM SPSS Statistics',
    category: 'Engineering',
    description: 'Leading software suite for statistical data analysis and predictive modeling.',
    icon: 'ibm-spss-statistics-app-icon',
    linux_alternative: 'IBM SPSS for Linux (Native version) / PSPP / RStudio',
    popularity: 45,
    homepage: 'https://www.ibm.com/products/spss-statistics',
    alternative_to: ''
  },
  {
    id: 'originlab-origin-chart',
    name: 'OriginLab Origin',
    category: 'Engineering',
    description: 'Data analysis and graphing software for scientists and engineers.',
    icon: 'originlab-origin-chart-icon',
    linux_alternative: 'Origin via Wine / SciDAVis / LabPlot',
    popularity: 45,
    homepage: 'https://www.originlab.com/',
    alternative_to: ''
  },
  {
    id: 'maxqda-analysis',
    name: 'MAXQDA',
    category: 'Office',
    description: 'Professional software for qualitative and mixed methods data analysis.',
    icon: 'maxqda-analysis-icon',
    linux_alternative: 'MAXQDA for Linux (Native version) / Taguette / RQDA',
    popularity: 40,
    homepage: 'https://www.maxqda.com/',
    alternative_to: ''
  },
  {
    id: 'nvivo-analysis',
    name: 'NVivo',
    category: 'Office',
    description: 'Qualitative data analysis software package for researchers working with rich text.',
    icon: 'nvivo-analysis-icon',
    linux_alternative: 'NVivo via Wine / Taguette / RQDA',
    popularity: 40,
    homepage: 'https://www.qsrinternational.com/nvivo-qualitative-data-analysis-software/home',
    alternative_to: ''
  },
  {
    id: 'altium-designer-layout',
    name: 'Altium Designer',
    category: 'Engineering',
    description: 'Unified electronic design environment for schematic capture and PCB layout.',
    icon: 'altium-designer-layout-icon',
    linux_alternative: 'KiCad / LibrePCB',
    popularity: 45,
    homepage: 'https://www.altium.com/altium-designer',
    alternative_to: ''
  },
  {
    id: 'mastercam-cnc-mill',
    name: 'Mastercam',
    category: 'Engineering',
    description: 'Computer-aided design and manufacturing (CAD/CAM) software for CNC machine programming.',
    icon: 'mastercam-cnc-mill-icon',
    linux_alternative: 'FreeCAD (Path Workbench) / LinuxCNC',
    popularity: 45,
    homepage: 'https://www.mastercam.com/',
    alternative_to: ''
  },
  {
    id: 'ansys-simulation-suite',
    name: 'Ansys',
    category: 'Engineering',
    description: 'Engineering simulation software suite for structural, fluid, and electromagnetic analysis.',
    icon: 'ansys-simulation-suite-icon',
    linux_alternative: 'Ansys for Linux (Native version) / OpenFOAM / Elmer',
    popularity: 45,
    homepage: 'https://www.ansys.com/',
    alternative_to: ''
  },

  // Game launchers and developer tools
  {
    id: 'gog-galaxy-client',
    name: 'GOG Galaxy',
    category: 'Games',
    description: 'Games client that connects multiple libraries into one master library.',
    icon: 'gog-galaxy-client-icon',
    linux_alternative: 'Heroic Games Launcher / Lutris / GOG Galaxy via Wine',
    popularity: 45,
    homepage: 'https://www.gog.com/galaxy',
    alternative_to: ''
  },
  {
    id: 'ea-app-launcher',
    name: 'EA App',
    category: 'Games',
    description: 'Electronic Arts PC gaming platform client.',
    icon: 'ea-app-launcher-icon',
    linux_alternative: 'EA App via Wine/Proton / Lutris / Heroic Games Launcher',
    popularity: 45,
    homepage: 'https://www.ea.com/ea-app',
    alternative_to: ''
  },
  {
    id: 'ubisoft-connect-client',
    name: 'Ubisoft Connect',
    category: 'Games',
    description: 'Ubisoft games client and ecosystem interface.',
    icon: 'ubisoft-connect-client-icon',
    linux_alternative: 'Ubisoft Connect via Wine/Proton / Lutris',
    popularity: 45,
    homepage: 'https://ubisoftconnect.com/',
    alternative_to: ''
  },
  {
    id: 'bluestacks-android-emu',
    name: 'BlueStacks',
    category: 'Games',
    description: 'Top-performing Android gaming emulator for PC and Mac.',
    icon: 'bluestacks-android-emu-icon',
    linux_alternative: 'Waydroid / Genymotion',
    popularity: 45,
    homepage: 'https://www.bluestacks.com/',
    alternative_to: ''
  },
  {
    id: 'scootersoftware-beyondcompare-tool',
    name: 'Beyond Compare',
    category: 'Utilities',
    description: 'Directory and file comparison utility for code management.',
    icon: 'scootersoftware-beyondcompare-tool-icon',
    linux_alternative: 'Native Linux Version (official Linux build) / Meld / KDiff3',
    popularity: 45,
    homepage: 'https://www.scootersoftware.com/',
    alternative_to: ''
  },
  {
    id: 'winmerge-differencing',
    name: 'WinMerge',
    category: 'Utilities',
    description: 'Open-source differencing and merging tool for Windows files and folders.',
    icon: 'winmerge-differencing-icon',
    linux_alternative: 'Meld / KDiff3 / Beyond Compare',
    popularity: 45,
    homepage: 'https://winmerge.org/',
    alternative_to: ''
  },
  {
    id: 'sqlite-studio-manager',
    name: 'SQLiteStudio',
    category: 'Development',
    description: 'Free open-source SQLite database manager.',
    icon: 'sqlite-studio-manager-icon',
    linux_alternative: 'Native Linux Version / DB Browser for SQLite',
    popularity: 40,
    homepage: 'https://sqlitestudio.pl/',
    alternative_to: ''
  },
  {
    id: 'beekeeper-studio-sql',
    name: 'Beekeeper Studio',
    category: 'Development',
    description: 'Modern and easy-to-use SQL client and database manager.',
    icon: 'beekeeper-studio-sql-icon',
    linux_alternative: 'Native Linux Version|flathub:io.beekeeperstudio.BeekeeperStudio / DBeaver',
    popularity: 45,
    homepage: 'https://www.beekeeperstudio.io/',
    alternative_to: ''
  },
  {
    id: 'dbeaver-universal-db',
    name: 'DBeaver Community Edition',
    category: 'Development',
    description: 'Free multi-platform database tool for developers, SQL programmers, and DBAs.',
    icon: 'dbeaver-universal-db-icon',
    linux_alternative: 'Native Linux Version|flathub:io.dbeaver.DBeaverCommunity',
    popularity: 45,
    homepage: 'https://dbeaver.io/',
    alternative_to: ''
  },
  {
    id: 'xampp-web-server',
    name: 'XAMPP',
    category: 'Development',
    description: 'Easy-to-install Apache distribution containing MariaDB, PHP, and Perl.',
    icon: 'xampp-web-server-icon',
    linux_alternative: 'Native Linux Version / Local LAMP Stack / Docker',
    popularity: 45,
    homepage: 'https://www.apachefriends.org/',
    alternative_to: ''
  },
  {
    id: 'redisinsight-redis-gui',
    name: 'RedisInsight',
    category: 'Development',
    description: 'GUI database interface for visualizing and optimizing Redis data.',
    icon: 'redisinsight-redis-gui-icon',
    linux_alternative: 'Native Linux Version (AppImage) / RESP.app',
    popularity: 40,
    homepage: 'https://redis.com/redis-enterprise/redisinsight/',
    alternative_to: ''
  },
  {
    id: 'aomei-backupper-clone',
    name: 'AOMEI Backupper',
    category: 'Utilities',
    description: 'Windows backup, sync, and disk cloning utility.',
    icon: 'aomei-backupper-clone-icon',
    linux_alternative: 'Rescuezilla / Timeshift / BorgBackup',
    popularity: 40,
    homepage: 'https://www.ubackup.com/',
    alternative_to: ''
  },

  // Additional Candidates to satisfy at least 100 limit
  {
    id: 'navicat-mysql',
    name: 'Navicat for MySQL',
    category: 'Development',
    description: 'Single-connection database client for MySQL administration.',
    icon: 'navicat-mysql-icon',
    linux_alternative: 'DBeaver / Beekeeper Studio / Navicat (Linux version)',
    popularity: 40,
    homepage: 'https://www.navicat.com/products/navicat-for-mysql',
    alternative_to: ''
  },
  {
    id: 'navicat-postgresql',
    name: 'Navicat for PostgreSQL',
    category: 'Development',
    description: 'Single-connection database client for PostgreSQL administration.',
    icon: 'navicat-postgresql-icon',
    linux_alternative: 'DBeaver / pgAdmin / Navicat (Linux version)',
    popularity: 40,
    homepage: 'https://www.navicat.com/products/navicat-for-postgresql',
    alternative_to: ''
  },
  {
    id: 'navicat-sqlite',
    name: 'Navicat for SQLite',
    category: 'Development',
    description: 'Single-connection database client for SQLite administration.',
    icon: 'navicat-sqlite-icon',
    linux_alternative: 'DB Browser for SQLite / DBeaver / Navicat (Linux version)',
    popularity: 40,
    homepage: 'https://www.navicat.com/products/navicat-for-sqlite',
    alternative_to: ''
  },
  {
    id: 'openboard-edu',
    name: 'OpenBoard',
    category: 'Office',
    description: 'Open-source interactive whiteboard application for schools and universities.',
    icon: 'openboard-edu-icon',
    linux_alternative: 'Native Linux Version|flathub:ch.openboard.OpenBoard',
    popularity: 40,
    homepage: 'https://openboard.ch/',
    alternative_to: ''
  },
  {
    id: 'open-sankore-edu',
    name: 'Open-Sankore',
    category: 'Office',
    description: 'Legacy multiplatform interactive whiteboard software.',
    icon: 'open-sankore-edu-icon',
    linux_alternative: 'OpenBoard',
    popularity: 30,
    homepage: 'http://open-sankore.org/',
    alternative_to: ''
  },
  {
    id: 'meshcentral-router',
    name: 'MeshCentral Router',
    category: 'Utilities',
    description: 'Remote management tool that helps redirect TCP ports to remote machines.',
    icon: 'meshcentral-router-icon',
    linux_alternative: 'MeshCentral Router via Web / Remmina',
    popularity: 35,
    homepage: 'https://www.meshcommander.com/meshcentral2',
    alternative_to: ''
  },
  {
    id: 'microdicom-viewer',
    name: 'MicroDicom DICOM Viewer',
    category: 'Utilities',
    description: 'Free DICOM viewer for Windows to open and analyze medical images.',
    icon: 'microdicom-viewer-icon',
    linux_alternative: 'Weasis (Native Linux Version) / Orthanc / Aeskulap',
    popularity: 35,
    homepage: 'https://www.microdicom.com/',
    alternative_to: ''
  },
  {
    id: 'weasis-dicom-viewer',
    name: 'Weasis DICOM Viewer',
    category: 'Utilities',
    description: 'Free, multiplatform DICOM viewer for hospitals, clinicians, and researchers.',
    icon: 'weasis-dicom-viewer-icon',
    linux_alternative: 'Native Linux Version / Orthanc',
    popularity: 40,
    homepage: 'https://weasis.org/',
    alternative_to: ''
  },
  {
    id: 'orthanc-server',
    name: 'Orthanc',
    category: 'Utilities',
    description: 'Lightweight, RESTful DICOM server for healthcare and medical research.',
    icon: 'orthanc-server-icon',
    linux_alternative: 'Native Linux Version (Orthanc has native Debian/Ubuntu packages)',
    popularity: 40,
    homepage: 'https://www.orthanc-server.com/',
    alternative_to: ''
  },
  {
    id: 'k-lite-codec-pack',
    name: 'K-Lite Codec Pack',
    category: 'Audio',
    description: 'Collection of DirectShow filters, VFW/ACM codecs, and tools for playing audio/video files.',
    icon: 'k-lite-codec-pack-icon',
    linux_alternative: 'Not needed on Linux (VLC and MPV come with all codecs built-in automatically)',
    popularity: 45,
    homepage: 'https://codecguide.com/',
    alternative_to: ''
  },
  {
    id: 'combined-community-codec',
    name: 'Combined Community Codec Pack',
    category: 'Audio',
    description: 'Codec pack designed for playing anime fansubs.',
    icon: 'combined-community-codec-icon',
    linux_alternative: 'MPV / VLC Media Player',
    popularity: 35,
    homepage: 'http://www.cccp-project.net/',
    alternative_to: ''
  },
  {
    id: 'makemkv-ripper',
    name: 'MakeMKV',
    category: 'Utilities',
    description: 'One-click solution to convert DVD/Blu-ray discs into free and patents-unencumbered MKV files.',
    icon: 'makemkv-ripper-icon',
    linux_alternative: 'Native Linux Version (MakeMKV official Linux forum package) / HandBrake',
    popularity: 45,
    homepage: 'https://www.makemkv.com/',
    alternative_to: ''
  },
  {
    id: 'dvdfab-ripper',
    name: 'DVDFab',
    category: 'Utilities',
    description: 'Shareware DVD/Blu-ray ripping, copying, and converting software.',
    icon: 'dvdfab-ripper-icon',
    linux_alternative: 'HandBrake / MakeMKV',
    popularity: 40,
    homepage: 'https://www.dvdfab.cn/',
    alternative_to: ''
  },
  {
    id: 'anydvd-hd-ripper',
    name: 'AnyDVD HD',
    category: 'Utilities',
    description: 'Windows-based driver that decrypts DVD and Blu-ray media automatically in the background.',
    icon: 'anydvd-hd-ripper-icon',
    linux_alternative: 'MakeMKV / libdvdcss',
    popularity: 40,
    homepage: 'https://www.redfox.bz/anydvdhd.html',
    alternative_to: ''
  },
  {
    id: 'solvespace-cad',
    name: 'SolveSpace',
    category: 'Engineering',
    description: 'Parametric 3D CAD program with constraint solver.',
    icon: 'solvespace-cad-icon',
    linux_alternative: 'Native Linux Version|flathub:com.solvespace.SolveSpace / FreeCAD',
    popularity: 40,
    homepage: 'https://solvespace.com/',
    alternative_to: ''
  },
  {
    id: 'openscad-cad',
    name: 'OpenSCAD',
    category: 'Engineering',
    description: 'Software for creating solid 3D CAD objects using a descriptive language.',
    icon: 'openscad-cad-icon',
    linux_alternative: 'Native Linux Version|flathub:org.openscad.OpenSCAD',
    popularity: 45,
    homepage: 'https://openscad.org/',
    alternative_to: ''
  },
  {
    id: 'blockscad-edu',
    name: 'BlocksCAD',
    category: 'Engineering',
    description: 'Visual block-based CAD program designed for STEM education.',
    icon: 'blockscad-edu-icon',
    linux_alternative: 'BlocksCAD Web App / OpenSCAD',
    popularity: 35,
    homepage: 'https://www.blockscad3d.com/',
    alternative_to: ''
  },
  {
    id: 'librecad-2d',
    name: 'LibreCAD',
    category: 'Engineering',
    description: 'Open-source 2D CAD application for drafting and designing.',
    icon: 'librecad-2d-icon',
    linux_alternative: 'Native Linux Version|flathub:org.librecad.librecad',
    popularity: 40,
    homepage: 'https://librecad.org/',
    alternative_to: ''
  },
  {
    id: 'qcad-2d',
    name: 'QCAD',
    category: 'Engineering',
    description: 'Open-source 2D computer-aided drafting application.',
    icon: 'qcad-2d-icon',
    linux_alternative: 'Native Linux Version|flathub:org.qcad.qcad',
    popularity: 40,
    homepage: 'https://qcad.org/',
    alternative_to: ''
  },
  {
    id: 'librepcb-design',
    name: 'LibrePCB',
    category: 'Engineering',
    description: 'Free open-source electronic design automation software to develop printed circuit boards.',
    icon: 'librepcb-design-icon',
    linux_alternative: 'Native Linux Version|flathub:org.librepcb.LibrePCB',
    popularity: 40,
    homepage: 'https://librepcb.org/',
    alternative_to: ''
  },
  {
    id: 'geda-pcb-design',
    name: 'gEDA',
    category: 'Engineering',
    description: 'Complete suite of free software electronic design automation tools.',
    icon: 'geda-pcb-design-icon',
    linux_alternative: 'Native Linux Version / KiCad',
    popularity: 35,
    homepage: 'http://www.geda-project.org/',
    alternative_to: ''
  },
  // Windows Integrated
  {
    id: 'windows-file-explorer',
    name: 'Windows File Explorer',
    category: 'Windows Integrated',
    description: 'The default file manager and desktop environment shell on Windows.',
    icon: 'windows-file-explorer-icon',
    linux_alternative: 'Native Linux Version (Dolphin / Nautilus / Nemo)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-registry-editor',
    name: 'Registry Editor',
    category: 'Windows Integrated',
    description: 'Built-in database editor for Windows configuration settings and registry keys.',
    icon: 'windows-registry-editor-icon',
    linux_alternative: 'Not applicable (Linux uses config files in /etc and ~/.config, or dconf-editor)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-command-prompt',
    name: 'Command Prompt',
    category: 'Windows Integrated',
    description: 'The default command-line interpreter for Windows operating systems.',
    icon: 'windows-command-prompt-icon',
    linux_alternative: 'Native Linux Version (Bash / Zsh / GNOME Terminal)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-device-manager',
    name: 'Device Manager',
    category: 'Windows Integrated',
    description: 'Control Panel applet allowing users to view and control the hardware attached to the computer.',
    icon: 'windows-device-manager-icon',
    linux_alternative: 'Native Linux Version (Hardinfo / CPU-X / lshw)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-disk-management',
    name: 'Disk Management',
    category: 'Windows Integrated',
    description: 'System utility for managing hard disks, partitions, volumes, and drives.',
    icon: 'windows-disk-management-icon',
    linux_alternative: 'Native Linux Version (GParted / GNOME Disks)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-event-viewer',
    name: 'Event Viewer',
    category: 'Windows Integrated',
    description: 'Administrative tool displaying detailed information about system, security, and application logs.',
    icon: 'windows-event-viewer-icon',
    linux_alternative: 'Native Linux Version (GNOME Logs / journalctl)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-services-manager',
    name: 'Services Manager',
    category: 'Windows Integrated',
    description: 'Administrative utility to start, stop, and configure Windows background services.',
    icon: 'windows-services-manager-icon',
    linux_alternative: 'Native Linux Version (systemctl / Systemd Genies)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-system-configuration',
    name: 'System Configuration',
    category: 'Windows Integrated',
    description: 'Troubleshooting utility to configure startup applications, boot parameters, and system services.',
    icon: 'windows-system-configuration-icon',
    linux_alternative: 'Native Linux Version (Stacer / systemctl / GNOME Session Properties)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-remote-desktop-connection',
    name: 'Remote Desktop Connection',
    category: 'Windows Integrated',
    description: 'Microsoft Terminal Services Client to connect and control remote Windows machines.',
    icon: 'windows-remote-desktop-connection-icon',
    linux_alternative: 'Native Linux Version (Remmina / Vinagre)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-media-player-classic',
    name: 'Windows Media Player',
    category: 'Windows Integrated',
    description: 'Classic media player for playing audio, video, and viewing images.',
    icon: 'windows-media-player-classic-icon',
    linux_alternative: 'Native Linux Version (VLC / MPV / Celluloid)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-sandbox-isolation',
    name: 'Windows Sandbox',
    category: 'Windows Integrated',
    description: 'Isolated desktop environment for running untrusted applications securely.',
    icon: 'windows-sandbox-isolation-icon',
    linux_alternative: 'Native Linux Version (GNOME Boxes / Distrobox / Firejail)',
    popularity: 40,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-sticky-notes',
    name: 'Sticky Notes',
    category: 'Windows Integrated',
    description: 'Simple desktop post-it note utility.',
    icon: 'windows-sticky-notes-icon',
    linux_alternative: 'Native Linux Version (Xpad / KNotes / Sticky Notes Applet)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'microsoft-to-do-app',
    name: 'Microsoft To Do',
    category: 'Windows Integrated',
    description: 'Cloud-based task management application integrated into Windows 10/11.',
    icon: 'microsoft-to-do-app-icon',
    linux_alternative: 'Native Linux Version|flathub:com.todoist.Todoist / Planner',
    popularity: 45,
    homepage: 'https://to-do.office.com/',
    alternative_to: ''
  },
  {
    id: 'windows-quick-assist',
    name: 'Quick Assist',
    category: 'Windows Integrated',
    description: 'Built-in Windows application to view or control a remote computer for troubleshooting.',
    icon: 'windows-quick-assist-icon',
    linux_alternative: 'RustDesk / AnyDesk / TeamViewer',
    popularity: 40,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-defender-security',
    name: 'Windows Defender',
    category: 'Windows Integrated',
    description: 'Built-in anti-malware component of Microsoft Windows.',
    icon: 'windows-defender-security-icon',
    linux_alternative: 'Not needed on Linux (Standard Linux security permissions / ClamAV / UFW)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-system-information-tool',
    name: 'System Information',
    category: 'Windows Integrated',
    description: 'Built-in tool that shows detailed hardware, system components, and software environment configuration.',
    icon: 'windows-system-information-tool-icon',
    linux_alternative: 'Native Linux Version (lshw / Hardinfo / CPU-X)',
    popularity: 40,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },

  // Social
  {
    id: 'facebook-messenger-desktop',
    name: 'Facebook Messenger',
    category: 'Social',
    description: 'Official desktop client for Facebook Messenger messaging platform.',
    icon: 'facebook-messenger-desktop-icon',
    linux_alternative: 'Messenger Web version / Caprine|flathub:com.sindresorhus.Caprine',
    popularity: 50,
    homepage: 'https://www.messenger.com/',
    alternative_to: ''
  },
  {
    id: 'wechat-desktop-client',
    name: 'WeChat',
    category: 'Social',
    description: 'Desktop client for WeChat, the popular Chinese instant messaging, social media, and mobile payment app.',
    icon: 'wechat-desktop-client-icon',
    linux_alternative: 'WeChat Web / WeChat via Wine / Electronic WeChat',
    popularity: 50,
    homepage: 'https://www.wechat.com/',
    alternative_to: ''
  },
  {
    id: 'line-messenger-desktop',
    name: 'LINE Messenger',
    category: 'Social',
    description: 'Desktop client for LINE, a freeware app for instant communications on smartphones, tablet computers, and PCs.',
    icon: 'line-messenger-desktop-icon',
    linux_alternative: 'LINE Web Extension / LINE via Wine / Telegram',
    popularity: 50,
    homepage: 'https://line.me/',
    alternative_to: ''
  },
  {
    id: 'kakaotalk-desktop-client',
    name: 'KakaoTalk',
    category: 'Social',
    description: 'Desktop client for the widely used South Korean mobile messaging application.',
    icon: 'kakaotalk-desktop-client-icon',
    linux_alternative: 'KakaoTalk via Wine / Telegram / Signal',
    popularity: 45,
    homepage: 'https://www.kakaocorp.com/service/KakaoTalk',
    alternative_to: ''
  },
  {
    id: 'pidgin-im-client',
    name: 'Pidgin',
    category: 'Social',
    description: 'Universal chat client that lets you log in to accounts on multiple chat networks simultaneously.',
    icon: 'pidgin-im-client-icon',
    linux_alternative: 'Native Linux Version (Pidgin is native to Linux)',
    popularity: 40,
    homepage: 'https://pidgin.im/',
    alternative_to: ''
  },
  {
    id: 'mattermost-desktop-app',
    name: 'Mattermost',
    category: 'Social',
    description: 'Open-source self-hosted online chat service for enterprise collaboration.',
    icon: 'mattermost-desktop-app-icon',
    linux_alternative: 'Native Linux Version|flathub:com.mattermost.Desktop',
    popularity: 45,
    homepage: 'https://mattermost.com/',
    alternative_to: ''
  },
  {
    id: 'rocketchat-desktop-app',
    name: 'Rocket.Chat',
    category: 'Social',
    description: 'Open-source team communication and collaboration platform.',
    icon: 'rocketchat-desktop-app-icon',
    linux_alternative: 'Native Linux Version|flathub:chat.rocket.RocketChat',
    popularity: 45,
    homepage: 'https://rocket.chat/',
    alternative_to: ''
  },
  {
    id: 'zulip-desktop-app',
    name: 'Zulip',
    category: 'Social',
    description: 'Thread-based team chat application that combines real-time chat with email-like threading.',
    icon: 'zulip-desktop-app-icon',
    linux_alternative: 'Native Linux Version|flathub:org.zulip.Zulip',
    popularity: 40,
    homepage: 'https://zulip.com/',
    alternative_to: ''
  },
  {
    id: 'qtox-client',
    name: 'qTox',
    category: 'Social',
    description: 'Powerful Tox chat client that is encrypted and serverless.',
    icon: 'qtox-client-icon',
    linux_alternative: 'Native Linux Version|flathub:io.github.qtox.qTox',
    popularity: 40,
    homepage: 'https://tox.chat/',
    alternative_to: ''
  },
  {
    id: 'vrchat-client-app',
    name: 'VRChat',
    category: 'Social',
    description: 'Social virtual reality platform for interacting with 3D avatars and user-created worlds.',
    icon: 'vrchat-client-app-icon',
    linux_alternative: 'VRChat via Steam Play Proton',
    popularity: 45,
    homepage: 'https://hello.vrchat.com/',
    alternative_to: ''
  },
  {
    id: 'second-life-viewer-app',
    name: 'Second Life Viewer',
    category: 'Social',
    description: 'Official client viewer for the Second Life online virtual world.',
    icon: 'second-life-viewer-app-icon',
    linux_alternative: 'Native Linux Version (Firestorm Viewer / Alchemy Viewer)',
    popularity: 40,
    homepage: 'https://secondlife.com/',
    alternative_to: ''
  },
  {
    id: 'keybase-client-app',
    name: 'Keybase',
    category: 'Social',
    description: 'Keybase is a secure messaging and file-sharing app built on public-key cryptography.',
    icon: 'keybase-client-app-icon',
    linux_alternative: 'Native Linux Version (Keybase official Linux client)',
    popularity: 45,
    homepage: 'https://keybase.io/',
    alternative_to: ''
  },
  {
    id: 'windows-camera',
    name: 'Windows Camera',
    category: 'Windows Integrated',
    description: 'Built-in webcam and camera application for capturing photos and videos.',
    icon: 'windows-camera-icon',
    linux_alternative: 'Native Linux Version (Cheese / Kamoso / OBS Studio)',
    popularity: 45,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'microsoft-photos',
    name: 'Microsoft Photos',
    category: 'Windows Integrated',
    description: 'The default image viewer, organizer, and editor built into Windows.',
    icon: 'microsoft-photos-icon',
    linux_alternative: 'Native Linux Version (Loupe / Eye of GNOME / Gwenview)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'windows-media-player-modern',
    name: 'Windows Media Player (Modern)',
    category: 'Windows Integrated',
    description: 'The default media player for playing audio and video on Windows 11.',
    icon: 'windows-media-player-modern-icon',
    linux_alternative: 'Native Linux Version (VLC / MPV / Celluloid / Haruna)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/windows',
    alternative_to: ''
  },
  {
    id: 'microsoft-outlook',
    name: 'Microsoft Outlook',
    category: 'Windows Integrated',
    description: 'Official email client, calendar, and task manager integrated into Windows.',
    icon: 'microsoft-outlook-icon',
    linux_alternative: 'Native Linux Version (Thunderbird / Evolution / Geary)',
    popularity: 50,
    homepage: 'https://outlook.live.com/',
    alternative_to: ''
  },
  {
    id: 'microsoft-store',
    name: 'Microsoft Store',
    category: 'Windows Integrated',
    description: 'Official digital distribution platform for Windows applications and content.',
    icon: 'microsoft-store-icon',
    linux_alternative: 'Native Linux Version (GNOME Software / Discover / Flathub)',
    popularity: 50,
    homepage: 'https://www.microsoft.com/store',
    alternative_to: ''
  }
];

const existing = db.prepare('SELECT id, name FROM apps').all();
const existingIds = new Set(existing.map(row => row.id.toLowerCase()));
const existingNames = new Set(existing.map(row => row.name.toLowerCase()));

const filteredApps = newApps.filter(app => {
  return !existingIds.has(app.id.toLowerCase()) && !existingNames.has(app.name.toLowerCase());
});

// Sort filteredApps to prioritize 'Windows Integrated' and 'Social' categories
filteredApps.sort((a, b) => {
  const categories = ['Windows Integrated', 'Social'];
  const aIdx = categories.indexOf(a.category);
  const bIdx = categories.indexOf(b.category);
  if (aIdx !== -1 && bIdx === -1) return -1;
  if (aIdx === -1 && bIdx !== -1) return 1;
  if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
  return 0;
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
