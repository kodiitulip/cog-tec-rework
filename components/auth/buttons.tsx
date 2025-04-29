'use client';

import { useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { GithubButton } from '@/components/auth/oauth/github-button';
import { signOut } from '@/actions/auth';
import { SignInForm } from './sign-forms';

// TODO: auth signin/up forms
type SignButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const SignUpButton = (props: SignButtonProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button {...props} />
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
    </DialogContent>
  </Dialog>
);

export const SignInButton = (props: SignButtonProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button {...props} />
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
      <hr className='border-neutral-700 border-t-1' />
      <SignInForm />
    </DialogContent>
  </Dialog>
);

export const SignOutButton = ({ disabled, ...props }: SignButtonProps) => {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      {...props}
      onClick={() => startTransition(signOut)}
      disabled={disabled ?? pending}
    />
  );
};
