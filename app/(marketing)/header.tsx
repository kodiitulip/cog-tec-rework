import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const Header = () => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-(--breakpoint-lg) mx-auto flex items-center justify-between h-full'>
        <Link
          href='/'
          className='pt-8 pl-4 pb-7 flex items-center gap-x-3'
        >
          <Image
            alt='Mascot'
            src='/kenney/shape-characters/PNG/Default/green_body_square.png'
            width={40}
            height={40}
          />
          <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>Lingo</h1>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size='lg'
              variant='ghost'
            >
              log in
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-107'>
            <DialogHeader>
              <DialogTitle>Log in</DialogTitle>
              <DialogDescription>Login with your Credentials or Social Login</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type='submit'
                  variant='ghost'
                >
                  Log In
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
