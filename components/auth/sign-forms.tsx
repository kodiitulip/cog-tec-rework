import { useActionState } from 'react';
import { Button } from '../ui/button';
import { SignInFieldErrors, SignInSuccess, signInWithEmail } from '@/actions/auth';

type SignInFormProps = React.ComponentPropsWithRef<'form'> & {};
type SignInInitialState = SignInSuccess | SignInFieldErrors | null;

export const SignInForm = ({ ...props }: SignInFormProps) => {
  const [state, action, isPending] = useActionState<SignInInitialState, FormData>(signInWithEmail, null);

  return (
    <form
      action={action}
      className='space-y-1.5'
      {...props}
    >
      <label
        htmlFor='email'
        className='block'
      >
        Email:
        <input
          type='email'
          id='email'
          name='email'
          placeholder='email@addrs.io'
          className='ml-1'
        />
        {state?.formError?.email?.map((msg, idx) => (
          <div
            key={idx}
            className='text-sm text-rose-400 ml-1'
          >
            {msg}
          </div>
        ))}
      </label>
      <label
        htmlFor='password'
        className='block'
      >
        Password:
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          className='ml-1'
        />
        {state?.formError?.password?.map((msg, idx) => (
          <div
            key={idx}
            className='text-sm text-rose-400 ml-1'
          >
            {msg}
          </div>
        ))}
      </label>
      {state?.authError && <div className='text-sm text-rose-400'>{state?.authError?.message}</div>}
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
