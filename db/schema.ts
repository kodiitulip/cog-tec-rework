import { relations, sql } from 'drizzle-orm';
import { integer, pgPolicy, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

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

export type SelectCourse = typeof courses.$inferSelect;

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const userProgress = pgTable(
  'user_progress',
  {
    userId: text('user_id').primaryKey(),
    userName: text('user_name').notNull().default('User'),
    userImageSrc: text('user_image_src').notNull().default('/kenney/shape-characters/PNG/Default/blue_body_circle.png'),
    activeCourseId: integer('acive_course_id').references(() => courses.id, { onDelete: 'cascade' }),
    hearts: integer('hearts').notNull().default(5),
    points: integer('points').notNull().default(0),
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

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));
