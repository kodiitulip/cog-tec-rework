'use client';

import { SelectCourse, SelectUserProgress } from '@/db/schema';
import { Card } from './card';

type Props = {
  courses: SelectCourse[];
  activeCourseId?: SelectUserProgress['activeCourseId'];
};

export const List = ({ courses, activeCourseId }: Props) => {
  return (
    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
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
  );
};
