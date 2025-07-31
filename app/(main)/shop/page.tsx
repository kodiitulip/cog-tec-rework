import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { QuestSidenote } from '@/components/misc/sidenote/quest';
import { getUserProgress } from '@/db/queries';
import { CourseTitles } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const ShopPage = async () => {
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
        <QuestSidenote
          points={userProgress.points}
          courseTitle={userProgress.activeCourse.title as CourseTitles}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image
            src='/icons/shop.svg'
            alt='Quests'
            height={90}
            width={90}
          />
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Loja</h1>
          <p className='tex-neutral-500 text-center text-lg mb-6'>Gaste pontos para conseguir corações!</p>
          <p className='text-rose-600/70 text-center font-bold tracking-wider uppercase'>🚧 Em construção 🚧</p>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
