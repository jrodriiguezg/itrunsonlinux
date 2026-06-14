import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const apps = sqliteTable('apps', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  icon: text('icon'),
  linuxAlternative: text('linux_alternative'),
  popularity: integer('popularity').default(0),
  homepage: text('homepage'),
});

export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(),
  appId: text('app_id').notNull().references(() => apps.id),
  githubUser: text('github_user'),
  rating: text('rating').notNull(),
  runner: text('runner').notNull(),
  details: text('details').notNull(),
  date: text('date').notNull(),
});
