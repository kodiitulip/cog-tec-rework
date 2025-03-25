import { Children, HTMLAttributes, isValidElement } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { GithubButton } from '@/components/auth/oauth/github-button';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUserName, getCurrentUserAvatarUrl } from '@/lib/supabase/auth/user';

// TODO: auth signup

export const SignUpButton = ({ children }: HTMLAttributes<HTMLElement>) => {
  const child = isValidElement(children) && Children.only(children);

  return (
    <Dialog>
      <DialogTrigger asChild>{isValidElement(child) ? child : <button>{children ?? 'Sign Up'}</button>}</DialogTrigger>
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

// TODO: auth signin

export const SignInButton = ({ children }: HTMLAttributes<HTMLElement>) => {
  const child = isValidElement(children) && Children.only(children);

  return (
    <Dialog>
      <DialogTrigger asChild>{isValidElement(child) ? child : <button>{children ?? 'Sign In'}</button>}</DialogTrigger>
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

type UserButtonProps = {
  label?: boolean;
  customLabel?: string;
} & HTMLAttributes<HTMLElement> &
  VariantProps<typeof buttonVariants>;

export const UserButton = async ({ label, customLabel, ...props }: UserButtonProps) => {
  const userName = await getCurrentUserName();
  const userAvatarUrl = await getCurrentUserAvatarUrl();
  return (
    <Button {...props}>
      <Avatar>
        <AvatarImage src={userAvatarUrl} />
        <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {label &&
        (customLabel ?? (
          <span>
            hi, <strong className='text-sky-400'>{userName}</strong>
          </span>
        ))}
    </Button>
  );
};

type SignOutButtonProps = {} & VariantProps<typeof buttonVariants> & HTMLAttributes<HTMLElement>;

export const SignOutButton = ({ children, ...props }: SignOutButtonProps) => {
  const signOut = async () => {
    const { auth } = createClient();
    const { error } = await auth.signOut();
    if (error) console.error(error);
  };

  return (
    <Button
      {...props}
      onClick={signOut}
    >
      {children ?? 'Sign Out'}
    </Button>
  );
};
