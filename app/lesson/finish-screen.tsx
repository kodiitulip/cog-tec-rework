import Confetti from 'react-confetti';
import { CoursesIds } from '@/lib/utils';
import { ResultCard } from './result-card';
import { Footer } from './footer';
import { SelectLessons } from '@/db/schema';
import { useRouter } from 'next/navigation';
import { useAudio, useMount, useWindowSize } from 'react-use';
import { CourseIcon } from '@/components/misc/course-icon';
import { useTransition } from 'react';

type Props = {
  courseId?: CoursesIds;
  points: number;
  hearts: number;
  lessonId: SelectLessons['id'];
  transition: () => void;
};

export const FinishScreen = ({ courseId, hearts, points, lessonId, transition }: Props) => {
  const { width, height } = useWindowSize();
  const [finishAudio] = useAudio({ src: '/sounds/finish.mp3', autoPlay: true });
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  useMount(() => {
    startTransition(transition);
  });

  return (
    <>
      <Confetti
        recycle={false}
        width={width}
        height={height}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      {finishAudio}
      <div className='flex flex-col gap-t-4 lg:gap-y-8 max-w-(--breakpoint-lg) mx-auto text-center items-center justify-center h-full fill-ecstasy-500'>
        <CourseIcon
          className='hidden lg:block'
          height={100}
          width={100}
          courseId={courseId}
          colored
        />
        <CourseIcon
          className='lg:hidden'
          height={50}
          width={50}
          courseId={courseId}
          colored
        />
        <h1 className='text-xl lg:text-3xl font-bold text-neutral-700'>
          Bom Trabalho! <br /> Você completou uma lição :D
        </h1>
        <div className='flex items-center gap-x-4 w-full'>
          <ResultCard
            value={points}
            variant='points'
          />
          <ResultCard
            value={hearts}
            variant='hearts'
          />
        </div>
      </div>
      <Footer
        lessonId={lessonId}
        status='completed'
        onCheck={() => router.push('/learn')}
        disabled={pending}
      />
    </>
  );
};
