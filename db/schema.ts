import { relations, sql } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgPolicy, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { authenticatedRole } from 'drizzle-orm/supabase';

// courses table
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

export type SelectCourses = typeof courses.$inferSelect;

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

// units table
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

export type SelectUnits = typeof units.$inferSelect;

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

// lessons table
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

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

// challanges table
export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST']);

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

export type SelectChallenges = typeof challenges.$inferSelect;

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

// challangeOptions table
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

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}));

// challangeProgress table
export const challengeProgress = pgTable(
  'challenge_progress',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
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
      using: sql`true`,
    }),
  ]
);

export type SelectChallengeProgress = typeof challengeProgress.$inferSelect;

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}));

// userProgress table
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
    pgPolicy('Authenticated insert access to userProgress', {
      as: 'permissive',
      for: 'insert',
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy('Authenticated update access to userProgress', {
      as: 'permissive',
      for: 'update',
      to: authenticatedRole,
      using: sql`true`,
    }),
    pgPolicy('Authenticated delete access to userProgress', {
      as: 'permissive',
      for: 'delete',
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
