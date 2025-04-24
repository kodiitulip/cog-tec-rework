'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  children?: React.ReactNode;
  href?: string;
};

export const SidebarItem = ({ children, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'sidebar' : 'sidebarGhost'}
      className='justify-start h-13'
      asChild
    >
      <Link href={href ?? '/learn'}>{children}</Link>
    </Button>
  );
};
