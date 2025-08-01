'use client';

import { useTransition } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { signOut } from '@/actions/auth';
import { useSignUpModal } from '@/store/use-sign-up-modal';
import { useSignInModal } from '@/store/use-sign-in-modal';

export const SignUpButton = (props: ButtonProps) => {
  const { open } = useSignUpModal();
  return (
    <Button
      onClick={open}
      {...props}
    />
  );
};

export const SignInButton = (props: ButtonProps) => {
  const { open } = useSignInModal();
  return (
    <Button
      onClick={open}
      {...props}
    />
  );
};

export const SignOutButton = ({ disabled, ...props }: ButtonProps) => {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => startTransition(signOut)}
      disabled={disabled ?? pending}
      {...props}
    />
  );
};
