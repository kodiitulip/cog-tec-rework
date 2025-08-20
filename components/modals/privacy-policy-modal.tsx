'use client';

import { useState } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useMount } from 'react-use';
import { usePrivacyPolicyModal } from '@/store/use-privacy-policy-modal';

export const PrivacyPolicyModal = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [variant, setVariant] = useState<'pt_br' | 'en_us'>('pt_br');
  const { isOpen, close } = usePrivacyPolicyModal();

  useMount(() => setIsClient(true));

  if (!isClient) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={close}
    >
      <DialogContent className='sm:max-w-107 max-h-[80dvh]'>
        <DialogHeader>
          <DialogTitle>Política de Privacidade / Privacy Policy</DialogTitle>
        </DialogHeader>
        {variant === 'pt_br' && (
          <article className='prose prose-neutral max-h-112 overflow-y-auto'>
            <h3>Data Efetiva: 20/08/2025</h3>
            <p>
              CogTec dar valor a sua privacidade. Essa Política de privacidade explica qual informação coletamos e como
              usamos
            </p>
            <h2>Informação que coletamos</h2>
            <p>Coletamos somente as seguintes informações suas:</p>
            <ul>
              <li>Endereço de Email</li>
              <li>Informação básica de perfil (como nome de usuário e imagem de avatar)</li>
            </ul>
            <h2>Como usamos sua informação</h2>
            <p>Usamos sua informação únicamente para:</p>
            <ul>
              <li>Criação e manuntenção de conta/perfil</li>
            </ul>
            <p>Nós não vendemos nem compartilhamos suas informações</p>
            <h2>Armazenamento de dados & Segurança</h2>
            <p>
              Sua informação é guardada de maneira segura e usada apenas para motivos de manutenção de conta/perfil.
              Fazemos o possível para proteger seus dados
            </p>
            <h2>Contato</h2>
            <p>
              Ainda <strong>não</strong> possuímos um email oficial.
            </p>
          </article>
        )}
        {variant === 'en_us' && (
          <article className='prose prose-neutral max-h-112 overflow-y-auto'>
            <h3>Effective Date: 20/08/2025</h3>
            <p>
              CogTec values your privacy. This Privacy Policy explains what information we collect and how we use it.
            </p>
            <h2>Information We Collect</h2>
            <p>We only collect the following information when you create an account:</p>
            <ul>
              <li>Email address</li>
              <li>Basic profile information (such as your display name or avatar)</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>We use your information solely for:</p>
            <ul>
              <li>Creating and managing your account</li>
            </ul>
            <p>
              We do <strong>not</strong> sell or share your information
            </p>
            <h2>Data Storage & Security</h2>
            <p>
              Your information is stored securely and used only for account purposes. We take reasonable measures to
              protect your data.
            </p>
            <h2>Contact</h2>
            <p>We still don&apos;t have an official communication channel</p>
          </article>
        )}
        <DialogFooter>
          <Button
            variant='empty'
            onClick={() => setVariant((prev) => (prev === 'pt_br' ? 'en_us' : 'pt_br'))}
          >
            {variant.replace('_', '-').toUpperCase()}
          </Button>
          <Button onClick={close}>Okay!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
