'use client';

import { useState, useEffect } from 'react';

export const AuthLoaded = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  // Mockup of auth session while we mock up the apps functionality
  // TODO: proper auth session check
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => setLoaded(true), [loaded]);

  if (!loaded) return <></>;
  return <>{children}</>;
};
