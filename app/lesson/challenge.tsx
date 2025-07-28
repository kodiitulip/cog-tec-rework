import { SelectChallengeOptions, SelectChallenges } from '@/db/schema';
import { cn } from '@/lib/utils';

type Props = {
  options: SelectChallengeOptions[];
  onSelect: (id: number) => void;
  status: 'correct' | 'wrong' | 'none';
  selectedOption?: number;
  disabled?: boolean;
  type: SelectChallenges['type'];
};

export const Challenge = ({ options, onSelect, status, type, disabled, selectedOption }: Props) => {
  return (
    <div
      className={cn(
        'grid gap-2',
        type === 'ASSIST' && 'grid-cols-1',
        type === 'SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
      )}
    >
      {options.map(({ text }, i) => (
        <div key={i}>{text}</div>
      ))}
    </div>
  );
};
