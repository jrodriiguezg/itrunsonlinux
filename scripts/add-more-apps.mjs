import fs from 'fs';

const newApps = `
('calcprogram-openrgb', 'OpenRGB', 'Open source RGB lighting control that doesn''t depend on manufacturer software.', 'Utilities', 'calcprogram-openrgb-icon', 'OpenRGB', 100, 'https://openrgb.org/'),
('libratbag-piper', 'Piper', 'GTK application to configure gaming mice.', 'Utilities', 'libratbag-piper-icon', 'Piper', 80, 'https://github.com/libratbag/piper'),
('corectrl-corectrl', 'CoreCtrl', 'A Free and Open Source GNU/Linux application that allows you to control with ease your computer hardware using application profiles.', 'Utilities', 'corectrl-corectrl-icon', 'CoreCtrl', 80, 'https://gitlab.com/corectrl/corectrl'),
('blackmagic-davinciresolve', 'DaVinci Resolve', 'Professional video editing, color correction, visual effects and audio post-production.', 'Design', 'blackmagic-davinciresolve-icon', 'DaVinci Resolve', 100, 'https://www.blackmagicdesign.com/products/davinciresolve'),
('natron-natron', 'Natron', 'Open Source Compositing Software For VFX and Motion Graphics.', 'Design', 'natron-natron-icon', 'Natron', 70, 'https://natrongithub.github.io/'),
('freecad-freecad', 'FreeCAD', 'Your own 3D parametric modeler.', 'Engineering', 'freecad-freecad-icon', 'FreeCAD', 90, 'https://www.freecadweb.org/'),
('librecad-librecad', 'LibreCAD', 'Open Source 2D CAD.', 'Engineering', 'librecad-librecad-icon', 'LibreCAD', 80, 'https://librecad.org/'),
('figma-figma', 'Figma', 'The collaborative interface design tool.', 'Design', 'figma-figma-icon', 'Figma-Linux', 100, 'https://www.figma.com/'),
('docker-docker', 'Docker Desktop', 'Collaborative and secure application development platform.', 'Development', 'docker-docker-icon', 'Docker', 100, 'https://www.docker.com/'),
('podman-podman', 'Podman', 'A tool for managing OCI containers and pods.', 'Development', 'podman-podman-icon', 'Podman', 90, 'https://podman.io/'),
('oracle-virtualbox', 'VirtualBox', 'Powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use.', 'Development', 'oracle-virtualbox-icon', 'VirtualBox', 100, 'https://www.virtualbox.org/'),
('quickemu-quickemu', 'Quickemu', 'Quickly create and run optimised Windows, macOS and Linux desktop virtual machines.', 'Development', 'quickemu-quickemu-icon', 'Quickemu', 80, 'https://github.com/quickemu-project/quickemu'),
('postman-postman', 'Postman', 'An API platform for building and using APIs.', 'Development', 'postman-postman-icon', 'Postman', 100, 'https://www.postman.com/'),
('kong-insomnia', 'Insomnia', 'The open source API client.', 'Development', 'kong-insomnia-icon', 'Insomnia', 90, 'https://insomnia.rest/'),
('nvidia-geforcenow', 'GeForce NOW', 'NVIDIA''s cloud gaming service.', 'Games', 'nvidia-geforcenow-icon', 'GeForce NOW (Web)', 100, 'https://www.nvidia.com/en-us/geforce-now/'),
('microsoft-xboxcloud', 'Xbox Cloud Gaming', 'Play high-quality console games on the devices you already have.', 'Games', 'microsoft-xboxcloud-icon', 'Xbox Cloud Gaming (Web)', 100, 'https://www.xbox.com/en-US/play');
`;

const newReports = `
('r-openrgb', 'calcprogram-openrgb', 'Native', 'Native', 'Works flawlessly natively to replace vendor-specific RGB tools like iCUE or Razer Synapse.', '2026-06-14'),
('r-piper', 'libratbag-piper', 'Native', 'Native', 'Native GUI to configure DPI and macros for many gaming mice on Linux.', '2026-06-14'),
('r-corectrl', 'corectrl-corectrl', 'Native', 'Native', 'Must-have tool for AMD GPU users on Linux to undervolt and adjust fan curves.', '2026-06-14'),
('r-davinci', 'blackmagic-davinciresolve', 'Native', 'Native', 'DaVinci Resolve has an official native Linux version used by Hollywood studios. (Requires proprietary GPU drivers).', '2026-06-14'),
('r-natron', 'natron-natron', 'Native', 'Native', 'Native Linux alternative to Adobe After Effects.', '2026-06-14'),
('r-freecad', 'freecad-freecad', 'Native', 'Native', 'Excellent native alternative for AutoCAD and SolidWorks users.', '2026-06-14'),
('r-librecad', 'librecad-librecad', 'Native', 'Native', 'Native open-source alternative to 2D CAD programs.', '2026-06-14'),
('r-figma', 'figma-figma', 'Native', 'Web/PWA', 'As a web-first application, Figma runs perfectly in Linux browsers. There is also an unofficial Figma-Linux electron app.', '2026-06-14'),
('r-docker', 'docker-docker', 'Native', 'Native', 'Docker is native to Linux and runs significantly faster than on Windows or macOS.', '2026-06-14'),
('r-podman', 'podman-podman', 'Native', 'Native', 'Podman runs natively on Linux, often used as a daemonless alternative to Docker.', '2026-06-14'),
('r-virtualbox', 'oracle-virtualbox', 'Native', 'Native', 'Official native package exists. Many users also recommend QEMU/KVM with virt-manager.', '2026-06-14'),
('r-quickemu', 'quickemu-quickemu', 'Native', 'Native', 'Native tool that makes creating VMs on Linux incredibly easy via QEMU.', '2026-06-14'),
('r-postman', 'postman-postman', 'Native', 'Native', 'Postman provides official Linux builds.', '2026-06-14'),
('r-insomnia', 'kong-insomnia', 'Native', 'Native', 'Native Linux support available for this API client.', '2026-06-14'),
('r-geforcenow', 'nvidia-geforcenow', 'Native', 'Web/PWA', 'Runs natively and flawlessly via Chromium-based browsers on Linux.', '2026-06-14'),
('r-xboxcloud', 'microsoft-xboxcloud', 'Native', 'Web/PWA', 'Microsoft officially supports playing Xbox Cloud Gaming via Edge or Chrome on Linux.', '2026-06-14');
`;

function appendToSeed(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes("('brave-brave', 'Brave', 'The new Brave browser blocks ads and trackers that slow you down and invade your privacy.', 'Utilities', 'brave-brave-icon', 'Brave', 100, 'https://brave.com/');")) {
        content = content.replace(
            "('brave-brave', 'Brave', 'The new Brave browser blocks ads and trackers that slow you down and invade your privacy.', 'Utilities', 'brave-brave-icon', 'Brave', 100, 'https://brave.com/');",
            "('brave-brave', 'Brave', 'The new Brave browser blocks ads and trackers that slow you down and invade your privacy.', 'Utilities', 'brave-brave-icon', 'Brave', 100, 'https://brave.com/'),\n" + newApps.replace(/;\s*$/, '').trim() + ";"
        );
    }
    
    if (content.includes("('brave-brave', 'Brave', 'The new Brave browser blocks ads and trackers that slow you down and invade your privacy.', 'Utilities', 'brave-brave-icon', 'Brave');")) {
        let simpleApps = newApps.split('\\n').map(line => {
            if(!line.trim()) return line;
            return line.replace(/, \\d+, 'https:[^']+'/, '');
        }).join('\\n');
        
        content = content.replace(
            "('brave-brave', 'Brave', 'The new Brave browser blocks ads and trackers that slow you down and invade your privacy.', 'Utilities', 'brave-brave-icon', 'Brave');",
            "('brave-brave', 'Brave', 'The new Brave browser blocks ads and trackers that slow you down and invade your privacy.', 'Utilities', 'brave-brave-icon', 'Brave'),\n" + simpleApps.replace(/;\s*$/, '').trim() + ";"
        );
    }

    if (content.includes("('r-audacity', 'audacity-audacity', 'Native', 'Native', 'Audacity is a native cross-platform app that is well-supported on Linux.', '2026-06-14');")) {
        content = content.replace(
            "('r-audacity', 'audacity-audacity', 'Native', 'Native', 'Audacity is a native cross-platform app that is well-supported on Linux.', '2026-06-14');",
            "('r-audacity', 'audacity-audacity', 'Native', 'Native', 'Audacity is a native cross-platform app that is well-supported on Linux.', '2026-06-14'),\n" + newReports.replace(/;\s*$/, '').trim() + ";"
        );
    } else if (content.includes("('14', 'audacity-audacity', 'jrodriiguezg', 'Native', 'Native', 'Audacity is a native cross-platform app that is well-supported on Linux.', '2026-06-14');")) {
        let count = 15;
        let simpleReports = newReports.split('\\n').map(line => {
            if(!line.trim()) return line;
            return line.replace(/\\('r-[^']+'/, "('" + (count++) + "'").replace(/(', 'Native', 'Native',|', 'Native', 'Web\\/PWA',)/, ", 'jrodriiguezg'$1");
        }).join('\\n');
        
        content = content.replace(
            "('14', 'audacity-audacity', 'jrodriiguezg', 'Native', 'Native', 'Audacity is a native cross-platform app that is well-supported on Linux.', '2026-06-14');",
            "('14', 'audacity-audacity', 'jrodriiguezg', 'Native', 'Native', 'Audacity is a native cross-platform app that is well-supported on Linux.', '2026-06-14'),\n" + simpleReports.replace(/;\s*$/, '').trim() + ";"
        );
    }

    fs.writeFileSync(filePath, content);
    console.log("Updated " + filePath);
}

if (fs.existsSync('db/seed-500.sql')) appendToSeed('db/seed-500.sql');
if (fs.existsSync('db/seed.sql')) appendToSeed('db/seed.sql');
