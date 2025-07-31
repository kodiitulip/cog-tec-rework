import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { getTopNUsers, getUserProgress } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const LeaderboardPage = async () => {
  const [userProgress, leaderboard] = await Promise.all([getUserProgress(), getTopNUsers()]);

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
            src='/icons/leaderboard.svg'
            alt='Lideraça'
            height={90}
            width={90}
          />
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Ranking</h1>
          <p className='tex-neutral-500 text-center text-lg mb-6'>Veja sua posição ao lado de outros estudantes!</p>
        </div>
        {leaderboard.map(({ userId, userName }, index) => (
          <div key={userId}>{userName}</div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
