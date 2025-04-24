import { SignedOut, SignedIn } from '@/components/auth/sign';
import { SignUpButton, SignInButton } from '@/components/auth/buttons';
import { Button } from '@/components/ui/button';
import { LoadingIcon } from '@/components/misc/loading';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

const Home = () => {
  return (
    <div className='max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2'>
      <div className='relative size-60 lg:size-106 mb-8 lg:mb-0'>
        <Image
          alt='hero'
          src='/kenney/shape-characters/prefab/hero.svg'
          fill
        />
      </div>
      <div className='flex flex-col items-center gap-y-8'>
        <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 max-w-120 text-center'>
          Aprenda e pratique as teorias da Cognição!
        </h1>
        <div className='flex flex-col items-center gap-y-3 max-w-82 w-full'>
          <Suspense fallback={<LoadingIcon />}>
            <SignedOut>
              <SignUpButton
                size='lg'
                className='w-full'
              >
                Crie uma conta
              </SignUpButton>
              <SignInButton
                size='lg'
                variant='ghost'
                className='w-full'
              >
                Eu já tenho uma conta
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                size='lg'
                className='w-full'
              >
                <Link href='/learn'>Continue Aprendendo</Link>
              </Button>
            </SignedIn>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
