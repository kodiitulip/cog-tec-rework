'use server';

import { admin } from '@/db/drizzle';
import { getCourseById, getActiveLessonByCourseId, getFirstLessonOnCourse, getUserProgress } from '@/db/queries';
import { SelectChallenges, userProgress } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { AuthError } from '@supabase/supabase-js';
import { getUserId } from '@/actions/auth';
import { eq } from 'drizzle-orm';

type UpsertUserProgressError = {
  type: 'UNAUTHORIZED' | 'MISSING_ID' | 'COURSE_NOT_FOUND' | 'COURSE_EMPTY';
  error?: AuthError;
};

export const upsertUserProgress = async (courseId: number): Promise<{ error: UpsertUserProgressError | null }> => {
  const { data: userId, error } = await getUserId();
  if (error || !userId)
    return {
      error: { type: 'UNAUTHORIZED' },
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

  const [existingUserProgress, activeLesson, fallback] = await Promise.all([
    getUserProgress(),
    getActiveLessonByCourseId(courseId, userId),
    getFirstLessonOnCourse(courseId),
  ]);

  if (existingUserProgress) {
    await admin.update(userProgress).set({
      activeCourseId: courseId,
      activeLessonId: activeLesson.id || fallback?.id,
    });
  } else {
    await admin.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      activeLessonId: fallback?.id || 1,
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
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress)
    return {
      error: {
        type: 'MISSING_USER_PROGRESS',
      },
    };

  const existingChallengeProgress = await admin.query.challengeProgress.findFirst({
    where: ({ userId, challengeId: challId }, { and, eq }) =>
      and(eq(userId, currentUserProgress.userId), eq(challId, challengeId)),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: { type: 'PRACTICE_MODE' } };

  if (currentUserProgress.hearts === 0)
    return {
      error: {
        type: 'ZERO_HEARTS',
      },
    };

  const challenge = await admin.query.challenges.findFirst({
    where: ({ id: challId }, { eq }) => eq(challId, challengeId),
  });

  if (!challenge)
    return {
      error: {
        type: 'CHALLENGE_NOT_FOUND',
      },
    };

  const lessonId = challenge.lessonId;

  await admin
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath('/learn');
  revalidatePath('/lesson');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
  return {
    error: null,
  };
};
