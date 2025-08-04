import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SelectCourses, SelectUnits } from '@/db/schema';
import { cn } from '@/lib/utils';
import React from 'react';
import { Content } from './content';

type Props = {
  id: SelectUnits['id'];
  title: string;
  description: string;
  courseId: SelectCourses['id'];
};

const tempContent = [
  {
    id: 1,
    title: 'Test',
  },
  {
    id: 2,
    title: 'Test',
  },
  {
    id: 3,
    title: 'Test',
  },
];

export const Unit = ({ id, title, description, courseId }: Props) => {
  return (
    <AccordionItem value={`unit-${id}`}>
      <AccordionTrigger
        className={cn(
          'border-2 rounded-xl p-3 [&>svg]:text-current items-center',
          courseId === 1 && 'bg-behaviorism-500 border-behaviorism-500 text-white',
          courseId === 2 && 'bg-gestalt-500 border-gestalt-500 text-white',
          courseId === 3 && 'bg-sociocultural-500 border-sociocultural-500 text-white'
        )}
      >
        <div className=''>
          <h2 className='text-lg font-bold tracking-wide uppercase'>{title}</h2>
          <p className='text-xs text-neutral-100 font-light'>{description}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {tempContent.map(({ id, title }, idx) => {
          return (
            <Content
              key={idx}
              id={id}
              title={title}
              isLast={idx === tempContent.length - 1}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
