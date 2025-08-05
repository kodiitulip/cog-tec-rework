import { SelectCourses } from '@/db/schema';
import { cn } from '@/lib/utils';

type Props = {
  courseId: SelectCourses['id'];
  title?: string;
};

export const Header = ({ courseId, title = 'Header' }: Props) => {
  return (
    <div
      className={cn(
        'p-4 rounded-xl rounded-b-none max-w-(--breakpoint-lg)',
        courseId === 1 && 'bg-behaviorism-500',
        courseId === 2 && 'bg-gestalt-500',
        courseId === 3 && 'bg-sociocultural-500'
      )}
    >
      <h1 className='text-2xl text-white font-bold tracking-wide'>{title}</h1>
    </div>
  );
};
