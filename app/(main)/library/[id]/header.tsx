import { Button } from '@/components/ui/button';
import { cn, CoursesIds } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  title?: string;
  courseId?: CoursesIds;
};

export const Header = ({ courseId = CoursesIds.DEFAULT, title = 'Header' }: Props) => {
  const courseColors =
    courseId === CoursesIds.BEHAVIORISM ? 'bg-behaviorism-500'
    : courseId === CoursesIds.GESTALT ? 'bg-gestalt-500'
    : courseId === CoursesIds.SOCIOCULTURE ? 'bg-sociocultural-500'
    : 'bg-ecstasy-500';

  return (
    <div className={cn('p-4 px-6 rounded-xl max-w-(--breakpoint-lg) flex flex-row gap-2', courseColors)}>
      <Button
        variant='ghost'
        className='hover:bg-neutral-400/40 focus-visible:bg-neutral-400/40'
        size='sm'
        asChild
      >
        <Link href='/library'>
          <ArrowLeft className='size-5 stroke-2 text-white' />
          <span className='sr-only'>Voltar</span>
        </Link>
      </Button>
      <h1 className='text-3xl text-white font-bold tracking-wide'>{title}</h1>
    </div>
  );
};
