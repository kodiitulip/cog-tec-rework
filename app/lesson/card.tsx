import { Button } from '@/components/ui/button';
import { SelectChallenges } from '@/db/schema';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback } from 'react';
import { useKey } from 'react-use';

type Props = {
  id: SelectChallenges['id'];
  text: string;
  imageSrc?: string;
  shortcut: string;
  selected: boolean;
  onClick: () => void;
  status: 'correct' | 'wrong' | 'none';
  disabled?: boolean;
  type: SelectChallenges['type'];
};

export const Card = ({ imageSrc, onClick, selected, shortcut, status, text, type, disabled = false }: Props) => {
  const buttonClasses = cn(
    'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-3 active:border-b-2 border-neutral-400 justify-center flex-col focus-visible:bg-black/5 whitespace-normal',
    selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100 focus-visible:bg-sky-100/40',
    selected &&
      status === 'correct' &&
      'border-green-300 bg-green-100 hover:bg-green-100 focus-visible:bg-green-100/40',
    selected && status === 'wrong' && 'border-rose-300 bg-rose-100 hover:bg-rose-100 focus-visible:bg-rose-100/40',
    type === 'ASSIST' && 'lg:p-3 w-full'
  );
  const textClasses = cn(
    'text-neutral-600 text-sm lg:text-base',
    selected && 'text-sky-500',
    selected && status === 'correct' && 'text-green-500',
    selected && status === 'wrong' && 'text-rose-500'
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <Button
      variant='ghost'
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {imageSrc && (
        <div className='relative aspect-square max-h-20 lg:max-h-35 w-full'>
          <Image
            src={imageSrc}
            alt={text}
            fill
            className='object-contain'
          />
        </div>
      )}
      <p className={textClasses}>{text}</p>
    </Button>
  );
};
