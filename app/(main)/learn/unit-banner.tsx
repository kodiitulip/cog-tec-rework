import { Button } from '@/components/ui/button';
import { cn, CoursesIds } from '@/lib/utils';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  courseId?: CoursesIds;
};

export const UnitBanner = ({ title, description, courseId = CoursesIds.DEFAULT }: Props) => {
  const courseColors =
    courseId === CoursesIds.BEHAVIORISM
      ? 'bg-behaviorism-500'
      : courseId === CoursesIds.GESTALT
      ? 'bg-gestalt-500'
      : courseId === CoursesIds.SOCIOCULTURE
      ? 'bg-sociocultural-500'
      : 'bg-ecstasy-500';
  return (
    <div
      className={cn(
        '@container w-full rounded-xl bg-neutral-400 p-5 text-white flex items-center justify-between',
        courseColors
      )}
    >
      <div className='space-y-2.5'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <p className='text-lg'>{description}</p>
      </div>
      <Button
        asChild
        size='lg'
        variant='ghost'
        className='hidden @md:flex hover:bg-white/20 focus-visible:bg-white/20'
      >
        <Link href='/lesson'>
          <NotebookText className='mr-2' />
          Continue
        </Link>
      </Button>
    </div>
  );
};
