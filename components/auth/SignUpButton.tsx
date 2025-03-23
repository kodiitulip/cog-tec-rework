import { Children, HTMLAttributes, isValidElement } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

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
