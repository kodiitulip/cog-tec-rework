'use client';

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
import { usePracticeModal } from '@/store/use-practice-modal';
import Image from 'next/image';

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = usePracticeModal();

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
            <Image
              src='/icons/heart.svg'
              alt='Icon'
              width={100}
              height={100}
            />
          </div>
          <DialogTitle className='text-center tracking-wide font-bold text-2xl'>Você está praticando!</DialogTitle>
          <DialogDescription className='text-center text-base'>
            Você pode praticar em lições já completadas para ganhar pontos e corações de volta! Você não perderá
            corações nessas lições.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4 sm:flex-col'>
          <Button
            size='lg'
            className='w-full'
            onClick={close}
          >
            Beleza!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
