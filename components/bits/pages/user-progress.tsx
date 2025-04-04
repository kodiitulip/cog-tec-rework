import { Button } from '@/components/ui/button';
import { SelectCourses } from '@/db/schema';
import { InfinityIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  activeCourse: SelectCourses;
  hearts: number;
  points: number;
  hasActiveSubscription?: boolean;
};

export const UserProgress = ({ activeCourse, points, hearts, hasActiveSubscription }: Props) => {
  return (
    <div className='flex items-center justify-between gap-x-3 w-full'>
      <Button
        asChild
        variant='ghost'
      >
        <Link href='/courses'>
          <Image
            src={activeCourse.imageSrc ?? '/flags/unknown.svg'}
            alt={activeCourse.title ?? 'unknown flag'}
            className='rounded-md border'
            width={32}
            height={32}
          />
        </Link>
      </Button>
      <Button
        asChild
        variant='ghost'
        className='text-orange-500'
      >
        <Link href='/shop'>
          <Image
            src='/icons/points.svg'
            alt='Points'
            className='mr-2'
            width={28}
            height={28}
          />
          {points}
        </Link>
      </Button>
      <Button
        asChild
        variant='ghost'
        className='text-rose-500'
      >
        <Link href='/shop'>
          <Image
            src='/icons/heart.svg'
            alt='Hearts'
            className='mr-2'
            width={22}
            height={22}
          />
          {hasActiveSubscription ? <InfinityIcon className='size-4 stroke-3' /> : hearts}
        </Link>
      </Button>
    </div>
  );
};
