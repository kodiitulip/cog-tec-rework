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
    <div className={cn('h-full lg:w-64 lg:fixed flex left-0 inset-y-0 p-4 rounded-r-2 flex-col', className)}>
      <Link
        href='/learn'
        className='pt-4 pl-4 pb-7 flex items-center gap-x-3'
      >
        <CogTecIcon className='fill-ecstasy-500' />
        <h1 className='text-2xl font-extrabold text-ecstasy-500 tracking-[30%]'>CogTec</h1>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem
          label='estudos'
          href='/learn'
          iconSrc='/icon/sidebar/learn.svg'
        />
        <SidebarItem
          label='biblioteca'
          href='/library'
          iconSrc='/icon/sidebar/library.svg'
        />
        <SidebarItem
          label='ranking'
          href='/leaderboard'
          iconSrc='/icon/sidebar/leaderboard.svg'
        />
        {/* <SidebarItem label='quests' href='/quests' iconSrc='/icons/quests.svg'/> */}
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
