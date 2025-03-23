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
