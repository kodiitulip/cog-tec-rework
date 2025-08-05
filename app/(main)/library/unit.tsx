import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SelectCourses, SelectLibrary, SelectUnits } from '@/db/schema';
import { cn } from '@/lib/utils';
import React from 'react';
import { Content } from './content';

type Props = {
  id: SelectUnits['id'];
  title: SelectUnits['title'];
  description: SelectUnits['description'];
  libraryContent: SelectLibrary[];
  courseId: SelectCourses['id'];
};

export const Unit = ({ id, title, description, courseId, libraryContent }: Props) => {
  return (
    <AccordionItem value={`unit-${id}`}>
      <AccordionTrigger
        className={cn(
          'border-1 rounded-xl p-3 [&>svg]:text-current items-center text-neutral-500',
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
        {libraryContent.map(({ id, title }, idx) => {
          return (
            <Content
              key={idx}
              id={id}
              title={title}
              isLast={idx === libraryContent.length - 1}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
