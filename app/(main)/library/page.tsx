// TODO: Library Page
import { FeedWrapper } from '@/components/bits/pages/feed-wrapper';
import { StickyWrapper } from '@/components/bits/pages/sticky-wrapper';
import { UserProgress } from '@/components/bits/pages/user-progress';
import { QuestSidenote } from '@/components/misc/sidenote/quest';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { getLibraryUnits, getUserProgress } from '@/db/queries';
import { CourseTitles } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Unit } from './unit';

const LibraryPage = async () => {
  const [userProgress, units] = await Promise.all([getUserProgress(), getLibraryUnits()]);

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
            src='/icons/learn.svg'
            alt='Biblioteca'
            height={90}
            width={90}
          />
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>Biblioteca</h1>
          <p className='tex-neutral-500 text-center text-lg mb-6'>Leia e estude os conteúdos aqui!</p>
          <Separator className='mb-4 rounded-full' />
          <Accordion
            type='single'
            collapsible
            className='w-full'
          >
            {units.map(({ id, title, courseId, description, library }, idx) => (
              <Unit
                key={idx}
                id={id}
                courseId={courseId}
                description={description}
                title={title}
                libraryContent={library}
              />
            ))}
          </Accordion>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LibraryPage;
