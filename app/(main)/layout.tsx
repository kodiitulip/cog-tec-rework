import { MobileHeader } from '@/components/bits/mobile-header';
import { Sidebar } from '@/components/bits/sidebar';
import { LoadingIcon } from '@/components/misc/loading';
import { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Readonly<Props>) => (
  <>
    <MobileHeader />
    <Sidebar className='hidden lg:flex bg-ecstasy-100' />
    <main className='lg:pl-64 h-full pt-12.5 lg:pt-0 overflow-y-auto'>
      <Suspense fallback={<LoadingIcon />}>
        <div className='max-w-264 mx-auto h-full pt-6'>{children}</div>
      </Suspense>
    </main>
  </>
);

export default MainLayout;
