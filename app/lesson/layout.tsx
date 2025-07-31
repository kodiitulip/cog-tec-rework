import { ExitModal } from '@/components/modals/exit-modal';
import { HeartsModal } from '@/components/modals/hearts-modal';
import { PracticeModal } from '@/components/modals/practice-modal';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const LessonLayout = ({ children }: Props) => {
  return (
    <div className='flex flex-col h-full'>
      <ExitModal />
      <HeartsModal />
      <PracticeModal />
      <div className='flex flex-col size-full'>{children}</div>
    </div>
  );
};

export default LessonLayout;
