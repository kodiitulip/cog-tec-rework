import { sql } from 'drizzle-orm';
import { pgPolicy, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const coursesTable = pgTable(
  'courses',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    imageSrc: text('image_src').notNull(),
  },
  () => [
    pgPolicy('Authenticated read access to courses', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);

export type SelectCourse = typeof coursesTable.$inferSelect;
