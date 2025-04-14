'use client';

import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const Collapsable = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div className='space-y-4'>
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-[grid-template-rows] ease-out duration-500',
          expanded && 'grid-rows-[1fr]'
        )}
      >
        {children}
      </div>
      <Button
        onClick={() => setExpanded((prev) => !prev)}
        variant='ghost'
        size='sm'
      >
        <ChevronDownIcon className={cn('transition-[rotate] duration-200 ease-out', expanded && 'rotate-180')} />
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
    </div>
  );
};
