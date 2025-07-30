import { ExitModal } from '@/components/modals/exit-modal';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const LessonLayout = ({ children }: Props) => {
  return (
    <div className='flex flex-col h-full'>
      <ExitModal />
      <div className='flex flex-col size-full'>{children}</div>
    </div>
  );
};

export default LessonLayout;
