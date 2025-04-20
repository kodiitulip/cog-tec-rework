import React from 'react';
import { MobileSidebar } from '@/components/bits/mobile-sidebar';

export const MobileHeader = () => {
  return (
    <nav className='lg:hidden px-6 h-12.5 flex items-center border-b fixed top-0 inset-x-0 z-50 bg-ecstasy-500'>
      <MobileSidebar />
    </nav>
  );
};
