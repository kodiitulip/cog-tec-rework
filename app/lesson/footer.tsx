import { useKey, useMedia } from 'react-use';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SelectLessons } from '@/db/schema';

type Props = {
  onCheck: () => void;
  status: 'correct' | 'wrong' | 'none' | 'completed';
  lessonId: SelectLessons['id'];
  disabled?: boolean;
};

export const Footer = ({ onCheck, status, lessonId, disabled = false }: Props) => {
  const isMobile = useMedia('(max-width: 1024px)');

  useKey((e) => e.key === 'Enter', onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        'lg:h-35 h-25 border-t-2',
        status === 'correct' && 'border-transparent bg-green-100',
        status === 'wrong' && 'border-transparent bg-rose-100'
      )}
    >
      <div className='max-w-285 h-full mx-auto flex items-center justify-between px-6 lg:px-10'>
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
          variant={status === 'wrong' ? 'danger' : 'default'}
        >
          {disabled && <Loader className='size-5 text-gray-500 animate-spin' />}
          {status === 'none' && 'Confirmar'}
          {status === 'correct' && 'Próximo'}
          {status === 'wrong' && 'Tente Denovo'}
          {status === 'completed' && 'Continue'}
        </Button>
      </div>
    </footer>
  );
};
