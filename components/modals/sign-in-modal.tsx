'use client';

import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useSignInModal } from '@/store/use-sign-in-modal';
import { GithubButton } from '@/components/auth/oauth/github-button';
import { SignInForm } from '@/components/auth/sign-in-form';
import { Separator } from '../ui/separator';

export const SignInModal = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { isOpen, close } = useSignInModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={close}
    >
      <DialogContent className='sm:max-w-107'>
        <DialogHeader>
          <DialogTitle>Fazer Login</DialogTitle>
          <DialogDescription>Faça login com seu email e senha, ou com login social</DialogDescription>
        </DialogHeader>
        <GithubButton
          variant='ghost'
          size='lg'
          className='justify-start'
        />
        <Separator className='rounded-2xl ' />
        <SignInForm close={close} />
      </DialogContent>
    </Dialog>
  );
};
