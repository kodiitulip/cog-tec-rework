import { cache } from 'react';
import { admin } from '@/db/drizzle';
import { and, eq } from 'drizzle-orm';
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
import { getUserId } from '@/actions/auth';

export const getCourses = cache(
  async () =>
    await admin.query.courses.findMany({
      where: eq(courses.hidden, false),
      orderBy: ({ id }, { asc }) => [asc(id)],
    })
);

export const getUserProgress = cache(async () => {
  const { data: userId, error } = await getUserId();

  if (error || !userId) return undefined;

  const data = await admin.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const userProg = await getUserProgress();

  if (!userProg || !userProg.userId || !userProg.activeCourseId) {
    return [];
  }

  const data = await admin.query.units.findMany({
    where: and(eq(units.courseId, userProg.activeCourseId), eq(units.hidden, false)),
    orderBy: ({ order }, { asc }) => [asc(order)],
    with: {
      lessons: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        where: eq(lessons.hidden, false),
        with: {
          challenges: {
            orderBy: ({ order }, { asc }) => [asc(order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userProg.userId),
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
  const userProg = await getUserProgress();

  if (!userProg || !userProg.userId || !userProg.activeCourseId) {
    return [];
  }

  const data = await admin.query.units.findMany({
    where: and(eq(units.courseId, userProg.activeCourseId), eq(units.hidden, false)),
    orderBy: ({ order }, { asc }) => [asc(order)],
    with: {
      library: {
        orderBy: ({order}, {asc}) => [asc(order)],
      },
    },
  });

  return data;
});

export const getLibraryContentById = cache(async (contentId: SelectLibrary['id']) => {
  const data = await admin.query.library.findFirst({
    where: and(eq(library.id, contentId), eq(library.hidden, false)),
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
          where: eq(units.hidden, false),
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
        where: eq(units.hidden, false),
        with: {
          lessons: {
            orderBy: ({ order }, { asc }) => [asc(order)],
            where: eq(lessons.hidden, false),
          },
        },
      },
    },
  });
  return data?.units[0].lessons[0];
});

export const getCourseProgress = cache(async () => {
  const userProg = await getUserProgress();

  if (!userProg || !userProg?.userId || !userProg.activeCourseId) return null;

  const unitsInActiveCourse = await admin.query.units.findMany({
    orderBy: ({ order }, { asc }) => [asc(order)],
    where: eq(units.courseId, userProg.activeCourseId),
    with: {
      lessons: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userProg.userId),
              },
            },
          },
        },
      },
    },
  });

  const allLessons = unitsInActiveCourse.flatMap(({ lessons }) => lessons);

  const firstUncompletedLesson = allLessons.find(({ challenges }) =>
    challenges.some(
      ({ challengeProgress }) =>
        !challengeProgress || challengeProgress.length === 0 || challengeProgress.some(({ completed }) => !completed)
    )
  );

  // in case the user manages to complete the course and there are no more
  // uncompleted lessons, we will fallback to the last lesson on the course
  // just so that the /lesson page allows the quiz component to show the
  // finish screen
  return {
    activeLesson: firstUncompletedLesson || allLessons.at(-1),
    activeLessonId: (firstUncompletedLesson || allLessons.at(-1))?.id,
  };
});

export const getCourseProgressByCourseId = cache(async (courseId: SelectCourses['id']) => {
  const userProg = await getUserProgress();

  if (!userProg || !userProg?.userId || !courseId) return null;

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
                where: eq(challengeProgress.userId, userProg.userId),
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
  const userProg = await getUserProgress();
  if (!userProg || !userProg.userId) return null;

  const courseProgress = await getCourseProgress();

  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) return null;

  const data = await admin.query.lessons.findFirst({
    where: and(eq(lessons.id, lessonId), eq(lessons.hidden, false)),
    with: {
      challenges: {
        orderBy: ({ order }, { asc }) => [asc(order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userProg?.userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const challenges = data.challenges.map(({ challengeProgress, ...challenge }) => ({
    ...challenge,
    challengeProgress,
    completed:
      challengeProgress && challengeProgress.length > 0 && challengeProgress.every(({ completed }) => completed),
  }));

  return { ...data, challenges };
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
  const userProg = await getUserProgress();

  if (!userProg || !userProg.userId) return [];

  const data = await admin.query.userProgress.findMany({
    orderBy: ({ points }, { desc }) => [desc(points)],
    where: eq(userProgress.rankHidden, false),
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
