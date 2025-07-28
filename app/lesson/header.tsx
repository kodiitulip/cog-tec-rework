import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  hearts: number;
  percentage: number;
  courseName?: string;
};

export const Header = ({ hearts, percentage, courseName }: Props) => {
  return (
    <header className='lg:pt-12 pt-5 px-10 flex gap-x-7 items-center justify-between max-w-285 mx-auto w-full'>
      <X
        onClick={() => {}} /* TODO: add onclick action */
        className='text-slate-500 hover:opacity-75 transition cursor-pointer'
      />
      <Progress
        value={percentage}
        activeCourseName={courseName}
      />
      <div className='text-rose-500 flex items-center font-bold'>
        <Image
          src='/icons/heart.svg'
          alt='Coração'
          height={28}
          width={28}
          className='mr-2'
        />
        {hearts}
      </div>
    </header>
  );
};
