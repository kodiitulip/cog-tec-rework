import { relations, sql } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgPolicy, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole, authUsers } from 'drizzle-orm/supabase';

export const courses = pgTable(
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

export const units = pgTable(
  'units',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    courseId: integer('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    order: integer('order').notNull(),
    imageSrc: text('image_src').notNull().default(''),
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

export const lessons = pgTable(
  'lessons',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    unitId: integer('unit_id')
      .references(() => units.id, { onDelete: 'cascade' })
      .notNull(),
    order: integer('order').notNull(),
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

export type SelectLessons = typeof lessons.$inferSelect;
export type SelectUnits = typeof units.$inferSelect;
export type SelectCourses = typeof courses.$inferSelect;
