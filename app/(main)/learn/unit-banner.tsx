import { Button } from '@/components/ui/button';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => (
  <div className='@container w-full rounded-xl bg-green-400 p-5 text-white flex items-center justify-between'>
    <div className='space-y-2.5'>
      <h3 className='text-2xl font-bold'>{title}</h3>
      <p className='text-lg'>{description}</p>
    </div>
    <Button
      asChild
      size='lg'
      variant='secondary'
      className='hidden @md:flex border-2 border-b-4 active:border-b-2'
    >
      <Link href='/lesson'>
        <NotebookText className='mr-2' />
        Continue
      </Link>
    </Button>
  </div>
);
