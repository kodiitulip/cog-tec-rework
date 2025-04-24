import { BehaviorismIcon, GestaltIcon, SociocultureIcon } from '@/components/svgs';

export const Footer = () => {
  return (
    <footer className='hidden h-20 w-full lg:block bg-ecstasy-500 rounded-t-lg p-2'>
      <div className='max-w-(--breakpoint-lg) mx-auto flex items-center justify-evenly h-full'>
        <BehaviorismIcon className='size-10 fill-white' />
        <GestaltIcon className='size-10 fill-white' />
        <SociocultureIcon className='size-10 fill-white' />
      </div>
    </footer>
  );
};
