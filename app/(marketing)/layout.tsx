import { Footer } from './footer';
import { Header } from './header';

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Readonly<Props>) => (
  <div className='min-h-screen flex flex-col'>
    <Header />
    <main className='flex-2 flex flex-col items-center justify-center'>{children}</main>
    <Footer />
  </div>
);

export default MarketingLayout;
