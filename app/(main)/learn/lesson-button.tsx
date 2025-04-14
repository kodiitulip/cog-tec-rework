'use client';

import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({ index, totalCount, current, locked, id }: Props) => {
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

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? 'none' : 'auto' }}
    >
      <div
        className='relative'
        style={{ right: `${rightPosition}px`, marginTop: isFirst && !isCompleted ? 60 : 24 }}
      >
        {current ? <div></div> : <div></div>}
      </div>
    </Link>
  );
};
