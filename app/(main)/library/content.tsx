import { SelectLibrary } from '@/db/schema';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {
  id: SelectLibrary['id']; // TODO: change to select type
  title: SelectLibrary['title'];
  isLast?: boolean;
};

export const Content = ({ id, title, isLast = false }: Props) => {
  return (
    <div className={cn('p-1 mx-2.5 border-1 border-t-0', isLast && 'rounded-b-xl')}>
      <Link
        href={`/library/${id}`}
        className='text-md font-medium rounded-lg hover:bg-neutral-400/40 p-1 w-full block'
      >
        {title}
      </Link>
    </div>
  );
};
