import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
          <Separator className='mb-4 h-0.5 rounded-full' />
          {leaderboard.map(({ userId, userName, userImageSrc, points }, index) => (
            <div
              key={userId}
              className='flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50'
            >
              <p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
              <Avatar className='border bg-green-500 size-12 ml-3 mr-6'>
                <AvatarImage
                  src={userImageSrc}
                  className='object-cover'
                />
                <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p>{userName}</p>
              <p>{points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
