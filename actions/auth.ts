'use server';

import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export const signOut = async () => {
  const { auth } = await createClient();
  const { error } = await auth.signOut();
  if (error) return console.error(error);
  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  redirect('/');
};
