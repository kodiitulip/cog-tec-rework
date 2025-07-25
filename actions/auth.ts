'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserLoginFormSchema } from '@/zod/schemas';
import { AuthError } from '@supabase/supabase-js';

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

export type SignInFieldErrors = {
  success: false;
  formError?: { email?: string[]; password?: string[] };
  authError?: AuthError;
};

export type SignInSuccess = {
  success: true;
  formError: null;
  authError: null;
};

export const signInWithEmail = async (
  _state: SignInSuccess | SignInFieldErrors | null,
  formData: FormData
): Promise<SignInSuccess | SignInFieldErrors | null> => {
  const validatedFields = UserLoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  console.log(validatedFields.error?.flatten().fieldErrors);
  if (!validatedFields.success)
    return {
      success: false,
      formError: validatedFields.error.flatten().fieldErrors,
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
      authError: error,
    };

  return { success: true, authError: null, formError: null };
};

export const signOut = async () => {
  const { auth } = await createClient();
  const { error } = await auth.signOut();
  if (error) return console.error(error);
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  redirect('/');
};
