type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Readonly<Props>) => (
  <div className='min-h-screen flex flex-col'>
    <main className='flex-2 flex flex-col items-center justify-center'>{children}</main>
  </div>
);

export default MarketingLayout;
