import { CogTecIcon } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className='h-full max-w-(--breakpoint-lg) px-3 mx-auto space-y-6'>
      <CogTecIcon className='size-40 fill-ecstasy-500 mx-auto mt-20' />
      <h1 className='text-2xl font-bold text-center text-neutral-700'>Essa lição não foi encontrada</h1>
      <Button
        asChild
        variant='empty'
      >
        <Link href='/learn' className='mx-auto'>Voltar</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
