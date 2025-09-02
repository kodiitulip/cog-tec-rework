import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { Header } from './header';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { getUserProgress, getUnits, getCourseProgress, getLessonPercentage } from '@/db/queries';
import { redirect } from 'next/navigation';
import { Unit } from './unit';
import { CourseTitles } from '@/lib/utils';
import { QuestSidenote } from '@/components/misc/sidenote/quest';

const LearnPage = async () => {
  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
  ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect('/courses');
  }

  return (
    <div className='flex flex-row-reverse gap-12 px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <QuestSidenote
          points={userProgress.points}
          courseId={userProgress.activeCourseId || undefined}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div
            key={unit.id}
            className='mb-10'
          >
            <Unit
              {...unit}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
              courseId={userProgress.activeCourseId || undefined}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
