import { cn } from '@/lib/utils';

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn('h-full lg:w-64 lg:fixed flex left-0 inset-y-0 px-4 border-r-2 flex-col bg-blue-500', className)}
    >
      sidebar
    </div>
  );
};
