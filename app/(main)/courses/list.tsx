'use client';

import { SelectCourses, SelectUserProgress } from '@/db/schema';
import { Card } from './card';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';

type Props = {
  courses: SelectCourses[];
  activeCourseId?: SelectUserProgress['activeCourseId'];
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) return router.push('/learn');

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error('Something went wrong!'));
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
