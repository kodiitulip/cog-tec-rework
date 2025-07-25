'use client';

import { cn } from '@/lib/utils';
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
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentation;

  if (cycleIndex <= 2) indentation = cycleIndex;
  else if (cycleIndex <= 4) indentation = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentation = 4 - cycleIndex;
  else indentation = cycleIndex - 8;

  const rightPosition = indentation * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : '/lesson';

  const colors = locked
    ? 'bg-gray-500 text-gray-700 border-gray-700 hover:bg-gray-400 focus-visible:bg-gray-400'
    : activeCourse == 'Behaviorismo'
    ? 'bg-behaviorism-500 text-behaviorism-700 border-behaviorism-700 hover:bg-behaviorism-400 focus-visible:bg-behaviorism-400'
    : activeCourse == 'Gestalt'
    ? 'bg-gestalt-500 text-gestalt-700 border-gestalt-700 hover:bg-gestalt-400 focus-visible:bg-gestalt-400'
    : activeCourse == 'Teoria Sociocultural'
    ? 'bg-sociocultural-500 text-sociocultural-700 border-sociocultural-700 hover:bg-sociocultural-400 focus-visible:bg-sociocultural-400'
    : 'bg-neutral-500 text-neutral-700 border-neutral-700 hover:bg-neutral-400 focus-visible:bg-neutral-400';

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{
        pointerEvents: locked ? 'none' : 'auto',
        right: `${rightPosition}px`,
        marginTop: isFirst && !isCompleted ? 60 : 24,
      }}
      className={cn(
        'relative size-20 flex items-center justify-center rounded-full border-2 border-b-8 hover:border-b-4',
        colors
      )}
    >
      <Icon />
    </Link>
  );
};
