import { relations, sql } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgPolicy, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole, authUsers } from 'drizzle-orm/supabase';
import { lessons } from './schema/courses';

export const challenges = pgTable(
  'challenges',
  {
    id: serial('id').primaryKey(),
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
  ]
);

export const challengeOptions = pgTable(
  'challenge_options',
  {
    id: serial('id').primaryKey(),
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
  ]
);

export type SelectChallengeOptions = typeof challengeOptions.$inferSelect;
export type SelectChallenges = typeof challenges.$inferSelect;
