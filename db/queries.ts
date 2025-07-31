import { cache } from 'react';
import { db } from '@/db/drizzle';
import { createClient } from '@/lib/supabase/server';
import { eq } from 'drizzle-orm';
import { units, userProgress, courses, challengeProgress, lessons } from '@/db/schema';

export const getCourses = cache(
  async () =>
    await db.query.courses.findMany({
      orderBy: ({ id }, { asc }) => [asc(id)],
    })
);

export const getUserProgress = cache(async () => {
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  if (!user) return undefined;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, user.id),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.userId || !userProgress.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userProgress.userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessons = unit.lessons.map((lesson) => {
      const completed =
        lesson.challenges.length > 0 &&
        lesson.challenges.every(
          ({ challengeProgress }) =>
            challengeProgress.length > 0 && challengeProgress.every(({ completed }) => completed)
        );
      return { ...lesson, completed };
    });
    return { ...unit, lessons };
  });

  return normalizedData;
});

export const getCourseById = cache(
  async (courseId: number) =>
    await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      with: {
        units: {
          orderBy: ({ order }, { asc }) => [asc(order)],
          with: {
            lessons: {
              orderBy: ({ order }, { asc }) => [asc(order)],
            },
          },
        },
      },
    })
);

export const getCourseProgress = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress?.userId || !userProgress.activeCourseId) return null;

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: ({ order }, { asc }) => [asc(order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userProgress.userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) =>
      lesson.challenges.some(
        ({ challengeProgress }) =>
          !challengeProgress || challengeProgress.length === 0 || challengeProgress.some(({ completed }) => !completed)
      )
    );

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.userId) return null;

  const courseProgress = await getCourseProgress();

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) return null;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userProgress?.userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const normalizedChallenges = data.challenges.map((challenge) => ({
    ...challenge,
    completed:
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every(({ completed }) => completed),
  }));

  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(({ completed }) => completed);
  const percentage = Math.round(completedChallenges.length / lesson.challenges.length) * 100;

  return percentage;
});
