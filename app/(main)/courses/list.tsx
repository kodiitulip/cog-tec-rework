'use client';

import { SelectCourse, SelectUserProgress } from '@/db/schema';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
          'pt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-y-hidden transition-[height] ease-out duration-150',
          !expanded && 'md:h-62 h-120'
        )}
      >
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
      <button onClick={() => setExpanded((prev) => !prev)}>Expand</button>
    </div>
  );
};
