import { getLesson, getUserProgress } from '@/db/queries';
import { notFound } from 'next/navigation';
import React from 'react';
import { Quiz } from './quiz';
import { CourseTitles } from '@/lib/utils';

const LessonPage = async () => {
  const [lesson, userProgress] = await Promise.all([getLesson(), getUserProgress()]);

  if (!lesson || !userProgress) notFound();

  const initialPercentage =
    (lesson.challenges.filter(({ completed }) => completed).length / lesson.challenges.length) * 100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      activeCourseName={userProgress.activeCourse?.title as CourseTitles}
    />
  );
};

export default LessonPage;
