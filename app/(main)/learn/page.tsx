import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { Header } from './header';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { getUserProgress, getUnits } from '@/db/queries';
import { redirect } from 'next/navigation';
import { Unit } from './unit';

const LearnPage = async () => {
  const [userProgress, units] = await Promise.all([getUserProgress(), getUnits()]);

  if (!userProgress || !userProgress.activeCourse) {
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
              activeLesson={undefined}
              activeLessonPercentage={0}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
