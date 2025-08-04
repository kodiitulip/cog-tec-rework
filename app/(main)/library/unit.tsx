import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SelectCourses, SelectUnits } from '@/db/schema';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  id: SelectUnits['id'];
  title: string;
  description: string;
  courseId: SelectCourses['id'];
};

export const Unit = ({ id, title, description, courseId }: Props) => {
  return (
    <AccordionItem value={`unit-${id}`}>
      <AccordionTrigger
        className={cn(
          'border-2 rounded-xl p-3 [&>svg]:text-current',
          courseId === 1 && 'bg-behaviorism-500 border-behaviorism-500 text-white',
          courseId === 2 && 'bg-gestalt-500 border-gestalt-500 text-white',
          courseId === 3 && 'bg-sociocultural-500 border-sociocultural-500 text-white'
        )}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className='p-2 mx-2.5 border-2 border-t-0 rounded-b-xl'>{description}</AccordionContent>
    </AccordionItem>
  );
};
