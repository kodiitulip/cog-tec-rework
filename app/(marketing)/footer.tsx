import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className='hidden h-20 w-full lg:block border-t-2 border-slate-200 p-2'>
      <div className='max-w-(--breakpoint-lg) mx-auto flex items-center justify-evenly h-full'>
        <Button
          size='lg'
          variant='ghost'
          // className='w-full'
        >
          <Image
            src='/flags/hr.svg'
            alt='croatian flag'
            height={32}
            width={40}
            className='mr-4 rounded-md'
          />
          croatian
        </Button>
        <Button
          size='lg'
          variant='ghost'
          // className='w-full'
        >
          <Image
            src='/flags/es.svg'
            alt='spanish flag'
            height={32}
            width={40}
            className='mr-4 rounded-md'
          />
          Spanish
        </Button>
        <Button
          size='lg'
          variant='ghost'
          // className='w-full'
        >
          <Image
            src='/flags/fr.svg'
            alt='french flag'
            height={32}
            width={40}
            className='mr-4 rounded-md'
          />
          french
        </Button>
        <Button
          size='lg'
          variant='ghost'
          // className='w-full'
        >
          <Image
            src='/flags/it.svg'
            alt='italian flag'
            height={32}
            width={40}
            className='mr-4 rounded-md'
          />
          italian
        </Button>
        <Button
          size='lg'
          variant='ghost'
          // className='w-full'
        >
          <Image
            src='/flags/jp.svg'
            alt='japanese flag'
            height={32}
            width={40}
            className='mr-4 rounded-md'
          />
          japanese
        </Button>
      </div>
    </footer>
  );
};
