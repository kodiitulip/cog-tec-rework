'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useExitModal } from '@/store/use-exit-modal';
import { CogTecIcon } from '../svgs';

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={close}
    >
      <DialogContent className='max-w-(--breakpoint-md)'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <CogTecIcon
              className='fill-ecstasy-500'
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className='text-center tracking-wide font-bold text-2xl'>Espere! Não vá ainda!</DialogTitle>
          <DialogDescription className='text-center text-base'>
            Você está preste a sair da lição. Você tem certeza?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4 sm:flex-col'>
          <Button
            size='lg'
            className='w-full'
            onClick={close}
          >
            Continue Aprendendo
          </Button>
          <Button
            variant='dangerGhost'
            size='lg'
            className='w-full'
            onClick={() => {
              close();
              router.push('/learn');
            }}
          >
            Sair da Lição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
