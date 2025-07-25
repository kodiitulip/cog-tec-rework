'use server';

import { db } from '@/db/drizzle';
import { getCourseById, getUserProgress } from '@/db/queries';
import { userProgress } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Result, err, ok } from 'neverthrow';

type UpsertUserProgressError = { type: 'UNAUTHORIZED' | 'MISSING_ID' | 'COURSE_NOT_FOUND' | 'COURSE_EMPTY' };

export const upsertUserProgress = async (courseId: number): Promise<Result<null, UpsertUserProgressError>> => {
  const { auth } = await createClient();

  const { data, error } = await auth.getUser();
  if (error)
    return err({
      type: 'UNAUTHORIZED',
      error,
    });

  const { user } = data;

  const { id } = user;
  if (!id)
    return err({
      type: 'MISSING_ID',
    });

  const course = await getCourseById(courseId);
  if (!course)
    return err({
      type: 'COURSE_NOT_FOUND',
    });

  // TODO: enable once units and lessos are implemented
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   return err({
  //     type: 'COURSE_EMPTY',
  //   });
  // }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      activeLessonId: existingUserProgress.activeLessonId || 1,
      userName: (user.user_metadata['user_name'] as string) || 'User',
      userImageSrc: user.user_metadata['avatar_url'] as string,
    });
    revalidatePath('/courses');
    revalidatePath('/learn');
    return ok(redirect('/learn'));
  }

  await db.insert(userProgress).values({
    userId: id,
    activeCourseId: courseId,
    activeLessonId: 1,
    userName: (user.user_metadata['user_name'] as string) || 'User',
    userImageSrc: user.user_metadata['avatar_url'] as string,
  });

  revalidatePath('/courses');
  revalidatePath('/learn');
  return ok(redirect('/learn'));
};
