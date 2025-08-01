import { useActionState } from 'react';
import { Button } from '../ui/button';
import { SignUpReturn, signUpWithEmail } from '@/actions/auth';

type SignUpFormProps = React.ComponentPropsWithRef<'form'> & {};
type SignUpInitialState = SignUpReturn | null;

export const SignUpForm = ({ ...props }: SignUpFormProps) => {
  const [state, action, isPending] = useActionState<SignUpInitialState, FormData>(signUpWithEmail, null);

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
        className='bg-neutral-400 border-2 border-neutral-600 rounded-xl w-full'
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
        className='bg-neutral-400 border-2 border-neutral-600 rounded-xl w-full'
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
        className='bg-neutral-400 border-2 border-neutral-600 rounded-xl w-full'
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
        className='bg-neutral-400 border-2 border-neutral-600 rounded-xl w-full'
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
      {state?.authError && (
        <div className='text-sm text-rose-400'>Houve um erro de autenticação. Porfavor tente novamente mais tarde</div>
      )}
      <Button
        type='submit'
        variant='ghost'
        disabled={isPending}
      >
        Sign In
      </Button>
    </form>
  );
};
