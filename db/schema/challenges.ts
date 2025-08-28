import { sql } from 'drizzle-orm';
import { boolean, integer, pgPolicy, pgTable, text } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';
import { lessons } from './courses';
import { challengesEnum } from './enums';

export const challenges = pgTable(
  'challenges',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    lessonId: integer('lesson_id')
      .references(() => lessons.id, { onDelete: 'cascade' })
      .notNull(),
    type: challengesEnum('type').notNull(),
    question: text('question').notNull(),
    order: integer('order').notNull(),
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

export const challengeOptions = pgTable(
  'challenge_options',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
    challengeId: integer('challenge_id')
      .references(() => challenges.id, { onDelete: 'cascade' })
      .notNull(),
    text: text('text').notNull(),
    correct: boolean('correct').notNull(),
    imageSrc: text('image_src'),
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

export type SelectChallengeOptions = typeof challengeOptions.$inferSelect;
export type SelectChallenges = typeof challenges.$inferSelect;
