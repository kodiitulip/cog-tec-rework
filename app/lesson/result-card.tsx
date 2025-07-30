import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  variant: 'points' | 'hearts';
  value: number;
};

export const ResultCard = ({ value, variant }: Props) => {
  const imgSrc = variant === 'hearts' ? '/icons/heart.svg' : '/icons/points.svg';
  return (
    <div
      className={cn(
        'rounded-2xl border-2 w-full',
        variant === 'points' && 'bg-orange-400 border-orange-400',
        variant === 'hearts' && 'bg-rose-500 border-rose-500'
      )}
    >
      <div
        className={cn(
          'p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs',
          variant === 'points' && 'bg-orange-400',
          variant === 'hearts' && 'bg-rose-500'
        )}
      >
        {variant === 'hearts' ? 'Corações restantes' : 'Pontuação total'}
      </div>
      <div
        className={cn(
          'rounded-2xl bg-white items-center justify-center flex p-6 font-bold text-lg',
          variant === 'points' && 'text-orange-400',
          variant === 'hearts' && 'text-rose-500'
        )}
      >
        <Image
          src={imgSrc}
          width={30}
          height={30}
          alt='Icon'
          className='mr-1.5'
        />
        {value}
      </div>
    </div>
  );
};
