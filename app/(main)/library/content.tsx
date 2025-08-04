import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  id: number; // TODO: change to select type
  isLast: boolean;
  title: string;
};

export const Content = ({ title, isLast }: Props) => {
  return (
    <div className={cn('p-2 mx-2.5 border-2 border-t-0', isLast && 'rounded-b-xl')}>
      <p className='text-md font-medium'>{title}</p>
    </div>
  );
};
