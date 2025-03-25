import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@/components/auth/buttons';
import { SignedIn, SignedOut, AuthLoaded, AuthLoading } from '@/components/auth/status';
import { Loader } from 'lucide-react';

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
        <AuthLoading>
          <Loader className='size-5 text-muted-foreground animate-spin' />
        </AuthLoading>
        <AuthLoaded>
          <SignedOut>
            <SignInButton>
              <Button
                size='lg'
                variant='ghost'
              >
                log in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* <Avatar> */}
            {/*   <AvatarImage src='/kenney/shape-characters/PNG/Default/blue_body_circle.png' /> */}
            {/*   <AvatarFallback>MK</AvatarFallback> */}
            {/* </Avatar> */}
            <UserButton />
          </SignedIn>
        </AuthLoaded>
      </div>
    </header>
  );
};
