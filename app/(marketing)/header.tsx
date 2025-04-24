import Link from 'next/link';
// import Image from 'next/image';
import { SignInButton } from '@/components/auth/buttons';
import { LoadingIcon } from '@/components/misc/loading';
import { UserButton } from '@/components/auth/user-button';
import { SignedIn, SignedOut } from '@/components/auth/sign';
import { Suspense } from 'react';
import { CogTecIcon } from '@/components/svgs';

export const Header = () => {
  return (
    <header className='h-20 w-full bg-ecstasy-500 text-white rounded-b-lg px-4'>
      <div className='lg:max-w-(--breakpoint-lg) mx-auto flex items-center justify-between h-full'>
        <Link
          href='/'
          className='pt-8 pl-4 pb-7 flex items-center gap-x-3'
        >
          <CogTecIcon className='fill-current size-10' />
          <h1 className='text-2xl font-extrabold tracking-[calc(var(--spacing)*2)]'>CogTec</h1>
        </Link>
        <Suspense fallback={<LoadingIcon />}>
          <SignedOut>
            <SignInButton
              size='lg'
              variant='ghost'
              className='text-current'
            >
              log in
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              variant='ghost'
              size='lg'
              className='text-current'
            />
          </SignedIn>
        </Suspense>
      </div>
    </header>
  );
};
