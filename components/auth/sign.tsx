import { createClient } from '@/lib/supabase/server';

export const SignedIn = async ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  const signedIn = user !== null;

  if (!signedIn) return <></>;
  return <>{children}</>;
};

export const SignedOut = async ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const { auth } = await createClient();
  const {
    data: { user },
  } = await auth.getUser();
  const signedIn = user !== null;

  if (signedIn) return <></>;
  return <>{children}</>;
};
