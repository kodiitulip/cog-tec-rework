'use server';

import { admin } from '@/db/drizzle';
import { getUserProgress } from '@/db/queries';
import { challengeProgress, challenges, SelectChallenges, userProgress } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type UpsertChallengeProgressError = {
  type: 'UNAUTHORIZED' | 'MISSING_USER_ID' | 'MISSING_USER_PROGRESS' | 'CHALLENGE_NOT_FOUND' | 'ZERO_HEARTS';
  error?: AuthError;
};

export const upsertChallengeProgress = async (
  challengeId: SelectChallenges['id']
): Promise<{ error: UpsertChallengeProgressError | null }> => {
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

  if (!currentUserProgress) {
    return {
      error: {
        type: 'MISSING_USER_PROGRESS',
      },
    };
  }

  const challenge = await admin.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge)
    return {
      error: {
        type: 'CHALLENGE_NOT_FOUND',
      },
    };

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await admin.query.challengeProgress.findFirst({
    where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId)),
  });

  const isPractice = !!existingChallengeProgress;

  if (currentUserProgress.hearts === 0 && !isPractice)
    return {
      error: {
        type: 'ZERO_HEARTS',
      },
    };

  if (isPractice) {
    await admin
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await admin
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 5,
      })
      .where(eq(userProgress.userId, userId));
  } else {
    await admin.insert(challengeProgress).values({
      challengeId,
      userId,
      completed: true,
    });

    await admin
      .update(userProgress)
      .set({
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));
  }

  revalidatePath('/learn');
  revalidatePath('/lesson');
  revalidatePath('/leaderboard');
  revalidatePath(`/lesson/${lessonId}`);
  return {
    error: null,
  };
};
