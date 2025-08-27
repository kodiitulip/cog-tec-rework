import { CourseIcon } from '@/components/misc/course-icon';
import { CoursesIds } from '@/lib/utils';

type Props = {
  question: string;
  courseId?: CoursesIds;
};

export const QuestionBubble = ({ question, courseId }: Props) => {
  return (
    <div className='flex items-center gap-x-4 mb-6'>
      <CourseIcon
        courseId={courseId}
        height={60}
        width={60}
        className='hidden lg:block'
      />
      <CourseIcon
        courseId={courseId}
        height={40}
        width={40}
        className='lg:hidden shrink-0'
      />
      <div className='relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base border-neutral-400'>
        {question}
        <div className='absolute -left-3 top-1/2 size-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90' />
      </div>
    </div>
  );
};
