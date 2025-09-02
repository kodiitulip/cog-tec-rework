'use client';

import { cn, CoursesIds } from '@/lib/utils';
import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  completed: boolean;
  courseId?: CoursesIds;
};

export const LessonButton = ({
  index,
  id,
  current,
  completed,
  locked,
  totalCount,
  courseId = CoursesIds.DEFAULT,
}: Props) => {
  const isLast = index === totalCount;

  const Icon = completed ? Check : isLast ? Crown : Star;
  const href = completed ? `/lesson/${id}` : '/lesson';

  const courseStyles = {
    [CoursesIds.DEFAULT]: 'bg-neutral-500 text-neutral-700 border-neutral-700',
    [CoursesIds.BEHAVIORISM]: 'bg-behaviorism-500 text-behaviorism-700 border-behaviorism-700',
    [CoursesIds.GESTALT]: 'bg-gestalt-500 text-gestalt-700 border-gestalt-700',
    [CoursesIds.SOCIOCULTURE]: 'bg-sociocultural-500 text-sociocultural-700 border-sociocultural-700',
  };

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{
        pointerEvents: locked ? 'none' : 'auto',
      }}
      className={cn(
        'relative size-20 flex items-center justify-center rounded-full border-2 border-b-6 hover:border-b-4',
        index % 3 !== 0 ? 'col-span-1' : 'col-span-2 mx-auto',
        locked ? courseStyles[CoursesIds.DEFAULT] : courseStyles[courseId]
      )}
    >
      {current && (
        <div className='absolute -top-6 uppercase rounded-xl bg-white animate-bounce tracking-wide z-10 border-2 font-bold px-3 py-2.5 border-current'>
          start
          <div className='absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2 border-t-current'></div>
        </div>
      )}
      <Icon />
    </Link>
  );
};
