import { useActionState } from 'react';
import { Button } from '../ui/button';
import { SignInFieldErrors, SignInSuccess, signInWithEmail } from '@/actions/auth';
import { Result, ResultAsync, ok } from 'neverthrow';

type SignInFormProps = React.ComponentPropsWithRef<'form'> & {};
interface SignInInitialState extends ResultAsync<SignInSuccess, SignInFieldErrors> {}

export const SignInForm = ({ ...props }: SignInFormProps) => {
  const [state, action, isPending] = useActionState<SignInInitialState, FormData>(
    signInWithEmail,
    ok({
      success: true,
      formError: null,
      authError: null,
    })
  );
  return (
    <form
      action={action}
      {...props}
    >
      <label htmlFor='email'>
        Email:
        <input
          type='email'
          id='email'
          name='email'
          placeholder='email@addrs.io'
        />
      </label>
      <label htmlFor='password'>
        Password:
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
        />
      </label>
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
