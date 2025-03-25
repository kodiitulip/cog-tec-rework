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
        {/* TODO: Insert Sign Up modal Body here */}
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
        {/* TODO: Insert Sign In modal Body here */}
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

export const UserButton = ({ variant = 'ghost', label, customLabel, ...props }: UserButtonProps) => {
  return (
    <Button
      variant={variant}
      {...props}
    >
      <Avatar>
        <AvatarImage src='/kenney/shape-characters/PNG/Default/blue_body_circle.png' />
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      {label && (customLabel ?? 'Hi, Mock!')}
    </Button>
  );
};
