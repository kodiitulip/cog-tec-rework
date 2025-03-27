'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { GithubButton } from '@/components/auth/oauth/github-button';
import { createClient } from '@/lib/supabase/client';
import { Slot } from '@radix-ui/react-slot';
import { redirect } from 'next/navigation';

// TODO: auth signin/up forms
type SignButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const SignUpButton = ({ asChild, ...props }: SignButtonProps) => {
  const Comp = asChild ? Slot : Button;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Comp {...props} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-107'>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>Sign up with your Credentials or Social Login</DialogDescription>
        </DialogHeader>
        <GithubButton
          variant='ghost'
          size='lg'
          className='justify-start'
        />
        <DialogFooter>
          <Button
            type='submit'
            variant='ghost'
          >
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SignInButton = ({ asChild, ...props }: SignButtonProps) => {
  const Comp = asChild ? Slot : Button;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Comp {...props} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-107'>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Sign In with your Credentials or Social Login</DialogDescription>
        </DialogHeader>
        <GithubButton
          variant='ghost'
          size='lg'
          className='justify-start'
        />
        <DialogFooter>
          <Button
            type='submit'
            variant='ghost'
          >
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SignOutButton = ({ disabled, asChild, ...props }: SignButtonProps) => {
  const Comp = asChild ? Slot : Button;
  const [stateDisabled, setStateDisabled] = useState<boolean>(false);

  const signOut = async () => {
    setStateDisabled(true);
    const { auth } = createClient();
    const { error } = await auth.signOut({
      scope: 'local',
    });
    if (error) return console.error(error);
    redirect('/');
  };

  return (
    <Comp
      {...props}
      onClick={signOut}
      disabled={disabled ?? (stateDisabled && stateDisabled)}
    />
  );
};
