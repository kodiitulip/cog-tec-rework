import { relations, sql } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgPolicy, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';
import { authenticatedRole, authUsers } from 'drizzle-orm/supabase';
import { challengeProgress, userProgress, SelectChallengeProgress, SelectUserProgress } from './schema/progress';
import { challenges, challengeOptions, SelectChallenges, SelectChallengeOptions } from './schema/challenges';
import { courses, units, lessons, SelectCourses, SelectUnits, SelectLessons } from './schema/courses';
import { appRolesEnum, challengesEnum } from './schema/enums';
import { userRoles } from './schema/roles';

export {
  SelectCourses,
  SelectUnits,
  SelectLessons,
  SelectChallenges,
  SelectChallengeOptions,
  SelectChallengeProgress,
  SelectUserProgress,
  appRolesEnum,
  challengesEnum,
};
export { courses, units, lessons, challenges, challengeOptions, challengeProgress, userProgress, userRoles };

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeOptions.challengeId],
    references: [challenges.id],
  }),
}));

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
  challenge: one(challenges, {
    fields: [challengeProgress.challengeId],
    references: [challenges.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
  activeLesson: one(lessons, {
    fields: [userProgress.activeLessonId],
    references: [lessons.id],
  }),
}));
