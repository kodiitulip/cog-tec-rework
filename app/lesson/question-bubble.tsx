import { BehaviorismIcon, CogTecIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';
import { cn, tailwindCourseColors } from '@/lib/utils';

type Props = {
  question: string;
  courseName?: string;
};

export const QuestionBubble = ({ question, courseName }: Props) => {
  const Icon =
    courseName === 'Behaviorismo'
      ? BehaviorismIcon
      : courseName === 'Gestalt'
      ? GestaltIcon
      : courseName === 'Teoria Sociocultural'
      ? SociocultureIcon
      : CogTecIcon;

  const color = tailwindCourseColors(courseName || '', 'fill', '500');

  return (
    <div className='flex items-center gap-x-4 mb-6'>
      <Icon
        height={60}
        width={60}
        className={cn('hidden lg:block', color)}
      />
      <Icon
        height={40}
        width={40}
        className={cn('lg:hidden', color)}
      />
      <div className='relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base border-neutral-400'>
        {question}
        <div className='absolute -left-3 top-1/2 size-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90' />
      </div>
    </div>
  );
};
