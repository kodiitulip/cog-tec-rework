import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export const LoadingIcon = ({ className }: React.ComponentProps<'svg'>) => {
  return <Loader className={cn('size-5 text-gray-500 animate-spin', className)} />;
};
