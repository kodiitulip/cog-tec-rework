import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className='sticky bg-ecstasy-50 top-0 pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-neutral-600 border-neutral-400 rounded-b-lg lg:z-50'>
      <Button
        variant='ghost'
        size='sm'
        asChild
      >
        <Link href='/courses'>
          <ArrowLeft className='size-5 stroke-2 text-neutral-40' />
          <span className='sr-only'>Select courses</span>
        </Link>
      </Button>
      <h1 className='font-bold text-lg'>{title}</h1>
      <div />
    </div>
  );
};
