'use client';

import { SelectCourses, SelectUserProgress } from '@/db/schema';
import { Card } from './card';
import { useTransition } from 'react';
import { redirect } from 'next/navigation';
import { upsertUserProgress } from '@/actions/user-progress';
import { toast } from 'sonner';
import { CourseTitles } from '@/lib/utils';

type Props = {
  courses: SelectCourses[];
  activeCourseId?: SelectUserProgress['activeCourseId'];
  backLink?: string;
} & React.ComponentProps<'div'>;

export const List = ({ courses, activeCourseId, backLink = '/learn' }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    const blink = backLink.startsWith('/') ? backLink : `/${backLink}`;

    if (id === activeCourseId) return redirect(blink);

    startTransition(async () => {
      const { error } = await upsertUserProgress(id);
      if (!error) {
        toast.success('Changed course Successfuly');
        redirect(blink);
      }
      switch (error.type) {
        case 'UNAUTHORIZED':
          toast.error('Usuário não autorizado');
          break;
        case 'COURSE_NOT_FOUND':
          toast.error('Curso não encontrado');
          break;
        case 'COURSE_EMPTY':
          toast.error('Curso está vazio. Porfavor avisar aos administradores!');
          break;
        default:
          toast.error('Um erro inesperado aconteceu');
          break;
      }
    });
  };

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 overflow-y-hidden min-h-55'>
      {courses.map(({ id, title, imageSrc, hidden }) =>
        hidden ?
          <Card
            key={id}
            id={id}
            title={title as CourseTitles}
            imageSrc={imageSrc}
            onClick={onClick}
            disabled={pending}
            active={id === activeCourseId}
          />
        : null
      )}
    </div>
  );
};
