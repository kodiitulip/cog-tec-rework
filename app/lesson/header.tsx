'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn, CoursesIds } from '@/lib/utils';
import { useExitModal } from '@/store/use-exit-modal';
import { X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  hearts: number;
  percentage: number;
  courseId?: CoursesIds;
};

export const Header = ({ hearts, percentage, courseId }: Props) => {
  const { open } = useExitModal();
  const courseColors =
    courseId === CoursesIds.BEHAVIORISM ? 'bg-behaviorism-500'
    : courseId === CoursesIds.GESTALT ? 'bg-gestalt-500'
    : courseId === CoursesIds.SOCIOCULTURE ? 'bg-sociocultural-500'
    : 'bg-ecstasy-500';

  return (
    <header className='lg:pt-12 pt-5 px-10 flex gap-x-7 items-center justify-between max-w-285 mx-auto w-full'>
      <Button
        variant='ghost'
        size='icon'
        onClick={open}
        className='text-slate-500 hover:bg-slate-500/40 focus-visible:bg-slate-500/40'
      >
        <X />
      </Button>
      <Progress
        value={percentage}
        classNameIndicator={cn(courseColors)}
      />
      <div className='text-rose-500 flex items-center font-bold'>
        <Image
          src='/icons/heart.svg'
          alt='Coração'
          height={28}
          width={28}
          className='mr-2'
        />
        {hearts}
      </div>
    </header>
  );
};
