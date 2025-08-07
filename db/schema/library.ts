import { integer, pgPolicy, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { units } from './courses';
import { authenticatedRole } from 'drizzle-orm/supabase';
import { sql } from 'drizzle-orm';

export const library = pgTable(
  'library',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    unitId: integer('unit_id')
      .references(() => units.id, { onDelete: 'cascade' })
      .notNull(),
    markdown: text('markdown').notNull().default(''),
    order: integer('order').notNull().default(0),
  },
  () => [
    pgPolicy('Authenticaded read access', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql``,
    }),
    pgPolicy('Admin delete access to courses', {
      for: 'delete',
      to: authenticatedRole,
      using: sql`public.authorize('COURSES.DELETE')`,
    }),
    pgPolicy('Admin insert access to courses', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`public.authorize('COURSES.INSERT')`,
    }),
    pgPolicy('Admin update access to courses', {
      for: 'update',
      to: authenticatedRole,
      using: sql`public.authorize('COURSES.INSERT')`,
    }),
  ]
);

export type SelectLibrary = typeof library.$inferSelect;
