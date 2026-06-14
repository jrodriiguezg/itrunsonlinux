import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  ...(process.env.DB_LOCAL_PATH ? { dbCredentials: { url: process.env.DB_LOCAL_PATH } } : {})
});
