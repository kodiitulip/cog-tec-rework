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
import { useHeartsModal } from '@/store/use-hearts-modal';
import { CogTecIcon } from '../svgs';

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = useHeartsModal();

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
              className='fill-gray-600'
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className='text-center tracking-wide font-bold text-2xl'>Você está sem corações!</DialogTitle>
          <DialogDescription className='text-center text-base'>
            Você precisa de mais corações para continuar
            <br />
            Pratique lições anteriores para ganhar mais!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4 sm:flex-col'>
          {/* <Button
            size='lg'
            className='w-full'
            onClick={close}
          >
            Continue Aprendendo
          </Button> */}
          <Button
            variant='default'
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
