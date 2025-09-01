import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SelectLibrary, SelectUnits } from '@/db/schema';
import { cn, CoursesIds } from '@/lib/utils';
import React from 'react';
import { Content } from './content';

type Props = {
  id: SelectUnits['id'];
  title: SelectUnits['title'];
  description: SelectUnits['description'];
  libraryContent: SelectLibrary[];
  courseId?: CoursesIds;
};

export const Unit = ({ id, title, description, courseId = CoursesIds.DEFAULT, libraryContent }: Props) => {
  const courseColors =
    courseId === CoursesIds.BEHAVIORISM ? 'bg-behaviorism-500 border-behaviorism-500'
    : courseId === CoursesIds.GESTALT ? 'bg-gestalt-500 border-gestalt-500'
    : courseId === CoursesIds.SOCIOCULTURE ? 'bg-sociocultural-500 border-sociocultural-500'
    : 'text-neutral-500';

  return (
    <AccordionItem value={`unit-${id}`}>
      <AccordionTrigger
        className={cn('border-1 rounded-xl p-3 [&>svg]:text-current items-center text-white', courseColors)}
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
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
