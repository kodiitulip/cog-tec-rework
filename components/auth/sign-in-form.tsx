import { useActionState } from 'react';
import { Button } from '../ui/button';
import { SignInFormState, signInWithEmail } from '@/actions/auth';
import { authErrorCodeToMessage } from '@/lib/utils';
import { redirect } from 'next/navigation';

type Props = React.ComponentPropsWithRef<'form'> & { close?: () => void };

export const SignInForm = ({ close, ...props }: Props) => {
  const nAction = async (state: SignInFormState | null, formData: FormData) => {
    const data = await signInWithEmail(state, formData);
    if (data?.success && data?.next) {
      if (close) close();
      redirect(data.next);
    }
    return data;
  };

  const [state, action, isPending] = useActionState<SignInFormState | null, FormData>(nAction, {
    success: false,
    next: '/learn',
  });

  return (
    <form
      action={action}
      className='flex flex-col gap-y-2'
      {...props}
    >
      <label
        htmlFor='email'
        className='sr-only'
      >
        Email
      </label>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        className='bg-neutral-400/10 border-2 border-neutral-400 rounded-xl w-full p-2'
      />
      {state?.fieldErrors?.email?.map((msg, idx) => (
        <div
          key={idx}
          className='text-sm text-rose-400 ml-1'
        >
          {msg}
        </div>
      ))}
      <label
        htmlFor='password'
        className='sr-only'
      >
        Senha
      </label>
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Senha'
        className='bg-neutral-400/10 border-2 border-neutral-400 rounded-xl w-full p-2'
      />
      {state?.fieldErrors?.password?.map((msg, idx) => (
        <div
          key={idx}
          className='text-sm text-rose-400 ml-1'
        >
          {msg}
        </div>
      ))}
      {state?.authError && <div className='text-sm text-rose-400'>{authErrorCodeToMessage(state?.authError)}</div>}
      <Button
        type='submit'
        variant='ghost'
        disabled={isPending}
      >
        Entrar
      </Button>
    </form>
  );
};
