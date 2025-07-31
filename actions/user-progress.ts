'use server';

import { db } from '@/db/drizzle';
import { getCourseById, getUserProgress } from '@/db/queries';
import { challengeProgress, challenges, SelectChallenges, userProgress } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';
import { AuthError } from '@supabase/supabase-js';

type UpsertUserProgressError = {
  type: 'UNAUTHORIZED' | 'MISSING_ID' | 'COURSE_NOT_FOUND' | 'COURSE_EMPTY';
  error?: AuthError;
};

export const upsertUserProgress = async (courseId: number): Promise<{ error: UpsertUserProgressError | null }> => {
  const { auth } = await createClient();

  const { data, error } = await auth.getUser();
  if (error)
    return {
      error: { type: 'UNAUTHORIZED', error },
    };

  const { user } = data;

  const { id } = user;
  if (!id)
    return {
      error: { type: 'MISSING_ID' },
    };

  const course = await getCourseById(courseId);
  if (!course)
    return {
      error: { type: 'COURSE_NOT_FOUND' },
    };

  if (!course.units.length || !course.units[0].lessons.length)
    return {
      error: { type: 'COURSE_EMPTY' },
    };

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      activeLessonId: existingUserProgress.activeLessonId || 1,
      userName: (user.user_metadata['user_name'] as string) || 'User',
      userImageSrc: user.user_metadata['avatar_url'] as string,
    });
  } else {
    await db.insert(userProgress).values({
      userId: id,
      activeCourseId: courseId,
      activeLessonId: 1,
      userName: (user.user_metadata['user_name'] as string) || 'User',
      userImageSrc: user.user_metadata['avatar_url'] as string,
    });
  }

  revalidatePath('/courses');
  revalidatePath('/learn');
  return { error: null };
};

export type ReduceHeartsError = {
  type:
    | 'UNAUTHORIZED'
    | 'MISSING_USER_ID'
    | 'MISSING_USER_PROGRESS'
    | 'CHALLENGE_NOT_FOUND'
    | 'PRACTICE_MODE'
    | 'ZERO_HEARTS';
  error?: AuthError;
};

export const reduceHearts = async (
  challengeId: SelectChallenges['id']
): Promise<{ error: ReduceHeartsError | null }> => {
  const { auth } = await createClient();

  const { data, error } = await auth.getUser();
  if (error)
    return {
      error: {
        type: 'UNAUTHORIZED',
        error,
      },
    };

  const {
    user: { id: userId },
  } = data;
  if (!userId)
    return {
      error: {
        type: 'MISSING_USER_ID',
      },
    };

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress)
    return {
      error: {
        type: 'MISSING_USER_PROGRESS',
      },
    };

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId)),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: { type: 'PRACTICE_MODE' } };

  if (currentUserProgress.hearts === 0)
    return {
      error: {
        type: 'ZERO_HEARTS',
      },
    };

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge)
    return {
      error: {
        type: 'CHALLENGE_NOT_FOUND',
      },
    };

  const lessonId = challenge.lessonId;

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath('/learn');
  revalidatePath('/lesson');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
  return {
    error: null,
  };
};
