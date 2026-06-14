INSERT INTO apps (id, name, description, category, icon, linux_alternative) VALUES 
('adobe-photoshop', 'Adobe Photoshop 2024', 'The most popular image editing software in the world.', 'Design', 'photoshop-icon', 'GIMP / Krita'),
('microsoft-excel', 'Microsoft Excel', 'Powerful spreadsheet software by Microsoft Office.', 'Office', 'excel-icon', 'LibreOffice Calc'),
('autocad', 'AutoCAD 2024', 'Computer-aided design (CAD) software for architecture and engineering.', 'Engineering', 'autocad-icon', 'FreeCAD / BricsCAD'),
('fl-studio', 'FL Studio', 'Complete software music production environment (DAW).', 'Audio', 'flstudio-icon', 'LMMS / Bitwig Studio'),
('epic-games', 'Epic Games Launcher', 'Official storefront by Epic Games to install games and Unreal Engine.', 'Games', 'epic-icon', 'Heroic Games Launcher / Lutris');

INSERT INTO reports (id, app_id, github_user, rating, runner, details, date) VALUES 
('1', 'adobe-photoshop', 'jrodriiguezg', 'Silver', 'Bottles', 'Works using the Soda runner in Bottles. The installation fails on the first try, so you must use the offline installer. Decent performance.', '2026-06-14'),
('2', 'microsoft-excel', 'linuxgamer99', 'Bronze', 'Wine', 'Opens basic files, but advanced macros and plugins crash the application.', '2026-06-13'),
('3', 'autocad', 'architect-x', 'Garbage', 'CrossOver', 'Impossible to install. Fails at the licensing service and does not render the viewport canvas.', '2026-06-10'),
('4', 'fl-studio', 'producerdev', 'Platinum', 'Lutris', 'Using the latest Lutris-GE version. Audio works perfectly with Pipewire-ALSA. Loads all VSTs with no issues.', '2026-06-12'),
('5', 'epic-games', 'jrodriiguezg', 'Platinum', 'Lutris', 'Runs well using Lutris or Bottles. However, using the native Heroic Games Launcher is highly recommended as a superior alternative.', '2026-06-14');
