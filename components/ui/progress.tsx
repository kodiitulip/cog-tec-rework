'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

type Props = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  activeCourseName?: string;
};

function Progress({ className, value, activeCourseName, ...props }: Props) {
  const indicatorColor =
    activeCourseName == 'Behaviorismo'
      ? 'bg-behaviorism-500'
      : activeCourseName == 'Gestalt'
        ? 'bg-gestalt-500'
        : activeCourseName == 'Teoria Sociocultural'
          ? 'bg-sociocultural-500'
          : 'bg-neutral-800';
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn('h-full w-full flex-1 transition-all', indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
