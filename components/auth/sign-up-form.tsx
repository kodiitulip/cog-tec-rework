import { useActionState } from 'react';
import { Button } from '../ui/button';
import { SignUpFormState, signUpWithEmail } from '@/actions/auth';
import { authErrorCodeToMessage } from '@/lib/utils';
import { redirect } from 'next/navigation';

type Props = React.ComponentPropsWithRef<'form'> & { close?: () => void };

export const SignUpForm = ({ close, ...props }: Props) => {
  const nAction = async (state: SignUpFormState | null, formData: FormData) => {
    const data = await signUpWithEmail(state, formData);
    if (data?.success && data?.next) {
      if (close) close();
      redirect(data.next);
    }
    return data;
  };

  const [state, action, isPending] = useActionState<SignUpFormState | null, FormData>(nAction, {
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
        htmlFor='userName'
        className='sr-only'
      >
        Nome de Usuário
      </label>
      <input
        id='userName'
        name='userName'
        placeholder='Nome de Usuário'
        className='bg-neutral-400/10 border-2 border-neutral-400 rounded-xl w-full p-2'
      />
      <ul>
        {state?.fieldErrors?.userName?.map((msg, idx) => (
          <li
            key={idx}
            className='text-sm text-rose-400 ml-1'
          >
            {msg}
          </li>
        ))}
      </ul>
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
        placeholder='Seu email'
        className='bg-neutral-400/10 border-2 border-neutral-400 rounded-xl w-full p-2'
      />
      <ul>
        {state?.fieldErrors?.email?.map((msg, idx) => (
          <li
            key={idx}
            className='text-sm text-rose-400 ml-1'
          >
            {msg}
          </li>
        ))}
      </ul>
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
        placeholder='Sua Senha'
        className='bg-neutral-400/10 border-2 border-neutral-400 rounded-xl w-full p-2'
      />
      <ul>
        {state?.fieldErrors?.password?.map((msg, idx) => (
          <li
            key={idx}
            className='text-sm text-rose-400 ml-1'
          >
            {msg}
          </li>
        ))}
      </ul>
      <label
        htmlFor='repeatPassword'
        className='sr-only'
      >
        Repita sua Senha
      </label>
      <input
        type='password'
        id='repeatPassword'
        name='repeatPassword'
        placeholder='Repita sua Senha'
        className='bg-neutral-400/10 border-2 border-neutral-400 rounded-xl w-full p-2'
      />
      <ul>
        {state?.fieldErrors?.repeatPassword?.map((msg, idx) => (
          <li
            key={idx}
            className='text-sm text-rose-400 ml-1'
          >
            {msg}
          </li>
        ))}
      </ul>
      {state?.authError && <div className='text-sm text-rose-400'>{authErrorCodeToMessage(state.authError)}</div>}
      <Button
        type='submit'
        variant='ghost'
        disabled={isPending}
      >
        Cadstar-se
      </Button>
    </form>
  );
};
