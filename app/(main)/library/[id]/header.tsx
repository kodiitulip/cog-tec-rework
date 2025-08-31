import { Button } from '@/components/ui/button';
import { SelectLibrary } from '@/db/schema';
import { cn, CoursesIds } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: SelectLibrary['id'];
  title?: string;
  courseId?: CoursesIds;
};

export const Header = ({ courseId = CoursesIds.DEFAULT, id, title = 'Header' }: Props) => {
  const courseColors =
    courseId === CoursesIds.BEHAVIORISM ? 'bg-behaviorism-500'
    : courseId === CoursesIds.GESTALT ? 'bg-gestalt-500'
    : courseId === CoursesIds.SOCIOCULTURE ? 'bg-sociocultural-500'
    : 'bg-ecstasy-500';

  return (
    <div className={cn('p-4 px-6 rounded-xl max-w-(--breakpoint-lg) flex flex-row gap-2', courseColors)}>
      <Button
        variant='ghost'
        size='sm'
        asChild
      >
        <Link href={`/library#${id}`}>
          <ArrowLeft className='size-5 stroke-2 text-neutral-40' />
          <span className='sr-only'>Voltar</span>
        </Link>
      </Button>
      <h1 className='text-3xl text-white font-bold tracking-wide'>{title}</h1>
    </div>
  );
};
