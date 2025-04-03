'use client';

import { SelectCourse, SelectUserProgress } from '@/db/schema';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';

type Props = {
  courses: SelectCourse[];
  activeCourseId?: SelectUserProgress['activeCourseId'];
};

export const List = ({ courses, activeCourseId }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div>
      <div
        className={cn(
          'pt-6 grid grid-rows-[0fr] transition-[grid-template-rows] ease-out duration-500',
          !expanded && 'grid-rows-[1fr]'
        )}
      >
        <div className='grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-y-hidden min-h-55'>
          {courses.map(({ id, title, imageSrc }) => (
            <Card
              key={id}
              id={id}
              title={title}
              imageSrc={imageSrc}
              onClick={() => {}}
              disabled={false}
              active={id === activeCourseId}
            />
          ))}
        </div>
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
