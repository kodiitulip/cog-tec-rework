import { sql } from 'drizzle-orm';
import { boolean, integer, pgPolicy, pgTable, text } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const courses = pgTable(
  'courses',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    title: text('title').notNull(),
    imageSrc: text('image_src').notNull(),
    hidden: boolean('hidden').notNull().default(false),
  },
  () => [
    pgPolicy('Authenticated read access to courses', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy('Admin delete access to courses', {
      for: 'delete',
      to: authenticatedRole,
      using: sql`authorize('COURSES.DELETE')`,
    }),
    pgPolicy('Admin insert access to courses', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`authorize('COURSES.INSERT')`,
    }),
    pgPolicy('Admin update access to courses', {
      for: 'update',
      to: authenticatedRole,
      using: sql`authorize('COURSES.INSERT')`,
    }),
  ]
);

export const units = pgTable(
  'units',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    courseId: integer('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    hidden: boolean().notNull().default(false),
    order: integer('order').notNull().default(0),
    imageSrc: text('image_src').notNull().default(''),
  },
  () => [
    pgPolicy('Authenticated read access to courses', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy('Admin delete access to courses', {
      for: 'delete',
      to: authenticatedRole,
      using: sql`authorize('COURSES.DELETE')`,
    }),
    pgPolicy('Admin insert access to courses', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`authorize('COURSES.INSERT')`,
    }),
    pgPolicy('Admin update access to courses', {
      for: 'update',
      to: authenticatedRole,
      using: sql`authorize('COURSES.INSERT')`,
    }),
  ]
);

export const lessons = pgTable(
  'lessons',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    title: text('title').notNull(),
    unitId: integer('unit_id')
      .references(() => units.id, { onDelete: 'cascade' })
      .notNull(),
    hidden: boolean('hidden').notNull().default(false),
    order: integer('order').notNull().default(0),
  },
  () => [
    pgPolicy('Authenticated read access to courses', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy('Admin delete access to courses', {
      for: 'delete',
      to: authenticatedRole,
      using: sql`authorize('COURSES.DELETE')`,
    }),
    pgPolicy('Admin insert access to courses', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`authorize('COURSES.INSERT')`,
    }),
    pgPolicy('Admin update access to courses', {
      for: 'update',
      to: authenticatedRole,
      using: sql`authorize('COURSES.INSERT')`,
    }),
  ]
);

export type SelectLessons = typeof lessons.$inferSelect;
export type SelectUnits = typeof units.$inferSelect;
export type SelectCourses = typeof courses.$inferSelect;
