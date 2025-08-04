'use client';

import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSignUpModal } from '@/store/use-sign-up-modal';
import { GithubButton } from '@/components/auth/oauth/github-button';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { Separator } from '../ui/separator';

export const SignUpModal = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = useSignUpModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={close}
    >
      <DialogContent className='sm:max-w-107'>
        <DialogHeader>
          <DialogTitle>Criar uma conta</DialogTitle>
          <DialogDescription>Cadastre-se com email e senha, ou entre com login social</DialogDescription>
        </DialogHeader>
        <GithubButton
          variant='ghost'
          size='lg'
          className='justify-start'
        />
        <Separator className='rounded-2xl ' />
        <SignUpForm close={close} />
      </DialogContent>
    </Dialog>
  );
};
