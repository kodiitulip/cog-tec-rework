import { Button } from '@/components/ui/button';
import { cn, CourseTitles } from '@/lib/utils';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  activeCourse: CourseTitles;
};

export const UnitBanner = ({ title, description, activeCourse }: Props) => (
  <div
    className={cn(
      '@container w-full rounded-xl bg-neutral-400 p-5 text-white flex items-center justify-between',
      activeCourse === 'Behaviorismo' && 'bg-behaviorism-500',
      activeCourse === 'Gestalt' && 'bg-gestalt-500',
      activeCourse === 'Teoria Sociocultural' && 'bg-sociocultural-500'
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
