import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { tempquests } from '@/constants';
import { cn, CoursesIds } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  points: number;
  courseId?: CoursesIds;
};

export const QuestSidenote = ({ points, courseId = CoursesIds.DEFAULT }: Props) => {
  const courseColors =
    courseId === CoursesIds.BEHAVIORISM ? 'bg-behaviorism-500'
    : courseId === CoursesIds.GESTALT ? 'bg-gestalt-500'
    : courseId === CoursesIds.SOCIOCULTURE ? 'bg-sociocultural-500'
    : 'bg-ecstasy-500';

  return (
    <div className='border-1 rounded-xl p-4 space-y-4'>
      <div className='flex items-center justify-between w-full space-y-2'>
        <h3 className='font-bold text-lg'>Missões</h3>
        <Button
          asChild
          variant='ghost'
          size='sm'
        >
          <Link href='/quests'>Ver Missões</Link>
        </Button>
      </div>
      <ul>
        {tempquests.map(({ title, value }) => {
          const progress = (points / value) * 100;
          return (
            <div
              key={title}
              className='flex items-center w-full pb-4 gap-x-3'
            >
              <Image
                src='/icons/points.svg'
                alt='points'
                width={40}
                height={40}
              />
              <div className='flex flex-col gap-y-2 w-full'>
                <p className='text-neutral-700 text-sm font-bold'>{title}</p>
                <Progress
                  classNameIndicator={cn('bg-ecstasy-500', courseColors)}
                  value={progress}
                  className='h-2'
                />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
