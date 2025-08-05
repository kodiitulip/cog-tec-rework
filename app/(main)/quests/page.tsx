import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { Progress } from '@/components/ui/progress';
import { getUserProgress } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { tempquests } from '@/constants';
import { cn } from '@/lib/utils';

const QuestsPage = async () => {
  const [userProgress] = await Promise.all([getUserProgress()]);

  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

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
        <div className='w-full flex flex-col items-center'>
          <Image
            src='/icons/quests.svg'
            alt='Quests'
            height={90}
            width={90}
          />
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Missões</h1>
          <p className='tex-neutral-500 text-center text-lg mb-6'>Complete missões ganhando pontos</p>
          <ul className='w-full'>
            {tempquests.map(({ title, value }) => {
              const progress = (userProgress.points / value) * 100;
              return (
                <div
                  key={title}
                  className='flex items-center w-full p-4 gap-x-4 border-t-1'
                >
                  <Image
                    src='/icons/points.svg'
                    alt='points'
                    width={60}
                    height={60}
                  />
                  <div className='flex flex-col gap-y-2 w-full'>
                    <p className='text-neutral-700 text-xl font-bold'>{title}</p>
                    <Progress
                      classNameIndicator={cn(
                        'bg-ecstasy-500',
                        userProgress.activeCourse?.title === 'Behaviorismo' && 'bg-behaviorism-500',
                        userProgress.activeCourse?.title === 'Gestalt' && 'bg-gestalt-500',
                        userProgress.activeCourse?.title === 'Teoria Sociocultural' && 'bg-sociocultural-500'
                      )}
                      value={progress}
                      className='h-3'
                    />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
