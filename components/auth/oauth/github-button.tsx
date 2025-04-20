'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { signInWithGithub } from '@/actions/auth';
import { useTransition } from 'react';

type Props = {} & React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export const GithubButton = ({ disabled, ...props }: Props) => {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      onClick={() => startTransition(signInWithGithub)}
      disabled={disabled ?? pending}
    >
      <SiGithub
        color='default'
        className='size-5'
      />
      Sign In with Github
    </Button>
  );
};
