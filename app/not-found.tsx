import { CogTecIcon } from '@/components/svgs';
import { Header } from './(marketing)/header';
import { Footer } from './(marketing)/footer';

const NotFoundPage = () => {
  return (
    <div className='min-h-dvh flex flex-col'>
      <Header />
      <main className='flex-2 flex flex-col items-center justify-center'>
        <div className='h-full max-w-228 px-3 mx-auto space-y-6'>
          <CogTecIcon className='size-40 fill-ecstasy-500 mx-auto' />
          <h1 className='text-2xl font-bold text-neutral-700'>Página não encontrada</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
