import { BehaviorismIcon, CogTecIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';
import { cn, CourseTitles } from '@/lib/utils';
import { ResultCard } from './result-card';
import { Footer } from './footer';
import { SelectLessons } from '@/db/schema';
import { useRouter } from 'next/navigation';

type Props = {
  courseName?: CourseTitles;
  points: number;
  hearts: number;
  lessonId: SelectLessons['id'];
};

export const FinishScreen = ({ courseName, hearts, points, lessonId }: Props) => {
  const Icon =
    courseName === 'Behaviorismo'
      ? BehaviorismIcon
      : courseName === 'Gestalt'
      ? GestaltIcon
      : courseName === 'Teoria Sociocultural'
      ? SociocultureIcon
      : CogTecIcon;

  const router = useRouter();

  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-t-4 lg:gap-y-8 max-w-(--breakpoint-lg) mx-auto text-center items-center justify-center h-full fill-ecstasy-500',
          courseName === 'Behaviorismo' && 'fill-behaviorism-500',
          courseName === 'Gestalt' && 'fill-gestalt-500',
          courseName === 'Teoria Sociocultural' && 'fill-sociocultural-500'
        )}
      >
        <Icon
          className='hidden lg:block'
          height={100}
          width={100}
        />
        <Icon
          className='lg:hidden'
          height={50}
          width={50}
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
      />
    </>
  );
};
