import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({ id, title, imageSrc, onClick, disabled, active }: Props) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn('border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-55 min-w-50 disabled:pointer-events-none disabled:opacity-50',
        title == 'Behaviorismo' ? 'border-behaviorism-500' : title == 'Gestalt' ? 'border-gestalt-500' : title == 'Teoria Sociocultural' ? 'border-sociocultural-500' : ''
      )}
      disabled={disabled}
    >
      <div className='min-h-6 w-full flex items-center justify-end'>
        {active && (
          <div className='rounded-md bg-green-600 flex items-center justify-center p-1.5'>
            <Check className='text-white stroke-4 size-4' />
            <span className='sr-only'>Active Course</span>
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className='rounded-lg drop-shadow-md object-cover'
      />
      <p className='text-neutral-700 text-center font-bold mt-3'>{title}</p>
    </button>
  );
};
