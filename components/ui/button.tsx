import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-neutral-700 focus-visible:ring-2 aria-invalid:ring-rose/20 dark:aria-invalid:ring-rose/40 uppercase tracking-wide cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-ecstasy-400 text-white border-ecstasy-500 border-b-4 active:border-b-2 hover:bg-ecstasy-400/80 focus-visible:bg-ecstasy-400/80',
        ghost: 'bg-transparent border-transparent border-0 hover:bg-ecstasy-400/40 focus-visible:bg-ecstasy-400/40',
        behaviorism:
          'bg-behaviorism-400 text-white hover:bg-behaviorism-400/80 focus-visible:bg-behaviorism-400/90 border-behaviorism-600 border-b-4 active:border-b-2',
        behaviorismGhost: 'bg-transparent text-behaviorism-500 hover:bg-slate-500/40 focus-visible:bg-slate-500/40',
        gestalt:
          'bg-gestalt-400 text-white hover:bg-gestalt-400/80 focus-visible:bg-gestalt-400/90 border-gestalt-600 border-b-4 active:border-b-2',
        gestaltGhost: 'bg-transparent text-gestalt-500 hover:bg-slate-500/40 focus-visible:bg-slate-500/40',
        danger:
          'bg-rose-400 text-white hover:bg-rose-400/90 focus-visible:bg-rose-400/90 border-rose-500 border-b-4 active:border-b-2',
        dangerGhost: 'bg-transparent text-rose-500 hover:bg-slate-500/40 focus-visible:bg-slate-500/40',
        socio:
          'bg-sociocultural-400 text-white hover:bg-sociocultural-400/80 focus-visible:bg-sociocultural-400/90 border-sociocultural-600 border-b-4 active:border-b-2',
        socioGhost: 'bg-transparent text-sociocultural-500 hover:bg-slate-500/40 focus-visible:bg-slate-500/40',
        sidebar:
          'bg-ecstasy-400 text-white rounded-l-none hover:bg-ecstasy-400/80 focus-visible:bg-ecstasy-400/80 transition-none',
        sidebarGhost:
          'bg-transparent text-neutral-700 rounded-l-none hover:text-white hover:bg-ecstasy-400 focus-visible:bg-ecstasy-400 transition-none',
        empty: '',
      },
      size: {
        default: 'h-11 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 px-6 has-[>svg]:px-4',
        icon: 'size-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
