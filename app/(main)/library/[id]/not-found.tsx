import { CogTecIcon } from '@/components/svgs';

const NotFoundPage = () => {
  return (
    <div className='h-full max-w-(--breakpoint-lg) px-3 mx-auto space-y-6'>
      <CogTecIcon className='size-40 fill-ecstasy-500 mx-auto mt-20' />
      <h1 className='text-2xl font-bold text-center text-neutral-700'>Página não encontrada</h1>
    </div>
  );
};

export default NotFoundPage;
