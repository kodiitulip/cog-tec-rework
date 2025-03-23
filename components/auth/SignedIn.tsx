'use client';

import { useEffect, useState } from 'react';

export const SignedIn = ({ children }: React.HTMLAttributes<HTMLElement>) => {
  // Mockup of auth session while we mock up the apps functionality
  // TODO: proper auth session check
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => setSignedIn(localStorage.getItem('signedIn') === 'true'), [signedIn]);

  if (!signedIn) return <></>;
  return <>{children}</>;
};
