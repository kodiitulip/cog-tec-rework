'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePrivacyPolicyModal } from '@/store/use-privacy-policy-modal';
import { useLocation } from 'react-use';

export const PrivacyPolicyButton = ({ className, variant, ...props }: ButtonProps) => {
  const { open } = usePrivacyPolicyModal();
  const { hash } = useLocation();
  if (hash === 'policy') open();
  return (
    <Button
      onClick={open}
      variant={variant || 'emptyGhost'}
      className={cn('underline text-ecstasy-500 tracking-wide text-sm', className)}
      {...props}
    >
      Politica de Privacidade
    </Button>
  );
};
