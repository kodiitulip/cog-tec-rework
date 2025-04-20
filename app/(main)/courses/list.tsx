'use client';

import { SelectCourses, SelectUserProgress } from '@/db/schema';
import { Card } from './card';
import { useTransition } from 'react';
import { redirect } from 'next/navigation';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';

type Props = {
  courses: SelectCourses[];
  activeCourseId?: SelectUserProgress['activeCourseId'];
} & React.ComponentProps<'div'>;

export const List = ({ courses, activeCourseId }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) return redirect('/learn');

    startTransition(async () => {
      const result = await upsertUserProgress(id);
      if (result.isErr()) {
        let message = 'Unexpected error';
        switch (result.error.type) {
          case 'UNAUTHORIZED':
            message = 'Unauthorized User';
          case 'MISSING_ID':
            message = 'Missing User ID';
          case 'COURSE_NOT_FOUND':
            message = 'Course could not be found';
          case 'COURSE_EMPTY':
            message = 'Course is empty of units';
        }

        toast.error(message);
      } else if (result.isOk()) toast.success('Changed course Successfuly');
    });
  };

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-y-hidden min-h-55'>
      {courses.map(({ id, title, imageSrc }) => (
        <Card
          key={id}
          id={id}
          title={title}
          imageSrc={imageSrc}
          onClick={onClick}
          disabled={pending}
          active={id === activeCourseId}
        />
      ))}
    </div>
  );
};
