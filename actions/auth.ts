'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserLoginFormSchema, SignUpFormSchema } from '@/zod/schemas';

export const signInWithGithub = async () => {
  const origin = (await headers()).get('origin');
  const { auth } = await createClient();
  const redirectUrl = new URL(`${origin}/auth/callback`);
  redirectUrl.searchParams.set('next', '/learn');
  const { data, error } = await auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: redirectUrl.toString(),
      skipBrowserRedirect: true,
    },
  });
  if (error) console.error(error);
  if (data.url) redirect(data.url);
};

export type SignInFormState = {
  success: boolean;
  next?: string;
  fieldErrors?: { email?: string[]; password?: string[] };
  authError?: string;
};

export const signInWithEmail = async (
  state: SignInFormState | null,
  formData: FormData
): Promise<SignInFormState | null> => {
  const validatedFields = UserLoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success)
    return {
      success: false,
      next: state?.next,
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
      next: state?.next,
      authError: error.code,
    };

  return {
    next: state?.next,
    success: true,
  };
};

export type SignUpFormState = {
  success: boolean;
  next?: string;
  fieldErrors?: { email?: string[]; password?: string[]; repeatPassword?: string[]; userName?: string[] };
  authError?: string;
};

export const signUpWithEmail = async (
  state: SignUpFormState | null,
  formData: FormData
): Promise<SignUpFormState | null> => {
  const validatedFields = SignUpFormSchema.safeParse({
    userName: formData.get('userName'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  });

  if (!validatedFields.success)
    return {
      success: false,
      next: state?.next,
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
      next: state?.next,
      authError: error.code,
    };

  return {
    next: state?.next,
    success: true,
  };
};

export const signOut = async () => {
  const { auth } = await createClient();
  const {
    data: { session },
    error: sessionError,
  } = await auth.getSession();

  if (sessionError) return console.log(sessionError.code);
  if (!session) return console.log('session missing');

  const { access_token } = session;

  if (!access_token) return console.log('no access token');

  const { error: signOutError } = await auth.admin.signOut(access_token, 'local');
  if (signOutError) {
    console.log(signOutError.code);
    return;
  }
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  redirect('/');
};
