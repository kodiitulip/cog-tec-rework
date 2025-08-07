import { SelectCourses, SelectLibrary } from '@/db/schema';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  courseId: SelectCourses['id'];
  title?: string;
  id?: SelectLibrary['id'];
};

export const Header = ({ courseId, id, title = 'Header' }: Props) => {
  return (
    <Link
      className={cn(
        'p-4 px-6 rounded-xl max-w-(--breakpoint-lg) block',
        courseId === 1 && 'bg-behaviorism-500',
        courseId === 2 && 'bg-gestalt-500',
        courseId === 3 && 'bg-sociocultural-500'
      )}
      href={`/library#${id}`}
    >
      <h1 className='text-3xl text-white font-bold tracking-wide'>{title}</h1>
    </Link>
  );
};
