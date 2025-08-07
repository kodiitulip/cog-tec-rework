import { cn } from '@/lib/utils';

type Props = {} & React.HTMLAttributes<HTMLElement>;

export const StickyWrapper = ({ children, className }: Props) => {
  return (
    <div className={cn('hidden lg:block w-92 sticky self-end z-1 bottom-6', className)}>
      <div className='min-h-[calc(100dvh-48px)] sticky top-6 flex flex-col gap-y-4'>{children}</div>
    </div>
  );
};
