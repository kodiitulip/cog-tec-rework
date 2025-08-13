'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserLoginFormSchema, SignUpFormSchema } from '@/zod/schemas';

const signInWithOAuth = async (provider: 'github' | 'google') => {
  const origin = (await headers()).get('origin');
  const { auth } = await createClient();
  const redirectUrl = new URL(`${origin}/auth/callback`);
  redirectUrl.searchParams.set('next', '/learn');
  const res = await auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl.toString(),
      skipBrowserRedirect: true,
    },
  });
  return res;
};

export const signInWithGithub = async () => signInWithOAuth('github');
export const signInWithGoogle = async () => signInWithOAuth('google');

export type SignInFormState = {
  success: boolean;
  fieldErrors?: { email?: string[]; password?: string[] };
  authError?: string;
};

export const signInWithEmail = async (_state: SignInFormState, formData: FormData): Promise<SignInFormState> => {
  const validatedFields = UserLoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success)
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };

  const { email, password } = validatedFields.data;

  const { auth } = await createClient();
  const { error } = await auth.signInWithPassword({
    email,
    password,
  });

  if (error)
    return {
      success: false,
      authError: error.code,
    };

  return {
    success: true,
  };
};

export type SignUpFormState = {
  success: boolean;
  fieldErrors?: { email?: string[]; password?: string[]; repeatPassword?: string[]; userName?: string[] };
  authError?: string;
};

export const signUpWithEmail = async (_state: SignUpFormState, formData: FormData): Promise<SignUpFormState> => {
  const validatedFields = SignUpFormSchema.safeParse({
    userName: formData.get('userName'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  });

  if (!validatedFields.success)
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };

  const { userName, email, password } = validatedFields.data;

  const { auth } = await createClient();
  const { error } = await auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: userName,
        user_name: userName,
      },
    },
  });

  if (error)
    return {
      success: false,
      authError: error.code,
    };

  return {
    success: true,
  };
};

export const signOut = async () => {
  const { auth } = await createClient();
  const { error: signOutError } = await auth.signOut({
    scope: 'local',
  });
  if (signOutError) return console.log(signOutError.code);
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  redirect('/');
};
