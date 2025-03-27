'use client';

import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';

export const AuthLoading = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const { auth } = createClient();
      await auth.getUser();
      setLoaded(auth !== null);
    };
    init();
  }, [loaded]);

  if (loaded) return <></>;
  return <>{children}</>;
};

export const AuthLoaded = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const { auth } = createClient();
      await auth.getUser();
      setLoaded(auth !== null);
    };
    init();
  }, [loaded]);

  if (!loaded) return <></>;
  return <>{children}</>;
};
