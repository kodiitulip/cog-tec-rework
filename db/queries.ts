import { cache } from 'react';
import { db } from '@/db/drizzle';
import { createClient } from '@/lib/supabase/server';
import { eq } from 'drizzle-orm';
import { userProgress, courses } from '@/db/schema';

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

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  })
  return data;
})
