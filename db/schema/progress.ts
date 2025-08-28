import { sql } from 'drizzle-orm';
import { boolean, integer, pgPolicy, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole, authUsers } from 'drizzle-orm/supabase';
import { courses, lessons } from '@/db/schema/courses';
import { challenges } from './challenges';

export const challengeProgress = pgTable(
  'challenge_progress',
  {
    id: serial('id').primaryKey(),
    userId: uuid('user_id')
      .references(() => authUsers.id, { onDelete: 'cascade' })
      .notNull(),
    challengeId: integer('challenge_id')
      .references(() => challenges.id, { onDelete: 'cascade' })
      .notNull(),
    completed: boolean('completed').notNull(),
  },
  () => [
    pgPolicy('Authenticated read access to courses', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql``,
    }),
  ]
);

export const userProgress = pgTable(
  'user_progress',
  {
    userId: uuid('user_id')
      .references(() => authUsers.id, { onDelete: 'cascade' })
      .primaryKey(),
    userName: text('user_name').notNull().default('User'),
    userImageSrc: text('user_image_src').notNull().default('/icon-512-maskable.png'),
    activeCourseId: integer('active_course_id').references(() => courses.id, { onDelete: 'cascade' }),
    activeLessonId: integer('active_lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
    hearts: integer('hearts').notNull().default(5),
    points: integer('points').notNull().default(0),
    rankHidden: boolean('rank_hidden').notNull().default(false),
  },
  () => [
    pgPolicy('Authenticated read access to userProgress', {
      as: 'permissive',
      for: 'select',
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);

export type SelectUserProgress = typeof userProgress.$inferSelect;
export type SelectChallengeProgress = typeof challengeProgress.$inferSelect;
