import { cn } from '@/lib/utils';
// import Image from 'next/image';
import Link from 'next/link';
import { SidebarItem } from '@/components/bits/sidebar-item';
import { UserButton } from '@/components/auth/user-button';
import { LoadingIcon } from '../misc/loading';
import { Suspense } from 'react';
import { CogTecIcon } from '../svgs';

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        'h-full lg:w-64 lg:fixed flex left-0 inset-y-0 py-4 lg:rounded-r-lg flex-col border-r-1 border-neutral-400',
        className
      )}
    >
      <Link
        href='/learn'
        className='pt-4 pl-4 pb-7 flex items-center gap-x-3'
      >
        <CogTecIcon className='fill-ecstasy-500 size-10' />
        <h1 className='text-2xl font-extrabold text-ecstasy-500 tracking-[calc(var(--spacing)*2)]'>CogTec</h1>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem href='/learn'>estudos</SidebarItem>
        <SidebarItem href='/library'>biblioteca</SidebarItem>
        <SidebarItem href='/leaderboard'>ranking</SidebarItem>
        <SidebarItem href='/quests'>missões</SidebarItem>
        <SidebarItem href='/shop'>loja</SidebarItem>
      </div>
      <Suspense fallback={<LoadingIcon />}>
        <UserButton
          className='justify-start h-13'
          variant='sidebarGhost'
          label
        />
      </Suspense>
    </div>
  );
};
