import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import { Quiz } from '../quiz';
import { CourseTitles } from '@/lib/utils';
import { SelectLessons } from '@/db/schema';

type Props = {
  params: Promise<{
    id: SelectLessons['id'];
  }>;
};

const LessonIdPage = async ({ params }: Props) => {
  const { id: lessonId } = await params;
  const [lesson, userProgress] = await Promise.all([getLesson(lessonId), getUserProgress()]);

  if (!lesson || !userProgress) redirect('/learn');

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

export default LessonIdPage;
