export function isWebApp(app: { id: string; name: string; description: string; linuxAlternative?: string | null }) {
  const name = app.name.toLowerCase();
  const id = app.id.toLowerCase();
  const desc = app.description.toLowerCase();
  const alt = (app.linuxAlternative || '').toLowerCase();
  
  // Specific list of well-known webapps
  const webAppNames = [
    'figma', 'notion', 'canva', 'google docs', 'google sheets', 'google slides',
    'google drive', 'office 365', 'microsoft 365', 'trello', 'lucidchart',
    'miro', 'zoom', 'slack', 'discord', 'skype', 'spotify', 'evernote',
    'todoist', 'outlook online', 'onedrive', 'dropbox', 'postman'
  ];

  if (webAppNames.some(kw => name.includes(kw) || id.includes(kw))) {
    // Exclude browsers themselves
    if (name.includes('browser') || name.includes('chrome') || name.includes('firefox') || name.includes('edge')) {
      return false;
    }
    return true;
  }
  
  // Also check if description or alternative lists web versions
  if (desc.includes('web-based') || desc.includes('web application') || desc.includes('cloud-based') || desc.includes('saas') || desc.includes('web app')) {
    return true;
  }
  
  if (alt.includes('(web)') || alt.includes('web client') || alt.includes('web app') || alt.includes('web version') || alt.includes('online version')) {
    return true;
  }
  
  return false;
}
