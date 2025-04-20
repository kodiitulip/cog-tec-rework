import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarItem } from '@/components/bits/sidebar-item';
import { UserButton } from '@/components/auth/user-button';
import { LoadingIcon } from '../misc/loading';
import { Suspense } from 'react';

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn('h-full lg:w-64 lg:fixed flex left-0 inset-y-0 p-4 border-r-2 flex-col', className)}>
      <Link
        href='/learn'
        className='pt-4 pl-4 pb-7 flex items-center gap-x-3'
      >
        <Image
          alt='Mascot'
          src='/kenney/shape-characters/PNG/Default/green_body_square.png'
          width={40}
          height={40}
        />
        <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>Lingo</h1>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        <SidebarItem
          label='learn'
          href='/learn'
          iconSrc='/icons/learn.svg'
        />
        <SidebarItem
          label='leaderboard'
          href='/leaderboard'
          iconSrc='/icons/leaderboard.svg'
        />
        <SidebarItem
          label='quests'
          href='/quests'
          iconSrc='/icons/quests.svg'
        />
        <SidebarItem
          label='shop'
          href='/shop'
          iconSrc='/icons/shop.svg'
        />
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
