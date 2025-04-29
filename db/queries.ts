import { cache } from 'react';
import { createDrizzleSupabaseClient } from '@/db/drizzle';
import { createClient } from '@/lib/supabase/server';
import { eq } from 'drizzle-orm';
import { units, userProgress, courses, challengeProgress } from '@/db/schema';

export const getCourses = cache(async () => {
  const db = await createDrizzleSupabaseClient();
  const data = await db.admin.query.courses.findMany({
    orderBy: ({ id }, { asc }) => [asc(id)],
  });
  return data;
});

export const getUserProgress = cache(async () => {
  const db = await createDrizzleSupabaseClient();
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  if (!user) return undefined;

  const data = await db.admin.query.userProgress.findFirst({
    where: eq(userProgress.userId, user.id),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const db = await createDrizzleSupabaseClient();
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.userId || !userProgress.activeCourseId) {
    return [];
  }

  const data = await db.admin.query.units.findMany({
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
    const completedLessons = unit.lessons.map((lesson) => {
      const completed = lesson.challenges.every(({ challengeProgress }) => {
        return (
          challengeProgress && challengeProgress.length > 0 && challengeProgress.every(({ completed }) => completed)
        );
      });
      return { ...lesson, completed };
    });
    return { ...unit, lessons: completedLessons };
  });

  return normalizedData;
});

export const getCourseById = cache(async (courseId: number) => {
  const db = await createDrizzleSupabaseClient();
  const data = await db.admin.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  });
  return data;
});
