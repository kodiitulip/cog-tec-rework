'use client';

import { Button } from '@/components/ui/button';
import { SelectCourses } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  activeCourse: SelectCourses;
  hearts: number;
  points: number;
};

export const UserProgress = ({ activeCourse, points, hearts }: Props) => {
  const pathname = usePathname();
  const back = pathname.indexOf('/', 1) === -1 ? pathname : pathname.slice(0, pathname.indexOf('/', 1));

  return (
    <div className='flex items-center justify-between gap-x-3 w-full'>
      <Button
        asChild
        variant='ghost'
      >
        <Link href={`/courses?back=${back.replace('/', '')}`}>
          <Image
            src={activeCourse.imageSrc ?? '/icon/cog-tec/icon.svg'}
            alt={activeCourse.title ?? 'unknown flag'}
            className='rounded-md'
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
        <Link href='/quests'>
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
        <Link href='/learn'>
          <Image
            src='/icons/heart.svg'
            alt='Hearts'
            className='mr-2'
            width={22}
            height={22}
          />
          {hearts}
        </Link>
      </Button>
    </div>
  );
};
