export const prerender = false;

import { drizzle } from 'drizzle-orm/d1';
import { eq, sql } from 'drizzle-orm';
import * as schema from '../../db/schema';
import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { appId } = data;

    if (!appId || typeof appId !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid appId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = drizzle(env.DB, { schema });

    await db.update(schema.apps)
      .set({ popularity: sql`${schema.apps.popularity} + 1` })
      .where(eq(schema.apps.id, appId))
      .run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error upvoting:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
