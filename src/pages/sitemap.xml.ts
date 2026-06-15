import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const site = `${url.protocol}//${url.host}`;
  
  let apps = [];
  try {
    if (env && env.DB) {
      const db = drizzle(env.DB, { schema });
      apps = await db.select({ id: schema.apps.id }).from(schema.apps).all();
    }
  } catch (e) {
    console.error("Failed to query DB for sitemap", e);
  }

  const staticPages = [
    '',
    '/faq',
    '/tutorials'
  ];

  const currentDate = new Date().toISOString();

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${site}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
  ${apps.map(app => `
  <url>
    <loc>${site}/app/${app.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
</urlset>
  `.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
