'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { signInWithGoogle } from '@/actions/auth';
import { useTransition } from 'react';
import { authErrorCodeToMessage } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

type Props = {} & React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export const GoogleButton = ({ disabled, ...props }: Props) => {
  const [pending, startTransition] = useTransition();
  const signIn = async () => {
    const { data, error } = await signInWithGoogle();
    if (error) {
      toast.error(authErrorCodeToMessage(error.code ?? ''));
      return;
    }
    if (data.url) redirect(data.url);
  };
  return (
    <Button
      {...props}
      onClick={() => startTransition(signIn)}
      disabled={disabled ?? pending}
    >
      <SiGoogle
        color='#181717'
        className='size-5'
      />
      Entrar com Google
    </Button>
  );
};
