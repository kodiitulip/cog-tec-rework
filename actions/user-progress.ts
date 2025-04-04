'use server';

import { db } from '@/db/drizzle';
import { getCourseById, getUserProgress } from '@/db/queries';
import { userProgress } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const upsertUserProgress = async (courseId: number) => {
  const { auth } = await createClient();

  const {
    data: { user },
  } = await auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { id: userId } = user;
  if (!userId) throw new Error('Unauthorized');

  const course = await getCourseById(courseId);
  if (!course) throw new Error('Course not found');

  // TODO: enable once units and lessos are implemented
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error("Course is empty");
  // }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: (user.user_metadata['user_name'] as string) || 'User',
      userImageSrc:
        (user.user_metadata['avatar_url'] as string) || '/kenney/shape-characters/PNG/Default/blue_body_circle.png',
    });
    revalidatePath('/courses');
    revalidatePath('/learn');
    redirect('/learn');
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: (user.user_metadata['user_name'] as string) || 'User',
    userImageSrc:
      (user.user_metadata['avatar_url'] as string) || '/kenney/shape-characters/PNG/Default/blue_body_circle.png',
  });

  revalidatePath('/courses');
  revalidatePath('/learn');
  redirect('/learn');
};
