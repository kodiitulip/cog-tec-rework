import { cache } from 'react';
import { admin } from '@/db/drizzle';
import { createClient } from '@/lib/supabase/server';
import { eq } from 'drizzle-orm';
import {
  units,
  userProgress,
  courses,
  challengeProgress,
  lessons,
  SelectCourses,
  SelectLibrary,
  library,
} from '@/db/schema';

export const getCourses = cache(
  async () =>
    await admin.query.courses.findMany({
      orderBy: ({ id }, { asc }) => [asc(id)],
    })
);

export const getUserProgress = cache(async () => {
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  if (!user) return undefined;

  const data = await admin.query.userProgress.findFirst({
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

  const data = await admin.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    orderBy: ({ order }, { asc }) => [asc(order)],
    with: {
      lessons: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        with: {
          challenges: {
            orderBy: ({ order }, { asc }) => [asc(order)],
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

export const getLibraryUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.userId || !userProgress.activeCourseId) {
    return [];
  }

  const data = await admin.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    orderBy: ({ order }, { asc }) => [asc(order)],
    with: {
      library: true,
    },
  });

  return data;
});

export const getLibraryContentById = cache(async (contentId: SelectLibrary['id']) => {
  const data = await admin.query.library.findFirst({
    where: eq(library.id, contentId),
    with: {
      unit: true,
    },
  });
  return data;
});

export const getCourseById = cache(
  async (courseId: number) =>
    await admin.query.courses.findFirst({
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

export const getFirstLessonOnCourse = cache(async (courseId: SelectCourses['id']) => {
  const data = await admin.query.courses.findFirst({
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
  });
  return data?.units[0].lessons[0];
});

export const getCourseProgress = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress?.userId || !userProgress.activeCourseId) return null;

  const unitsInActiveCourse = await admin.query.units.findMany({
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

export const getCourseProgressByCourseId = cache(async (courseId: SelectCourses['id']) => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress?.userId || !courseId) return null;

  const unitsInCourse = await admin.query.units.findMany({
    orderBy: ({ order }, { asc }) => [asc(order)],
    where: eq(units.courseId, courseId),
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

  const firstUncompletedLesson = unitsInCourse
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

  const data = await admin.query.lessons.findFirst({
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

export const getTopNUsers = cache(async (n: number = 10) => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.userId) return [];

  const data = await admin.query.userProgress.findMany({
    orderBy: ({ points }, { desc }) => [desc(points)],
    limit: n,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
  return data;
});
