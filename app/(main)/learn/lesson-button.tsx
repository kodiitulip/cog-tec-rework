'use client';

import { cn, tailwindCourseColors } from '@/lib/utils';
import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  activeCourse: string;
};

export const LessonButton = ({ index, totalCount, current, locked, id, activeCourse }: Props) => {
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : '/lesson';

  const colors = [
    tailwindCourseColors(locked ? '' : activeCourse, 'bg', '500'),
    tailwindCourseColors(locked ? '' : activeCourse, 'text', '700'),
    tailwindCourseColors(locked ? '' : activeCourse, 'border', '700'),
    'hover:' + tailwindCourseColors(locked ? '' : activeCourse, 'bg', '400'),
    'focus-visible:' + tailwindCourseColors(locked ? '' : activeCourse, 'bg', '400'),
  ];

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{
        pointerEvents: locked && !isFirst ? 'none' : 'auto',
      }}
      className={cn(
        'relative size-20 flex items-center justify-center rounded-full border-2 border-b-6 hover:border-b-4',
        ...colors,
        index % 3 !== 0 ? 'col-span-1' : 'col-span-2 mx-auto'
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
