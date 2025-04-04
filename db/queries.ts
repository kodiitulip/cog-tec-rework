import { cache } from 'react';
import { db } from '@/db/drizzle';
import { createClient } from '@/lib/supabase/server';
import { eq } from 'drizzle-orm';
import { units, userProgress, courses } from '@/db/schema';

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany({
    orderBy: ({ id }, { asc }) => [asc(id)],
  });
  return data;
});

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

  if (!userProgress || !userProgress.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: true,
            }
          }
        }
      }
    }
  })

  const normalizedData = data.map((unit) => {
    const completedLessons = unit.lessons.map((lesson) => {
      const completed = lesson.challenges.every(({challengeProgress}) => {
        return challengeProgress && challengeProgress.length > 0 && challengeProgress.every(({completed}) => completed)
      })
      return {...lesson, completed }
    })
    return {...unit, lessons: completedLessons}
  })

  return normalizedData
})

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  })
  return data;
})
