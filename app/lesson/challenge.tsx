import { SelectChallengeOptions, SelectChallenges } from '@/db/schema';
import { cn, randomizeArray } from '@/lib/utils';
import { Card } from './card';
import { useState } from 'react';

type Props = {
  options: SelectChallengeOptions[];
  onSelect: (id: number) => void;
  status: 'correct' | 'wrong' | 'none';
  selectedOption?: SelectChallengeOptions['id'];
  disabled?: boolean;
  type: SelectChallenges['type'];
};

export const Challenge = ({ options, onSelect, status, type, disabled, selectedOption }: Props) => {
  const [randomizedOptions] = useState<SelectChallengeOptions[]>(randomizeArray<SelectChallengeOptions>(options));
  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
      )}
    >
      {randomizedOptions.map(({ id, imageSrc, text }, i) => (
        <Card
          key={i}
          id={id}
          text={text}
          imageSrc={imageSrc || undefined}
          shortcut={`${i + 1}`}
          selected={selectedOption === id}
          onClick={() => onSelect(id)}
          status={status}
          type={type}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
