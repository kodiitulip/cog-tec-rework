import { AuthLoaded } from '@/components/auth/AuthLoaded';
import { AuthLoading } from '@/components/auth/AuthLoading';
import { SignedIn } from '@/components/auth/SignedIn';
import { SignedOut } from '@/components/auth/SignedOut';
import { SignInButton } from '@/components/auth/SignInButton';
import { SignUpButton } from '@/components/auth/SignUpButton';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
          Learn Practice, and master new languages with Lingo.
        </h1>
        <div>
          <AuthLoading>
            <Loader className='size-5 text-muted-foreground animate-spin' />
          </AuthLoading>
          <AuthLoaded>
            <SignedOut>
              <SignUpButton>
                <Button
                  size='lg'
                  variant='secondary'
                  className='w-full'
                >
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton>
                <Button
                  size='lg'
                  variant='primaryGhost'
                  className='w-full'
                >
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                size='lg'
                variant='secondary'
                className='w-full'
              >
                <Link href='/learn'>Continue Learning</Link>
              </Button>
            </SignedIn>
          </AuthLoaded>
        </div>
      </div>
    </div>
  );
};

export default Home;
