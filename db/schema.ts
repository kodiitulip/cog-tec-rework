import { relations } from 'drizzle-orm';
import { challengeProgress, userProgress, SelectChallengeProgress, SelectUserProgress } from './schema/progress';
import { challenges, challengeOptions, SelectChallenges, SelectChallengeOptions } from './schema/challenges';
import { courses, units, lessons, SelectCourses, SelectUnits, SelectLessons } from './schema/courses';
import { appRolesEnum, appPermissionsEnum, challengesEnum } from './schema/enums';
import { userRoles } from './schema/roles';
import { library, SelectLibrary } from './schema/library';

export {
  type SelectCourses,
  type SelectUnits,
  type SelectLessons,
  type SelectChallenges,
  type SelectChallengeOptions,
  type SelectChallengeProgress,
  type SelectUserProgress,
  type SelectLibrary,
  appRolesEnum,
  appPermissionsEnum,
  challengesEnum,
};
export { courses, units, lessons, library, challenges, challengeOptions, challengeProgress, userProgress, userRoles };

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
  library: many(library),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const libraryRelations = relations(library, ({ one }) => ({
  unit: one(units, {
    fields: [library.unitId],
    references: [units.id],
  }),
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
