import { useKey, useMedia } from 'react-use';
import { CheckCircle, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  onCheck: () => void;
  status: 'correct' | 'wrong' | 'none' | 'completed';
  activeCourseName?: string;
  lessonId: number;
  disabled?: boolean;
};

export const Footer = ({ onCheck, status, activeCourseName, lessonId, disabled = false }: Props) => {
  const isMobile = useMedia('(max-width: 1024px)');
  activeCourseName = activeCourseName?.toLowerCase().replaceAll(' ', '-') || '';
  const courseButton =
    activeCourseName === 'behaviorismo'
      ? 'behaviorism'
      : activeCourseName === 'gestalt'
      ? 'gestalt'
      : activeCourseName === 'teoria-sociocultural'
      ? 'socio'
      : 'default';

  useKey('Enter', onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        'lg:h-35 h-25 border-t-2',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100'
      )}
    >
      <div className='max-w-285 h-full mx-auto felx items-center justify-between px-6 lg:px-10'>
        {status === 'correct' && (
          <div className='text-green-500 font-bold text-base flex items-center'>
            <CheckCircle className='size-6 mr-4' />
            Bom Trabalho!
          </div>
        )}
        {status === 'wrong' && (
          <div className='text-rose-500 font-bold text-base flex items-center'>
            <XCircle className='size-6 mr-4' />
            Quase! Tente Denovo!
          </div>
        )}
        {status === 'completed' && (
          <Button
            variant='empty'
            size={isMobile ? 'sm' : 'lg'}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Pratique Denovo
          </Button>
        )}
        <Button
          disabled={disabled}
          className='ml-auto'
          onClick={onCheck}
          size={isMobile ? 'sm' : 'lg'}
          variant={status === 'wrong' ? 'danger' : courseButton}
        >
          {status === 'none' && 'Confirmar'}
          {status === 'correct' && 'Próximo'}
          {status === 'wrong' && 'Tente Denovo'}
          {status === 'completed' && 'Continue'}
        </Button>
      </div>
    </footer>
  );
};
