import { MobileHeader } from '@/components/bits/mobile-header';
import { Sidebar } from '@/components/bits/sidebar';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Readonly<Props>) => (
  <>
    <MobileHeader />
    <Sidebar className='hidden lg:flex' />
    <main className='lg:pl-64 h-full pt-12.5 lg:pt-0'>
      <div className='max-w-264 mx-auto h-full pt-6'>{children}</div>
    </main>
  </>
);

export default MainLayout;
